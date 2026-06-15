import type { Cart } from '../types/cart.types';
import { PRODUCTS } from './products.mock';

export const cart: Cart = [
  {
    product: PRODUCTS[0],
    quantity: 1,
  },
  {
    product: PRODUCTS[1],
    quantity: 2,
  },
  {
    product: PRODUCTS[2],
    quantity: 1,
  },
];