import type { Product } from '../types/product.types';
import { PRODUCTS } from '../data/products.mock';

export const findAll = (): Product[] => PRODUCTS;

export const findByIdentifier = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id || p.slug === id || p.sku === id);

export const findByIds = (ids: string[]): Product[] =>
  PRODUCTS.filter((p) => ids.includes(p.id));