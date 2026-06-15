export type CurrencyCode = 'PEN' | 'USD';

export interface ProductCategory {
  slug: string;
  name: string;
}

export interface ProductVariant {
  name: string;
  quantity: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface ProductPrice {
  currency: CurrencyCode;
  current: number;
  original: number;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  available: boolean;
  variants: ProductVariant[];
  image: string;
  gallery: ProductImage[];
  price: ProductPrice;
  descriptionShort: string[];
  regulatoryCode: string;
  descriptionLong: string;
  composition: string;
  contraindications: string;
  warnings: string;
  relatedProductIds: string[];
}
