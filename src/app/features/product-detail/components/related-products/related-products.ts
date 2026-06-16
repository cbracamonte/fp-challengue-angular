import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { Product } from '@api/types/product.types';
import { ProductCardComponent } from '@shared/components/product-card/product-card';

@Component({
  selector: 'app-related-products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCardComponent],
  templateUrl: './related-products.html',
})
export class RelatedProductsComponent implements OnDestroy {
  readonly products = input.required<Product[]>();
  readonly addToCart = output<Product>();

  protected readonly scrollContainerRef = viewChild<ElementRef<HTMLElement>>('scrollContainer');
  protected readonly atStart = signal(true);
  protected readonly atEnd = signal(false);

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private listenerAttached = false;
  private resizeObserver?: ResizeObserver;

  constructor() {
    effect(() => {
      if (!this.isBrowser) return;
      const el = this.scrollContainerRef()?.nativeElement;
      if (!el || this.listenerAttached) return;
      this.listenerAttached = true;
      el.addEventListener('scroll', this.onScroll, { passive: true });
      this.resizeObserver = new ResizeObserver(() => this.updateArrows());
      this.resizeObserver.observe(el);
      this.updateArrows();
    });
  }

  ngOnDestroy(): void {
    this.scrollContainerRef()?.nativeElement.removeEventListener('scroll', this.onScroll);
    this.resizeObserver?.disconnect();
  }

  protected scrollPrev(): void {
    this.scrollContainerRef()?.nativeElement.scrollBy({ left: -400, behavior: 'smooth' });
  }

  protected scrollNext(): void {
    this.scrollContainerRef()?.nativeElement.scrollBy({ left: 400, behavior: 'smooth' });
  }

  private readonly onScroll = (): void => this.updateArrows();

  private updateArrows(): void {
    const el = this.scrollContainerRef()?.nativeElement;
    if (!el) return;
    this.atStart.set(el.scrollLeft <= 4);
    this.atEnd.set(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }
}
