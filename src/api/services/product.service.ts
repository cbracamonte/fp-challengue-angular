import type { Product } from '../types/product.types';
import type { ApiResponse, ListMeta } from '../types/api-response.types';
import * as productRepository from '../repositories/products.repository';

export const getProducts = (): ApiResponse<Product[], ListMeta> => {
  const products = productRepository.findAll();
  return {
    data: products,
    meta: { total: products.length },
  };
};

export const getProductByIdentifier = (
  id: string,
): ApiResponse<Product> | null => {
  const product = productRepository.findByIdentifier(id);
  return product ? { data: product } : null;
};

export const getRelatedProducts = (
  id: string,
): ApiResponse<Product[], ListMeta> | null => {
  const product = productRepository.findByIdentifier(id);
  if (!product) return null;

  const related = productRepository.findByIds(product.relatedProductIds);
  return {
    data: related,
    meta: { total: related.length },
  };
};