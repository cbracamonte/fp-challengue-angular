import { describe, it, expect, beforeEach } from 'vitest';
import { CartState } from './cart.state';
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

describe('CartState', () => {
  let cart: CartState;

  beforeEach(() => {
    cart = new CartState();
  });

  describe('initial state', () => {
    it('starts empty', () => {
      expect(cart.items()).toHaveLength(0);
      expect(cart.totalQuantity()).toBe(0);
      expect(cart.subtotal()).toBe(0);
      expect(cart.currency()).toBe('PEN');
    });
  });

  describe('add()', () => {
    it('adds new product with default quantity 1', () => {
      const p = makeProduct();
      cart.add(p);
      expect(cart.items()).toHaveLength(1);
      expect(cart.items()[0].quantity).toBe(1);
      expect(cart.totalQuantity()).toBe(1);
    });

    it('accumulates quantity when adding same product twice', () => {
      const p = makeProduct();
      cart.add(p);
      cart.add(p);
      expect(cart.items()).toHaveLength(1);
      expect(cart.items()[0].quantity).toBe(2);
      expect(cart.totalQuantity()).toBe(2);
    });

    it('adds multiple distinct products as separate items', () => {
      cart.add(makeProduct({ id: 'prod-1' }));
      cart.add(makeProduct({ id: 'prod-2', sku: 'SKU002' }));
      expect(cart.items()).toHaveLength(2);
      expect(cart.totalQuantity()).toBe(2);
    });

    it('respects custom quantity parameter', () => {
      const p = makeProduct();
      cart.add(p, 3);
      expect(cart.items()[0].quantity).toBe(3);
      expect(cart.totalQuantity()).toBe(3);
    });
  });

  describe('remove()', () => {
    it('removes product by id', () => {
      const p = makeProduct();
      cart.add(p);
      cart.remove('prod-1');
      expect(cart.items()).toHaveLength(0);
    });

    it('does nothing when product not in cart', () => {
      const p = makeProduct();
      cart.add(p);
      cart.remove('nonexistent-id');
      expect(cart.items()).toHaveLength(1);
    });

    it('only removes matched product, leaves others', () => {
      cart.add(makeProduct({ id: 'prod-1' }));
      cart.add(makeProduct({ id: 'prod-2', sku: 'SKU002' }));
      cart.remove('prod-1');
      expect(cart.items()).toHaveLength(1);
      expect(cart.items()[0].product.id).toBe('prod-2');
    });
  });

  describe('clear()', () => {
    it('empties cart', () => {
      cart.add(makeProduct());
      cart.clear();
      expect(cart.items()).toHaveLength(0);
      expect(cart.totalQuantity()).toBe(0);
      expect(cart.subtotal()).toBe(0);
    });
  });

  describe('computed signals', () => {
    it('calculates subtotal across multiple items', () => {
      cart.add(makeProduct({ id: 'p1', price: { currency: 'PEN', current: 10, original: 15 } }), 2);
      cart.add(makeProduct({ id: 'p2', sku: 'SKU002', price: { currency: 'PEN', current: 5, original: 8 } }), 3);
      expect(cart.subtotal()).toBeCloseTo(35);
    });

    it('currency reflects first item currency', () => {
      cart.add(makeProduct({ price: { currency: 'USD', current: 5, original: 10 } }));
      expect(cart.currency()).toBe('USD');
    });

    it('currency defaults to PEN when cart is empty', () => {
      expect(cart.currency()).toBe('PEN');
    });
  });
});
