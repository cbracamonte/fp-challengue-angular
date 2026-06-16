import { InjectionToken } from '@angular/core';
import type { IProductListStore } from '@features/product-list/stores/product-list.store.interface';

export const PRODUCT_LIST_STORE = new InjectionToken<IProductListStore>(
  'features.product-list.store',
);
