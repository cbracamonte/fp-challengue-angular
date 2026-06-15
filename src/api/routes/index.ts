import { Router } from 'express';
import { productsRouter } from './products.routes';
import { cartRouter } from './cart.routes';

export const apiRouter = Router();

apiRouter.use(productsRouter);
apiRouter.use(cartRouter);