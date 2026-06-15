import type { Cart, CartSummaryMeta } from '../types/cart.types';
import type { ApiResponse } from '../types/api-response.types';
import { roundCurrency } from '../utils/currency';

export const calculateCartSummary = (cart: Cart): CartSummaryMeta => {
  const subtotal = roundCurrency(
    cart.reduce((total, item) => total + item.product.price.current * item.quantity, 0),
  );
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return {
    subtotal,
    totalQuantity,
    currency: cart[0]?.product.price.currency ?? 'PEN',
  };
};

export const getCart = (cart: Cart): ApiResponse<Cart, CartSummaryMeta> => ({
  data: cart,
  meta: calculateCartSummary(cart),
});