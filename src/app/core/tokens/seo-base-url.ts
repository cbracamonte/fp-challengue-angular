import { InjectionToken } from '@angular/core';

export const SEO_BASE_URL = new InjectionToken<string>('seo.base_url', {
  providedIn: 'root',
  factory: () => '',
});
