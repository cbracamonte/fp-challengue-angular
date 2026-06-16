import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import type { FooterColumn } from '@shared/models';
import { FOOTER_CONTENT } from '@core/tokens/';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly footerContent = inject(FOOTER_CONTENT, { optional: true });
  protected readonly navColumns = signal<readonly FooterColumn[]>(
    this.footerContent?.columns ?? [],
  );
  protected readonly copyright = signal<string>(
    this.footerContent?.copyright ?? '',
  );
}
