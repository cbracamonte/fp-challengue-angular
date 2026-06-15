import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Optional,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FooterColumn, FooterModel } from '@shared/models';
import { FOOTER_CONTENT } from '@core/tokens/';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly navColumns = signal<readonly FooterColumn[]>([]);
  protected readonly copyright = signal<string>('');
  protected readonly currentYear = computed(() => new Date().getFullYear());

  constructor(@Optional() @Inject(FOOTER_CONTENT) footerContent?: FooterModel) {
    if (footerContent) {
      this.navColumns.set(footerContent.columns);
      this.copyright.set(footerContent.copyright ?? '');
    }
  }
}
