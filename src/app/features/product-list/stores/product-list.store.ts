import { inject } from '@angular/core';
import { signalStore, withState, withMethods, withHooks, patchState } from '@ngrx/signals';
import type { IProductListStore } from './product-list.store.interface';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, pipe, switchMap, tap, catchError } from 'rxjs';
import { PRODUCT_SERVICE } from '@core/tokens';
import type { IProductService } from '@core/services/product.service.interface';
import { CartStore } from '@core/state/cart.store';
import type { Product } from '@api/types/product.types';

export const ProductListStore = signalStore(
  withState({ products: [] as Product[], loading: true, error: null as string | null }),
  withMethods((store) => {
    const productService = inject<IProductService>(PRODUCT_SERVICE);
    const cartStore = inject(CartStore);

    const load = rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          productService.getProducts().pipe(
            tap((products) => patchState(store, { products, loading: false })),
            catchError(() => {
              patchState(store, {
                error: 'Could not load products. Please try again.',
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
      addToCart(product: Product): void {
        cartStore.add(product);
      },
    };
  }),
  withHooks({ onInit: ({ load }) => load() }),
);

export type ProductListStore = InstanceType<typeof ProductListStore>;

// Verificamos el contrato en tiempo de compilación, asegurando que ProductListStore implementa IProductListStore
true satisfies ProductListStore extends IProductListStore ? true : never;
