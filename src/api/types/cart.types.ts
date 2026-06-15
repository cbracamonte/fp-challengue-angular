import type { Product, CurrencyCode } from './product.types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Cart = CartItem[];

export interface CartSummaryMeta {
  subtotal: number;
  totalQuantity: number;
  currency: CurrencyCode;
}