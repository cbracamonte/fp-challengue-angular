import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductListStore } from '@features/product-list/stores/product-list.store';
import { ProductCardComponent } from '@shared/components/product-card/product-card';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner';
import { ErrorStateComponent } from '@shared/components/error-state/error-state';

@Component({
  selector: 'app-product-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductListStore],
  imports: [ProductCardComponent, LoadingSpinnerComponent, ErrorStateComponent],
  templateUrl: './product-list-page.html',
})
export class ProductListPageComponent {
  protected readonly store = inject(ProductListStore);
}
