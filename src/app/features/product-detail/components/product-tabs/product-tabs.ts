import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import type { Product } from '@api/types/product.types';
import { PRODUCT_TAB_DEFINITIONS } from '@features/product-detail/constants/product-tab';
import { ProductTab } from '@shared/models/product-tab';

@Component({
  selector: 'app-product-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-tabs.html',
})
export class ProductTabsComponent {
  readonly product = input.required<Product>();

  protected readonly openSections = signal<Set<string>>(new Set(['description']));

  protected readonly visibleTabs = computed<ProductTab[]>(() => {
    const p = this.product();
    if (!p) return [];
    return PRODUCT_TAB_DEFINITIONS.map(({ id, label, getContent }) => {
      const raw = getContent(p);
      const content = typeof raw === 'string' ? raw.trim() : raw;
      return content ? { id, label, content } : null;
    }).filter((t) => t !== null) as ProductTab[];
  });

  protected isOpen(id: string): boolean {
    return this.openSections().has(id);
  }

  protected toggle(id: string): void {
    this.openSections.update((set) => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }
}
