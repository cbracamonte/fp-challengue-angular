import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartState } from '@core/state/cart.state';
import { BRAND_CONFIG } from '@core/tokens';
import { NAV_LINKS } from '@shared/constants/navigation';



@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './header.html',
})
export class HeaderComponent {
  protected readonly brand = inject(BRAND_CONFIG);
  protected readonly cart = inject(CartState);
  protected readonly navLinks = NAV_LINKS;
}
