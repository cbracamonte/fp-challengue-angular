import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { Product } from '@api/types/product.types';
import { ProductCardComponent } from '@shared/components/product-card/product-card';

@Component({
  selector: 'app-related-products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCardComponent],
  template: `
    @if (products().length > 0) {
      <section class="mt-12" aria-labelledby="related-heading">
        <h2
          id="related-heading"
          class="mb-4 text-xl font-bold text-[var(--color-accent)]"
        >
          Related Products
        </h2>
        <div
          class="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
          role="list"
          aria-label="Related products carousel"
        >
          @for (product of products(); track product.id) {
            <div class="w-52 flex-shrink-0 snap-start" role="listitem">
              <app-product-card
                [product]="product"
                (addToCart)="addToCart.emit($event)"
              />
            </div>
          }
        </div>
      </section>
    }
  `,
})
export class RelatedProductsComponent {
  readonly products = input.required<Product[]>();
  readonly addToCart = output<Product>();
}
