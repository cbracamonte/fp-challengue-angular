import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe, switchMap, tap, catchError } from 'rxjs';
import { PRODUCT_SERVICE } from '@core/tokens';
import type { IProductService } from '@core/services/product.service.interface';
import { CartStore } from '@core/state/cart.store';
import { AnalyticsService } from '@core/services/analytics.service';
import type { Product, ProductVariant } from '@api/types/product.types';

type ProductDetailState = {
  product: Product | null;
  relatedProducts: Product[];
  selectedVariant: ProductVariant | null;
  loading: boolean;
  error: string | null;
};

export const ProductDetailStore = signalStore(
  withState<ProductDetailState>({
    product: null,
    relatedProducts: [],
    selectedVariant: null,
    loading: true,
    error: null,
  }),
  withMethods((store) => {
    const productService = inject<IProductService>(PRODUCT_SERVICE);
    const cartStore = inject(CartStore);
    const analytics = inject(AnalyticsService);

    const _loadRelated = rxMethod<string>(
      pipe(
        switchMap((slug) =>
          productService.getRelatedProducts(slug).pipe(
            tap((relatedProducts) => patchState(store, { relatedProducts })),
            catchError(() => EMPTY),
          ),
        ),
      ),
    );

    const load = rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((slug) =>
          productService.getProduct(slug).pipe(
            tap((product) => {
              patchState(store, {
                product,
                selectedVariant: product.variants[0] ?? null,
                loading: false,
              });
              analytics.trackViewItem(product);
              _loadRelated(slug);
            }),
            catchError(() => {
              patchState(store, {
                error: 'Could not load product. Please try again.',
                loading: false,
              });
              return EMPTY;
            }),
          ),
        ),
      ),
    );

    return {
      load,
      addToCart(): void {
        const p = store.product();
        if (!p) return;
        cartStore.add(p);
        analytics.trackAddToCart(p, 1);
      },
      addRelatedToCart(product: Product): void {
        cartStore.add(product);
      },
      setVariant(variant: ProductVariant): void {
        patchState(store, { selectedVariant: variant });
      },
    };
  }),
);

export type ProductDetailStore = InstanceType<typeof ProductDetailStore>;
