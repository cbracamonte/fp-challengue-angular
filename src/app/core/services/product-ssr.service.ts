import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import type { Product } from '@api/types/product.types';
import type { IProductService } from './product.service.interface';
import * as productApi from '@api/services/product.service';

@Injectable()
export class ProductSSRService implements IProductService {
  getProducts(): Observable<Product[]> {
    return of(productApi.getProducts().data);
  }

  getProduct(slug: string): Observable<Product> {
    const result = productApi.getProductByIdentifier(slug);
    return result ? of(result.data) : throwError(() => new Error(`Product not found: ${slug}`));
  }

  getRelatedProducts(slug: string): Observable<Product[]> {
    const result = productApi.getRelatedProducts(slug);
    return of(result?.data ?? []);
  }
}
