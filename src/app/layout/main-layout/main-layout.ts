import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@layout/footer/footer';
import { HeaderComponent } from '@layout/header/header';

@Component({
  selector: 'app-main-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './main-layout.html',
})
export class MainLayoutComponent {}
