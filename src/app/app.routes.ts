import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout').then((m) => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/product-list/pages/product-list-page').then(
            (m) => m.ProductListPageComponent,
          ),
      },
      {
        path: 'producto/:slug',
        loadComponent: () =>
          import('./features/product-detail/pages/product-detail-page').then(
            (m) => m.ProductDetailPageComponent,
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/pages/cart-page').then((m) => m.CartPageComponent),
      },
    ],
  },
];
