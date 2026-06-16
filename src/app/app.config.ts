import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BRAND_CONFIG, FOOTER_CONTENT, GA_MEASUREMENT_ID, PRODUCT_SERVICE, SEO_BASE_URL } from '@core/tokens';
import { ProductService } from '@core/services/product.service';
import { environment } from '@environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: GA_MEASUREMENT_ID, useValue: environment.measurementId },
    { provide: BRAND_CONFIG, useValue: environment.brand },
    { provide: FOOTER_CONTENT, useValue: environment.footer },
    { provide: PRODUCT_SERVICE, useClass: ProductService },
    { provide: SEO_BASE_URL, useValue: environment.url },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay())
  ]
};
