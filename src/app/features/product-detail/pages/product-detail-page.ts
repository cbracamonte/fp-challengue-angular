import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductDetailStore } from '@features/product-detail/stores/product-detail.store';
import { ImageGalleryComponent } from '@features/product-detail/components/image-gallery/image-gallery';
import { ProductInfoComponent } from '@features/product-detail/components/product-info/product-info';
import { ProductTabsComponent } from '@features/product-detail/components/product-tabs/product-tabs';
import { RelatedProductsComponent } from '@features/product-detail/components/related-products/related-products';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner';
import { ErrorStateComponent } from '@shared/components/error-state/error-state';

@Component({
  selector: 'app-product-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductDetailStore],
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
export class ProductDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  protected readonly store = inject(ProductDetailStore);

  ngOnInit(): void {
    this.store.load(this.route.snapshot.paramMap.get('slug') ?? '');
  }

  protected reload(): void {
    this.store.load(this.route.snapshot.paramMap.get('slug') ?? '');
  }
}
