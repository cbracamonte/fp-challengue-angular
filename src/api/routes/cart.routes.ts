import { Router } from 'express';
import { getCartHandler } from '../controllers/cart.controller';

export const cartRouter = Router();

cartRouter.get('/cart', getCartHandler);