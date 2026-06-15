import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Product } from '@api/types/product.types';
import type { ApiResponse } from '@api/types/api-response.types';
import type { IProductService } from './product.service.interface';

@Injectable()
export class ProductService implements IProductService {
  private readonly http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http
      .get<ApiResponse<Product[]>>('/api/products')
      .pipe(map((res) => res.data));
  }

  getProduct(slug: string): Observable<Product> {
    return this.http
      .get<ApiResponse<Product>>(`/api/product/${slug}`)
      .pipe(map((res) => res.data));
  }

  getRelatedProducts(slug: string): Observable<Product[]> {
    return this.http
      .get<ApiResponse<Product[]>>(`/api/product/${slug}/related`)
      .pipe(map((res) => res.data));
  }
}
