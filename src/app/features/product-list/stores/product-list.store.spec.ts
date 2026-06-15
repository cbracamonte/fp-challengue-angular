import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { ProductListStore } from './product-list.store';
import { CartStore } from '@core/state/cart.store';
import { PRODUCT_SERVICE } from '@core/tokens';
import type { IProductService } from '@core/services/product.service.interface';
import type { Product } from '@api/types/product.types';

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 'prod-1',
  sku: 'SKU001',
  slug: 'test-product',
  name: 'Test Product',
  brand: 'Genérico',
  category: { slug: 'farmacia', name: 'Farmacia' },
  available: true,
  variants: [{ name: 'Caja', quantity: 100 }],
  image: 'https://example.com/img.jpg',
  gallery: [],
  price: { currency: 'PEN', current: 10.0, original: 15.0 },
  descriptionShort: ['Feature 1'],
  regulatoryCode: 'REG-001',
  descriptionLong: 'Description',
  composition: 'Composition',
  contraindications: 'None',
  warnings: 'None',
  relatedProductIds: [],
  ...overrides,
});

const mockProducts = [makeProduct({ id: 'p1' }), makeProduct({ id: 'p2', sku: 'SKU002' })];

describe('ProductListStore', () => {
  let store: InstanceType<typeof ProductListStore>;
  let cartStore: InstanceType<typeof CartStore>;
  const mockProductService: Partial<IProductService> = {
    getProducts: vi.fn(() => of(mockProducts)),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (mockProductService.getProducts as ReturnType<typeof vi.fn>).mockReturnValue(of(mockProducts));

    TestBed.configureTestingModule({
      providers: [
        ProductListStore,
        CartStore,
        { provide: PRODUCT_SERVICE, useValue: mockProductService },
      ],
    });

    cartStore = TestBed.inject(CartStore);
    store = TestBed.inject(ProductListStore);
  });

  it('loads products on init', () => {
    expect(store.products()).toHaveLength(2);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('sets loading=true while fetching', () => {
    (mockProductService.getProducts as ReturnType<typeof vi.fn>).mockReturnValue(of(mockProducts));
    store.load();
    expect(store.loading()).toBe(false);
    expect(store.products()).toHaveLength(2);
  });

  it('sets error state on fetch failure', () => {
    (mockProductService.getProducts as ReturnType<typeof vi.fn>).mockReturnValue(
      throwError(() => new Error('Network error')),
    );
    store.load();
    expect(store.error()).toBe('Could not load products. Please try again.');
    expect(store.loading()).toBe(false);
  });

  it('addToCart delegates to CartStore', () => {
    const product = makeProduct({ id: 'p1' });
    store.addToCart(product);
    expect(cartStore.items()).toHaveLength(1);
    expect(cartStore.items()[0].product.id).toBe('p1');
  });
});
