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
  template: `
    @if (products().length > 0) {
      <section aria-labelledby="related-heading">
        <div class="mb-4 flex items-center justify-between">
          <h2 id="related-heading" class="text-xl font-bold text-[var(--color-accent)]">
            Lo más buscado
          </h2>
        </div>

        <div class="relative">
          <button
            type="button"
            class="absolute -left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
            [disabled]="atStart()"
            (click)="scrollPrev()"
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            #scrollContainer
            class="scrollbar-none flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
            role="list"
            aria-label="Carrusel de productos relacionados"
          >
            @for (product of products(); track product.id) {
              <div class="w-48 flex-shrink-0 snap-start" role="listitem">
                <app-product-card
                  [product]="product"
                  (addToCart)="addToCart.emit($event)"
                />
              </div>
            }
          </div>

          <button
            type="button"
            class="absolute -right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
            [disabled]="atEnd()"
            (click)="scrollNext()"
            aria-label="Siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    }
  `,
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
    effect(
      () => {
        if (!this.isBrowser) return;
        const el = this.scrollContainerRef()?.nativeElement;
        if (!el || this.listenerAttached) return;
        this.listenerAttached = true;
        el.addEventListener('scroll', this.onScroll, { passive: true });
        this.resizeObserver = new ResizeObserver(() => this.updateArrows());
        this.resizeObserver.observe(el);
        this.updateArrows();
      },
      { allowSignalWrites: true },
    );
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
