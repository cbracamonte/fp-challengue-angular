import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import type { Product } from '@api/types/product.types';
import { PRODUCT_TAB_DEFINITIONS } from '@features/product-detail/constants/product-tab';
import { TabId } from '@features/product-detail/types/tab';
import { ProductTab } from '@shared/models/product-tab';

@Component({
  selector: 'app-product-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-tabs.html',
})
export class ProductTabsComponent {
  readonly product = input.required<Product>();
  protected readonly activeTab = signal<TabId | null>('description');

  protected readonly visibleTabs = computed<ProductTab[]>(() => {
    const p = this.product();
    if (!p) return [];

    return PRODUCT_TAB_DEFINITIONS.map(({ id, label, getContent }) => {
      const raw = getContent(p);
      const content = typeof raw === 'string' ? raw.trim() : raw;
      return content ? { id, label, content } : null;
    }).filter((t) => t !== null) as ProductTab[];
  });

  constructor() {
    effect(() => {
      const tabs = this.visibleTabs();
      if (tabs.length === 0) {
        this.activeTab.set(null);
        return;
      }
      const active = this.activeTab();
      if (active === null || !tabs.some((t) => t.id === active)) {
        this.activeTab.set(tabs[0].id as TabId);
      }
    });
  }

  protected selectTab(tabId: string) {
    this.activeTab.set(tabId as TabId);
  }

  protected trackByTab(_: number, tab: ProductTab) {
    return tab.id;
  }
}
