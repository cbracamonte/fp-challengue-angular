import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartStore } from './cart.store';
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

describe('CartStore', () => {
  let store: InstanceType<typeof CartStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(CartStore);
  });

  describe('initial state', () => {
    it('starts empty', () => {
      expect(store.items()).toHaveLength(0);
      expect(store.totalQuantity()).toBe(0);
      expect(store.subtotal()).toBe(0);
      expect(store.currency()).toBe('PEN');
    });
  });

  describe('add()', () => {
    it('adds new product with default quantity 1', () => {
      const p = makeProduct();
      store.add(p);
      expect(store.items()).toHaveLength(1);
      expect(store.items()[0].quantity).toBe(1);
      expect(store.totalQuantity()).toBe(1);
    });

    it('accumulates quantity when adding same product twice', () => {
      const p = makeProduct();
      store.add(p);
      store.add(p);
      expect(store.items()).toHaveLength(1);
      expect(store.items()[0].quantity).toBe(2);
      expect(store.totalQuantity()).toBe(2);
    });

    it('adds multiple distinct products as separate items', () => {
      store.add(makeProduct({ id: 'prod-1' }));
      store.add(makeProduct({ id: 'prod-2', sku: 'SKU002' }));
      expect(store.items()).toHaveLength(2);
      expect(store.totalQuantity()).toBe(2);
    });

    it('respects custom quantity parameter', () => {
      const p = makeProduct();
      store.add(p, 3);
      expect(store.items()[0].quantity).toBe(3);
      expect(store.totalQuantity()).toBe(3);
    });
  });

  describe('remove()', () => {
    it('removes product by id', () => {
      const p = makeProduct();
      store.add(p);
      store.remove('prod-1');
      expect(store.items()).toHaveLength(0);
    });

    it('does nothing when product not in cart', () => {
      const p = makeProduct();
      store.add(p);
      store.remove('nonexistent-id');
      expect(store.items()).toHaveLength(1);
    });

    it('only removes matched product, leaves others', () => {
      store.add(makeProduct({ id: 'prod-1' }));
      store.add(makeProduct({ id: 'prod-2', sku: 'SKU002' }));
      store.remove('prod-1');
      expect(store.items()).toHaveLength(1);
      expect(store.items()[0].product.id).toBe('prod-2');
    });
  });

  describe('clear()', () => {
    it('empties cart', () => {
      store.add(makeProduct());
      store.clear();
      expect(store.items()).toHaveLength(0);
      expect(store.totalQuantity()).toBe(0);
      expect(store.subtotal()).toBe(0);
    });
  });

  describe('computed signals', () => {
    it('calculates subtotal across multiple items', () => {
      store.add(makeProduct({ id: 'p1', price: { currency: 'PEN', current: 10, original: 15 } }), 2);
      store.add(makeProduct({ id: 'p2', sku: 'SKU002', price: { currency: 'PEN', current: 5, original: 8 } }), 3);
      expect(store.subtotal()).toBeCloseTo(35);
    });

    it('currency reflects first item currency', () => {
      store.add(makeProduct({ price: { currency: 'USD', current: 5, original: 10 } }));
      expect(store.currency()).toBe('USD');
    });

    it('currency defaults to PEN when cart is empty', () => {
      expect(store.currency()).toBe('PEN');
    });
  });
});
