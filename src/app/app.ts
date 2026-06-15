import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import type { ApiResponse, ListMeta } from '../api/types/api-response.types';
import type { Product } from '../api/types/product.types';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('fp-challenge-angular');
  protected readonly products = signal<ApiResponse<Product[], ListMeta> | null>(null);
  protected readonly error = signal<string | null>(null);
  private readonly http = inject(HttpClient);

  constructor() {
    this.http.get<ApiResponse<Product[], ListMeta>>('/api/products').subscribe({
      next: (response) => this.products.set(response),
      error: (error: unknown) => this.error.set(JSON.stringify(error, null, 2))
    });
  }
}
