import { InjectionToken } from '@angular/core';
import type { IProductDetailStore } from '@features/product-detail/stores/product-detail.store.interface';

export const PRODUCT_DETAIL_STORE = new InjectionToken<IProductDetailStore>(
  'features.product-detail.store',
);
