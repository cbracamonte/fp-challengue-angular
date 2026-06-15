import { describe, it, expect, beforeEach } from 'vitest';
import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatPipe();
  });

  it('formats PEN currency with S/ symbol', () => {
    expect(pipe.transform(10, 'PEN')).toBe('S/ 10.00');
  });

  it('formats USD currency with $ symbol', () => {
    expect(pipe.transform(9.99, 'USD')).toBe('$ 9.99');
  });

  it('defaults to PEN when currency omitted', () => {
    expect(pipe.transform(5.5)).toBe('S/ 5.50');
  });

  it('formats zero correctly', () => {
    expect(pipe.transform(0, 'PEN')).toBe('S/ 0.00');
  });

  it('rounds to 2 decimal places', () => {
    expect(pipe.transform(1.999, 'PEN')).toBe('S/ 2.00');
  });
});
