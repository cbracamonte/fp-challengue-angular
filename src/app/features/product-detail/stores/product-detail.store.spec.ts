import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { ProductDetailStore } from './product-detail.store';
import { CartStore } from '@core/state/cart.store';
import { AnalyticsService } from '@core/services/analytics.service';
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
  gallery: [{ id: 'img-1', url: 'https://example.com/img.jpg', alt: 'Test Product' }],
  price: { currency: 'PEN', current: 10.0, original: 15.0 },
  descriptionShort: ['Feature 1'],
  regulatoryCode: 'REG-001',
  descriptionLong: 'Description',
  composition: 'Composition',
  contraindications: 'None',
  warnings: 'None',
  relatedProductIds: ['prod-2'],
  ...overrides,
});

const relatedProduct = makeProduct({ id: 'prod-2', slug: 'related-product', sku: 'SKU002' });

describe('ProductDetailStore', () => {
  let store: InstanceType<typeof ProductDetailStore>;
  let cartStore: InstanceType<typeof CartStore>;

  const mockProductService: Partial<IProductService> = {
    getProduct: vi.fn(() => of(makeProduct())),
    getRelatedProducts: vi.fn(() => of([relatedProduct])),
  };

  const mockAnalytics = {
    trackViewItem: vi.fn(),
    trackAddToCart: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (mockProductService.getProduct as ReturnType<typeof vi.fn>).mockReturnValue(of(makeProduct()));
    (mockProductService.getRelatedProducts as ReturnType<typeof vi.fn>).mockReturnValue(of([relatedProduct]));

    TestBed.configureTestingModule({
      providers: [
        ProductDetailStore,
        CartStore,
        { provide: PRODUCT_SERVICE, useValue: mockProductService },
        { provide: AnalyticsService, useValue: mockAnalytics },
      ],
    });

    cartStore = TestBed.inject(CartStore);
    store = TestBed.inject(ProductDetailStore);
  });

  it('starts with loading=true and no product', () => {
    expect(store.loading()).toBe(true);
    expect(store.product()).toBeNull();
    expect(store.error()).toBeNull();
  });

  it('load sets product and selectedVariant on success', () => {
    store.load('test-product');
    expect(store.loading()).toBe(false);
    expect(store.product()?.id).toBe('prod-1');
    expect(store.selectedVariant()?.name).toBe('Caja');
    expect(store.error()).toBeNull();
  });

  it('load fetches related products', () => {
    store.load('test-product');
    expect(store.relatedProducts()).toHaveLength(1);
    expect(store.relatedProducts()[0].id).toBe('prod-2');
  });

  it('load tracks view item via analytics', () => {
    store.load('test-product');
    expect(mockAnalytics.trackViewItem).toHaveBeenCalledWith(expect.objectContaining({ id: 'prod-1' }));
  });

  it('load sets error on product fetch failure', () => {
    (mockProductService.getProduct as ReturnType<typeof vi.fn>).mockReturnValue(
      throwError(() => new Error('Network error')),
    );
    store.load('test-product');
    expect(store.error()).toBe('Could not load product. Please try again.');
    expect(store.loading()).toBe(false);
    expect(store.product()).toBeNull();
  });

  it('addToCart adds current product to CartStore and tracks analytics', () => {
    store.load('test-product');
    store.addToCart();
    expect(cartStore.items()).toHaveLength(1);
    expect(cartStore.items()[0].product.id).toBe('prod-1');
    expect(mockAnalytics.trackAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'prod-1' }),
      1,
    );
  });

  it('addToCart is a no-op when product is null', () => {
    store.addToCart();
    expect(cartStore.items()).toHaveLength(0);
    expect(mockAnalytics.trackAddToCart).not.toHaveBeenCalled();
  });

  it('addRelatedToCart adds related product to CartStore', () => {
    store.addRelatedToCart(relatedProduct);
    expect(cartStore.items()).toHaveLength(1);
    expect(cartStore.items()[0].product.id).toBe('prod-2');
  });

  it('setVariant updates selectedVariant', () => {
    store.load('test-product');
    const newVariant = { name: 'Blister', quantity: 10 };
    store.setVariant(newVariant);
    expect(store.selectedVariant()).toEqual(newVariant);
  });
});
