import { InjectionToken } from '@angular/core';
import type { IProductService } from '@core/services/product.service.interface';

export const PRODUCT_SERVICE = new InjectionToken<IProductService>('core.product.service');
