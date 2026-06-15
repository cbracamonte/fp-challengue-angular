import { InjectionToken } from '@angular/core';
import { BrandConfig } from '@shared/models/brand';

export const BRAND_CONFIG = new InjectionToken<BrandConfig>('app.brand.config');
