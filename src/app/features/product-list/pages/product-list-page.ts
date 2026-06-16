import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductListStore } from '@features/product-list/stores/product-list.store';
import { PRODUCT_LIST_STORE } from '@core/tokens';
import { SeoService } from '@core/services/seo.service';
import { ProductCardComponent } from '@shared/components/product-card/product-card';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner';
import { ErrorStateComponent } from '@shared/components/error-state/error-state';

@Component({
  selector: 'app-product-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: PRODUCT_LIST_STORE, useClass: ProductListStore }],
  imports: [ProductCardComponent, LoadingSpinnerComponent, ErrorStateComponent],
  templateUrl: './product-list-page.html',
})
export class ProductListPageComponent {
  protected readonly store = inject(PRODUCT_LIST_STORE);

  constructor() {
    inject(SeoService).setProductListMeta();
  }
}
