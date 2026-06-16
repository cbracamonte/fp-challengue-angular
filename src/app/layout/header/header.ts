import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartStore } from '@core/state/cart.store';
import { BRAND_CONFIG } from '@core/tokens';
import { NAV_LINKS } from '@shared/constants/navigation';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './header.html',
})
export class HeaderComponent {
  protected readonly brand = inject(BRAND_CONFIG);
  protected readonly cart = inject(CartStore);
  protected readonly navLinks = NAV_LINKS;
}
