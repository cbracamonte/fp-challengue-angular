import { Router } from 'express';
import {
  getProductsHandler,
  getProductHandler,
  getRelatedProductsHandler,
} from '../controllers/product.controller';

export const productsRouter = Router();

productsRouter.get('/products', getProductsHandler);
productsRouter.get('/product/:id', getProductHandler);
productsRouter.get('/product/:id/related', getRelatedProductsHandler);