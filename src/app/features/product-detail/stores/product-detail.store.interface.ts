import { Signal } from '@angular/core';
import type { Product, ProductVariant } from '@api/types/product.types';

export interface IProductDetailStore {
  readonly product: Signal<Product | null>;
  readonly relatedProducts: Signal<Product[]>;
  readonly selectedVariant: Signal<ProductVariant | null>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;
  load(slug: string | Signal<string>): void;
  addToCart(): void;
  addRelatedToCart(product: Product): void;
  setVariant(variant: ProductVariant): void;
}
