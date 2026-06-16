import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { Product } from '@api/types/product.types';
import { GA_MEASUREMENT_ID } from '@core/tokens';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

interface Ga4Item {
  item_id: string;
  item_name: string;
  item_brand: string;
  item_category: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly measurementId = inject(GA_MEASUREMENT_ID);

  trackPageView(url: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.gtag('config', this.measurementId, { page_path: url });
  }

  trackViewItem(product: Product): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.gtag('event', 'view_item', {
      currency: product.price.currency,
      value: product.price.current,
      items: [this.toItem(product, 1)],
    });
  }

  trackAddToCart(product: Product, quantity: number): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.gtag('event', 'add_to_cart', {
      currency: product.price.currency,
      value: product.price.current * quantity,
      items: [this.toItem(product, quantity)],
    });
  }

  private toItem(product: Product, quantity: number): Ga4Item {
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
