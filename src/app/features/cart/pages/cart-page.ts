import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '@core/state/cart.store';
import { SeoService } from '@core/services/seo.service';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format.pipe';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyFormatPipe, NgOptimizedImage],
  templateUrl: './cart-page.html',
})
export class CartPageComponent {
  protected readonly cart = inject(CartStore);
  protected readonly isEmpty = computed(() => this.cart.items().length === 0);

  constructor() {
    inject(SeoService).setNoIndex();
  }
}
