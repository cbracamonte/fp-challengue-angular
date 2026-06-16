import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { PRODUCT_SERVICE } from '@core/tokens';
import { ProductSSRService } from '@core/services/product-ssr.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: PRODUCT_SERVICE, useClass: ProductSSRService },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
