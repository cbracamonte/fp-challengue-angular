import type { Observable } from 'rxjs';
import type { Product } from '@api/types/product.types';

export interface IProductService {
  getProducts(): Observable<Product[]>;
  getProduct(slug: string): Observable<Product>;
  getRelatedProducts(slug: string): Observable<Product[]>;
}
