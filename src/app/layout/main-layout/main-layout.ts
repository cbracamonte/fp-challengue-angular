import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '@layout/footer/footer';
import { HeaderComponent } from '@layout/header/header';

@Component({
  selector: 'app-main-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Footer, HeaderComponent],
  template: `
    <app-header />
    <main class="min-h-screen bg-[var(--color-background)]">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class MainLayoutComponent {}
