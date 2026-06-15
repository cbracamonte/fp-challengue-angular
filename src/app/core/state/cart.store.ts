import { computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import type { Cart, CartItem } from '@api/types/cart.types';
import type { Product } from '@api/types/product.types';

type CartState = { items: Cart };

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState<CartState>({ items: [] }),
  withComputed(({ items }) => ({
    totalQuantity: computed(() => items().reduce((sum, i) => sum + i.quantity, 0)),
    subtotal: computed(() =>
      items().reduce((sum, i) => sum + (i.product.price.current * i.quantity), 0),
    ),
    currency: computed(() => items()[0]?.product.price.currency ?? 'PEN'),
  })),
  withMethods((store) => ({
    add(product: Product, quantity = 1): void {
      patchState(store, (state) => {
        const idx = state.items.findIndex((i) => i.product.id === product.id);
        if (idx !== -1) {
          return {
            items: state.items.map((item, i) =>
              i === idx ? { ...item, quantity: item.quantity + quantity } : item,
            ),
          };
        }
        return { items: [...state.items, { product, quantity } satisfies CartItem] };
      });
    },
    remove(productId: string): void {
      patchState(store, (state) => ({
        items: state.items.filter((i) => i.product.id !== productId),
      }));
    },
    clear(): void {
      patchState(store, { items: [] });
    },
  })),
);

export type CartStore = InstanceType<typeof CartStore>;
