import { Injectable, computed, signal } from '@angular/core';
import type { Cart, CartItem } from '@api/types/cart.types';
import type { Product } from '@api/types/product.types';

@Injectable({ providedIn: 'root' })
export class CartState {
  private readonly _items = signal<Cart>([]);

  readonly items = this._items.asReadonly();

  readonly totalQuantity = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0),
  );

  readonly subtotal = computed(() =>
    this._items().reduce((sum, item) => sum + item.product.price.current * item.quantity, 0),
  );

  readonly currency = computed(() => this._items()[0]?.product.price.currency ?? 'PEN');

  add(product: Product, quantity = 1): void {
    this._items.update((current) => {
      const idx = current.findIndex((i) => i.product.id === product.id);
      if (idx !== -1) {
        return current.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...current, { product, quantity } satisfies CartItem];
    });
  }

  remove(productId: string): void {
    this._items.update((current) => current.filter((i) => i.product.id !== productId));
  }

  clear(): void {
    this._items.set([]);
  }
}
