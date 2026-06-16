import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SeoService } from './seo.service';
import { BRAND_CONFIG } from '@core/tokens/brand';
import { SEO_BASE_URL } from '@core/tokens/seo-base-url';
import { Product } from '@api/types/product.types';

const MOCK_BRAND = {
  brandName: 'Inkafarma',
  logoPath: '/logo.svg',
  logoAlt: 'Inkafarma',
  announcementText: '',
};

const MOCK_BASE_URL = 'https://fp-challengue-angular.onrender.com';

function makeDoc() {
  const scripts: Record<string, { textContent: string }> = {};
  let canonical: { href: string } | null = null;

  const head = {
    appendChild: vi.fn((el: { type?: string; getAttribute?: (k: string) => string; textContent: string; rel?: string; href?: string }) => {
      if (el.type === 'application/ld+json' && el.getAttribute) {
        const id = el.getAttribute('data-seo-id') ?? '';
        scripts[id] = el as { textContent: string };
      }
      if (el.rel === 'canonical') {
        canonical = el as { href: string };
      }
    }),
  };

  const doc = {
    head,
    createElement: vi.fn((tag: string) => {
      const el: Record<string, unknown> = { tag, textContent: '', setAttribute: vi.fn((k: string, v: string) => { el[k] = v; }), getAttribute: vi.fn((k: string) => el[k] as string) };
      return el;
    }),
    querySelector: vi.fn((selector: string) => {
      const idMatch = selector.match(/\[data-seo-id="([^"]+)"\]/);
      if (idMatch) return scripts[idMatch[1]] ?? null;
      if (selector === 'link[rel="canonical"]') return canonical;
      return null;
    }),
    _scripts: scripts,
    _canonical: () => canonical,
  };
  return doc;
}

const MOCK_PRODUCT: Product = {
  id: 'prod-1',
  sku: 'SKU001',
  slug: 'paracetamol-500mg',
  name: 'Paracetamol 500mg',
  brand: 'Farma',
  category: { slug: 'analgesicos', name: 'Analgésicos' },
  available: true,
  variants: [],
  image: 'https://cdn.test/img.jpg',
  gallery: [{ id: 'g1', url: 'https://cdn.test/g1.jpg', alt: 'alt' }],
  price: { currency: 'PEN', current: 5.9, original: 7.5 },
  descriptionShort: ['Alivia el dolor de cabeza y la fiebre.'],
  regulatoryCode: 'REG001',
  descriptionLong: '',
  composition: '',
  contraindications: '',
  warnings: '',
  relatedProductIds: [],
};

describe('SeoService', () => {
  let service: SeoService;
  let titleSpy: { setTitle: ReturnType<typeof vi.fn> };
  let metaSpy: { updateTag: ReturnType<typeof vi.fn> };
  let mockDoc: ReturnType<typeof makeDoc>;

  beforeEach(() => {
    titleSpy = { setTitle: vi.fn() };
    metaSpy = { updateTag: vi.fn() };
    mockDoc = makeDoc();

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Title, useValue: titleSpy },
        { provide: Meta, useValue: metaSpy },
        { provide: DOCUMENT, useValue: mockDoc },
        { provide: BRAND_CONFIG, useValue: MOCK_BRAND },
        { provide: SEO_BASE_URL, useValue: MOCK_BASE_URL },
      ],
    });
    service = TestBed.inject(SeoService);
  });

  describe('setProductListMeta', () => {
    beforeEach(() => service.setProductListMeta());

    it('sets title with brand name', () => {
      expect(titleSpy.setTitle).toHaveBeenCalledWith(
        'Medicamentos y Productos de Salud | Inkafarma',
      );
    });

    it('sets meta description', () => {
      expect(metaSpy.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'description' }),
      );
    });

    it('sets og:type to website', () => {
      expect(metaSpy.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ property: 'og:type', content: 'website' }),
      );
    });

    it('injects WebSite JSON-LD script', () => {
      const script = mockDoc._scripts['website'];
      expect(script).toBeDefined();
      const schema = JSON.parse(script.textContent);
      expect(schema['@type']).toBe('WebSite');
      expect(schema.name).toBe('Inkafarma');
    });

    it('appends canonical link', () => {
      expect(mockDoc.head.appendChild).toHaveBeenCalled();
    });
  });

  describe('setProductMeta', () => {
    beforeEach(() => service.setProductMeta(MOCK_PRODUCT));

    it('sets title with product name and brand', () => {
      expect(titleSpy.setTitle).toHaveBeenCalledWith('Paracetamol 500mg | Inkafarma');
    });

    it('sets meta description from descriptionShort', () => {
      expect(metaSpy.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'description',
          content: 'Alivia el dolor de cabeza y la fiebre.',
        }),
      );
    });

    it('sets og:image to product image', () => {
      expect(metaSpy.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ property: 'og:image', content: MOCK_PRODUCT.image }),
      );
    });

    it('sets og:url with product slug', () => {
      expect(metaSpy.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({
          property: 'og:url',
          content: `${MOCK_BASE_URL}/producto/${MOCK_PRODUCT.slug}`,
        }),
      );
    });

    it('injects Product JSON-LD with correct @type', () => {
      const script = mockDoc._scripts['product'];
      expect(script).toBeDefined();
      const schema = JSON.parse(script.textContent);
      expect(schema['@type']).toBe('Product');
      expect(schema.name).toBe('Paracetamol 500mg');
      expect(schema.sku).toBe('SKU001');
    });

    it('Product JSON-LD offer reflects availability', () => {
      const schema = JSON.parse(mockDoc._scripts['product'].textContent);
      expect(schema.offers.availability).toBe('https://schema.org/InStock');
    });

    it('injects BreadcrumbList JSON-LD', () => {
      const script = mockDoc._scripts['breadcrumb'];
      expect(script).toBeDefined();
      const schema = JSON.parse(script.textContent);
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement[2].name).toBe('Paracetamol 500mg');
    });
  });

  describe('setNoIndex', () => {
    it('sets robots to noindex, nofollow', () => {
      service.setNoIndex();
      expect(metaSpy.updateTag).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'robots', content: 'noindex, nofollow' }),
      );
    });
  });

  describe('setJsonLd deduplication', () => {
    it('updates existing script text instead of appending a new one', () => {
      service.setProductListMeta();
      const firstCallCount = (mockDoc.head.appendChild as ReturnType<typeof vi.fn>).mock.calls.length;
      service.setProductListMeta();
      expect((mockDoc.head.appendChild as ReturnType<typeof vi.fn>).mock.calls.length).toBe(firstCallCount);
    });
  });
});
