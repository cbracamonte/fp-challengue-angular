import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { Product, ProductVariant } from '@api/types/product.types';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format.pipe';
import { VariantSelectorComponent } from '../variant-selector/variant-selector';

@Component({
  selector: 'app-product-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyFormatPipe, VariantSelectorComponent],
  templateUrl: './product-info.html',
})
export class ProductInfoComponent {
  readonly product = input.required<Product>();
  readonly selectedVariant = input<ProductVariant | null>(null);
  readonly variantChange = output<ProductVariant>();
  readonly addToCart = output<void>();

  protected discount(): number {
    const { current, original } = this.product().price;
    return Math.round(((original - current) / original) * 100);
  }
}
