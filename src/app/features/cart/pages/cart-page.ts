import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartState } from '@core/state/cart.state';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format.pipe';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyFormatPipe, NgOptimizedImage],
  templateUrl: './cart-page.html',
})
export class CartPageComponent {
  protected readonly cart = inject(CartState);
  protected readonly isEmpty = computed(() => this.cart.items().length === 0);
}
