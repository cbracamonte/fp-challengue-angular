import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartState } from '@core/state/cart.state';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <header
      class="sticky top-0 z-50 bg-white shadow-sm"
      role="banner"
    >
      <div class="container mx-auto flex items-center justify-between px-4 py-3">
        <a
          routerLink="/"
          class="flex items-center gap-2 text-xl font-bold"
          style="color: var(--color-primary)"
          aria-label="Farmácias Peruanas — go to home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M11.25 3v8.25H3v1.5h8.25V21h1.5v-8.25H21v-1.5h-8.25V3h-1.5z" />
          </svg>
          FP Farma
        </a>

        <a
          routerLink="/cart"
          class="relative flex items-center gap-1 p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Shopping cart, {{ cart.totalQuantity() }} items"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="h-6 w-6 text-gray-700"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          @if (cart.totalQuantity() > 0) {
            <span
              class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-white text-xs font-bold"
              style="background-color: var(--color-primary)"
              aria-hidden="true"
            >
              {{ cart.totalQuantity() }}
            </span>
          }
        </a>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly cart = inject(CartState);
}
