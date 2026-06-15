import { Injectable } from '@angular/core';
import type { Product } from '@api/types/product.types';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private push(event: Record<string, unknown>): void {
    if (typeof window === 'undefined') return;
    window.dataLayer ??= [];
    window.dataLayer.push(event);
  }

  trackViewItem(product: Product): void {
    this.push({
      event: 'view_item',
      ecommerce: {
        currency: product.price.currency,
        value: product.price.current,
        items: [this.toItem(product, 1)],
      },
    });
  }

  trackAddToCart(product: Product, quantity: number): void {
    this.push({
      event: 'add_to_cart',
      ecommerce: {
        currency: product.price.currency,
        value: product.price.current * quantity,
        items: [this.toItem(product, quantity)],
      },
    });
  }

  private toItem(product: Product, quantity: number) {
    return {
      item_id: product.sku,
      item_name: product.name,
      item_brand: product.brand,
      item_category: product.category.name,
      price: product.price.current,
      quantity,
    };
  }
}
