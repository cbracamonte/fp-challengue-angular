import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { ProductVariant } from '@api/types/product.types';

@Component({
  selector: 'app-variant-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-2">
      <p class="text-sm font-semibold text-gray-700">Presentations</p>
      <div class="flex flex-wrap gap-2" role="group" aria-label="Product presentations">
        @for (variant of variants(); track variant.name) {
          <button
            class="rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
            [class]="selected()?.name === variant.name
              ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
              : 'border-gray-300 text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'"
            [attr.aria-pressed]="selected()?.name === variant.name"
            (click)="selectedChange.emit(variant)"
          >
            {{ variant.name }}
          </button>
        }
      </div>
    </div>
  `,
})
export class VariantSelectorComponent {
  readonly variants = input.required<ProductVariant[]>();
  readonly selected = input<ProductVariant | null>(null);
  readonly selectedChange = output<ProductVariant>();
}
