import { InjectionToken } from '@angular/core';

export const GA_MEASUREMENT_ID = new InjectionToken<string>('ga.measurement_id', {
  providedIn: 'root',
  factory: () => '',
});
