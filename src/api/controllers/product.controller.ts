import type { Request, Response } from 'express';
import type { Product } from '../types/product.types';
import type {
  ApiResponse,
  ApiErrorResponse,
  ListMeta,
} from '../types/api-response.types';
import * as productService from '../services/product.service';
import { notFound } from '../utils/responses';

export const getProductsHandler = (
  _req: Request,
  res: Response<ApiResponse<Product[], ListMeta>>,
): void => {
  res.status(200).json(productService.getProducts());
};

export const getProductHandler = (
  req: Request,
  res: Response<ApiResponse<Product> | ApiErrorResponse>,
): void => {
  const id = req.params['id'] as string;
  const result = id ? productService.getProductByIdentifier(id) : null;

  if (!result) {
    notFound(res);
    return;
  }
  res.status(200).json(result);
};

export const getRelatedProductsHandler = (
  req: Request,
  res: Response<ApiResponse<Product[], ListMeta> | ApiErrorResponse>,
): void => {
  const id = req.params['id'] as string;
  const result = id ? productService.getRelatedProducts(id) : null;

  if (!result) {
    notFound(res);
    return;
  }
  res.status(200).json(result);
};