import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID, REQUEST } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const absoluteUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (isPlatformBrowser(inject(PLATFORM_ID))) return next(req);
  if (req.url.startsWith('http')) return next(req);

  const serverRequest = inject(REQUEST, { optional: true });
  if (!serverRequest) return next(req);

  const { origin } = new URL(serverRequest.url);
  return next(req.clone({ url: `${origin}${req.url}` }));
};
