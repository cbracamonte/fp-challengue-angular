import { Pipe, PipeTransform } from '@angular/core';
import type { CurrencyCode } from '@api/types/product.types';

const SYMBOLS: Record<CurrencyCode, string> = { PEN: 'S/', USD: '$' };

@Pipe({ name: 'currencyFormat' })
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, currency: CurrencyCode = 'PEN'): string {
    return `${SYMBOLS[currency]} ${value.toFixed(2)}`;
  }
}
