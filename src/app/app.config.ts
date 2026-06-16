import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { absoluteUrlInterceptor } from '@core/interceptors/absolute-url.interceptor';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BRAND_CONFIG, FOOTER_CONTENT, PRODUCT_SERVICE } from '@core/tokens';
import { ProductService } from '@core/services/product.service';
import { environment } from '@environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: BRAND_CONFIG, useValue: environment.brand },
    { provide: FOOTER_CONTENT, useValue: environment.footer },
    { provide: PRODUCT_SERVICE, useClass: ProductService },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([absoluteUrlInterceptor])),
    provideClientHydration(withEventReplay())
  ]
};
