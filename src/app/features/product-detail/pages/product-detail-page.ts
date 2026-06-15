import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { CartState } from '@core/state/cart.state';
import { AnalyticsService } from '@core/services/analytics.service';
import type { Product, ProductVariant } from '@api/types/product.types';
import { ImageGalleryComponent } from '@features/product-detail/components/image-gallery/image-gallery';
import { ProductInfoComponent } from '@features/product-detail/components/product-info/product-info';
import { ProductTabsComponent } from '@features/product-detail/components/product-tabs/product-tabs';
import { RelatedProductsComponent } from '@features/product-detail/components/related-products/related-products';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner';
import { ErrorStateComponent } from '@shared/components/error-state/error-state';

@Component({
  selector: 'app-product-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ImageGalleryComponent,
    ProductInfoComponent,
    ProductTabsComponent,
    RelatedProductsComponent,
    LoadingSpinnerComponent,
    ErrorStateComponent,
  ],
  template: `
    @if (loading()) {
      <app-loading-spinner />
    } @else if (error()) {
      <app-error-state [message]="error()!" (retry)="load()" />
    } @else if (product()) {
      <div class="container mx-auto px-4 py-8">
        <div class="grid gap-8 md:grid-cols-2">
          <app-image-gallery [images]="product()!.gallery" />
          <app-product-info
            [product]="product()!"
            [selectedVariant]="selectedVariant()"
            (variantChange)="selectedVariant.set($event)"
            (addToCart)="onAddToCart()"
          />
        </div>

        <app-product-tabs [product]="product()!" />

        <app-related-products
          [products]="relatedProducts()"
          (addToCart)="cart.add($event)"
        />
      </div>
    }
  `,
})
export class ProductDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  protected readonly cart = inject(CartState);
  private readonly analytics = inject(AnalyticsService);

  protected readonly product = signal<Product | null>(null);
  protected readonly relatedProducts = signal<Product[]>([]);
  protected readonly selectedVariant = signal<ProductVariant | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      const p = this.product();
      if (p) this.analytics.trackViewItem(p);
    });
  }

  ngOnInit(): void {
    this.load();
  }

  protected load(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.loading.set(true);
    this.error.set(null);

    this.productService.getProduct(slug).subscribe({
      next: (data) => {
        this.product.set(data);
        this.selectedVariant.set(data.variants[0] ?? null);
        this.loading.set(false);
        this.loadRelated(slug);
      },
      error: () => {
        this.error.set('Could not load product. Please try again.');
        this.loading.set(false);
      },
    });
  }

  private loadRelated(slug: string): void {
    this.productService.getRelatedProducts(slug).subscribe({
      next: (data) => this.relatedProducts.set(data),
      error: () => {},
    });
  }

  protected onAddToCart(): void {
    const p = this.product();
    if (!p) return;
    this.cart.add(p);
    this.analytics.trackAddToCart(p, 1);
  }
}
