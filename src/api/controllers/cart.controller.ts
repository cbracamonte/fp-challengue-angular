import type { Request, Response } from 'express';
import type { Cart, CartSummaryMeta } from '../types/cart.types';
import type { ApiResponse } from '../types/api-response.types';
import { cart } from '../data/cart.mock';
import { getCart } from '../services/cart.service';

export const getCartHandler = (
  _req: Request,
  res: Response<ApiResponse<Cart, CartSummaryMeta>>,
): void => {
  res.status(200).json(getCart(cart));
};