import type { Request, Response } from 'express';
import { cart } from '../data/cart.mock';
import { getCart } from '../services/cart.service';

export const getCartHandler = (_req: Request, res: Response): void => {
  res.status(200).json(getCart(cart));
};