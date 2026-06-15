import { InjectionToken } from '@angular/core';
import type { FooterModel } from '@shared/models/footer';

export const FOOTER_CONTENT = new InjectionToken<FooterModel>('app.footer.content');