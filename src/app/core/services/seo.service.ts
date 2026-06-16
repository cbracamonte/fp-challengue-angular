import { inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { BRAND_CONFIG } from '@core/tokens/brand';
import { SEO_BASE_URL } from '@core/tokens/seo-base-url';
import { Product } from '@api/types/product.types';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly brand = inject(BRAND_CONFIG);
  private readonly baseUrl = inject(SEO_BASE_URL);

  setProductListMeta(): void {
    const pageTitle = `Medicamentos y Productos de Salud | ${this.brand.brandName}`;
    const description = `Compra medicamentos, vitaminas y productos de salud en ${this.brand.brandName}. Envíos rápidos y precios accesibles.`;

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: this.baseUrl + '/' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.setCanonical('/');
    this.setJsonLd('website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.brand.brandName,
      url: this.baseUrl + '/',
    });
  }

  setProductMeta(product: Product): void {
    const pageTitle = `${product.name} | ${this.brand.brandName}`;
    const description = product.descriptionShort.join(' ').slice(0, 160);
    const productUrl = `${this.baseUrl}/producto/${product.slug}`;
    const availability = product.available
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock';

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: productUrl });
    this.meta.updateTag({ property: 'og:type', content: 'product' });
    this.meta.updateTag({ property: 'og:image', content: product.image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: product.image });
    this.setCanonical(`/producto/${product.slug}`);

    const images = [product.image, ...product.gallery.map(g => g.url)];

    this.setJsonLd('product', {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: images,
      description,
      sku: product.sku,
      brand: { '@type': 'Brand', name: product.brand },
      offers: {
        '@type': 'Offer',
        price: product.price.current.toString(),
        priceCurrency: product.price.currency,
        availability,
        url: productUrl,
      },
    });

    this.setJsonLd('breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${this.baseUrl}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: product.category.name,
          item: `${this.baseUrl}/`,
        },
        { '@type': 'ListItem', position: 3, name: product.name },
      ],
    });
  }

  setNoIndex(): void {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  private setJsonLd(id: string, schema: object): void {
    const existing = this.document.querySelector(`script[data-seo-id="${id}"]`);
    if (existing) {
      existing.textContent = JSON.stringify(schema);
      return;
    }
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-id', id);
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  private setCanonical(path: string): void {
    const href = this.baseUrl + path;
    const existing = this.document.querySelector('link[rel="canonical"]');
    if (existing) {
      existing.setAttribute('href', href);
      return;
    }
    const link = this.document.createElement('link');
    link.rel = 'canonical';
    link.href = href;
    this.document.head.appendChild(link);
  }
}
