import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ProductService } from '@core/services/product.service';
import { CartState } from '@core/state/cart.state';
import type { Product } from '@api/types/product.types';
import { ProductCardComponent } from '@shared/components/product-card/product-card';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner';
import { ErrorStateComponent } from '@shared/components/error-state/error-state';

@Component({
  selector: 'app-product-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCardComponent, LoadingSpinnerComponent, ErrorStateComponent],
  template: `
    <section class="container mx-auto px-4 py-8">
      <h1 class="mb-6 text-2xl font-bold text-[var(--color-accent)]">Our Products</h1>

      @if (loading()) {
        <app-loading-spinner />
      } @else if (error()) {
        <app-error-state
          [message]="error()!"
          (retry)="load()"
        />
      } @else {
        <ul
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          role="list"
          aria-label="Product list"
        >
          @for (product of products(); track product.id) {
            <li>
              <app-product-card
                [product]="product"
                (addToCart)="onAddToCart($event)"
              />
            </li>
          }
        </ul>
      }
    </section>
  `,
})
export class ProductListPageComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartState);

  protected readonly products = signal<Product[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load products. Please try again.');
        this.loading.set(false);
      },
    });
  }

  protected onAddToCart(product: Product): void {
    this.cart.add(product);
  }
}
