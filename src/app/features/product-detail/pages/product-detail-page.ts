import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ProductDetailStore } from '@features/product-detail/stores/product-detail.store';
import { PRODUCT_DETAIL_STORE } from '@core/tokens';
import { SeoService } from '@core/services/seo.service';
import { ImageGalleryComponent } from '@features/product-detail/components/image-gallery/image-gallery';
import { ProductInfoComponent } from '@features/product-detail/components/product-info/product-info';
import { ProductTabsComponent } from '@features/product-detail/components/product-tabs/product-tabs';
import { RelatedProductsComponent } from '@features/product-detail/components/related-products/related-products';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner';
import { ErrorStateComponent } from '@shared/components/error-state/error-state';

@Component({
  selector: 'app-product-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: PRODUCT_DETAIL_STORE, useClass: ProductDetailStore }],
  imports: [
    RouterLink,
    ImageGalleryComponent,
    ProductInfoComponent,
    ProductTabsComponent,
    RelatedProductsComponent,
    LoadingSpinnerComponent,
    ErrorStateComponent,
  ],
  templateUrl: './product-detail-page.html',
})
export class ProductDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly store = inject(PRODUCT_DETAIL_STORE);
  private readonly seo = inject(SeoService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map(p => p.get('slug') ?? '')),
    { initialValue: '' },
  );

  constructor() {
    this.store.load(this.slug);
    effect(() => {
      const product = this.store.product();
      if (product) this.seo.setProductMeta(product);
    });
  }

  protected reload(): void {
    this.store.load(this.slug());
  }
}
