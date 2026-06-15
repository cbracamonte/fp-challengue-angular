import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import type { Product } from '@api/types/product.types';

interface Tab {
  id: string;
  label: string;
  content: string;
}

@Component({
  selector: 'app-product-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mt-8">
      <div role="tablist" class="flex border-b border-gray-200" aria-label="Product details">
        @for (tab of visibleTabs(); track tab.id) {
          <button
            role="tab"
            [id]="'tab-' + tab.id"
            [attr.aria-controls]="'panel-' + tab.id"
            [attr.aria-selected]="activeTab() === tab.id"
            class="px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px"
            [class]="activeTab() === tab.id
              ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            (click)="activeTab.set(tab.id)"
          >
            {{ tab.label }}
          </button>
        }
      </div>

      @for (tab of visibleTabs(); track tab.id) {
        <div
          role="tabpanel"
          [id]="'panel-' + tab.id"
          [attr.aria-labelledby]="'tab-' + tab.id"
          [hidden]="activeTab() !== tab.id"
          class="py-5 text-sm text-gray-700 leading-relaxed whitespace-pre-line"
        >
          {{ tab.content }}
        </div>
      }
    </div>
  `,
})
export class ProductTabsComponent {
  readonly product = input.required<Product>();

  protected readonly activeTab = signal('description');

  protected readonly visibleTabs = computed<Tab[]>(() => {
    const p = this.product();
    const tabs: Tab[] = [];
    if (p.descriptionLong) {
      tabs.push({ id: 'description', label: 'Description', content: p.descriptionLong });
    }
    if (p.composition) {
      tabs.push({ id: 'composition', label: 'Composition', content: p.composition });
    }
    if (p.contraindications) {
      tabs.push({ id: 'contraindications', label: 'Contraindications', content: p.contraindications });
    }
    if (p.warnings) {
      tabs.push({ id: 'warnings', label: 'Warnings', content: p.warnings });
    }
    return tabs;
  });
}
