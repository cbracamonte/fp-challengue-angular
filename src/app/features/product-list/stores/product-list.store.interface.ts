import { Signal } from '@angular/core';
import type { Product } from '@api/types/product.types';

export interface IProductListStore {
  readonly products: Signal<Product[]>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;
  load(source?: void): void;
  addToCart(product: Product): void;
}
