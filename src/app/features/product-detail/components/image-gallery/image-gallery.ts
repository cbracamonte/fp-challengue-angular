import { ChangeDetectionStrategy, Component, input, signal, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import type { ProductImage } from '@api/types/product.types';

@Component({
  selector: 'app-image-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  template: `
    <div class="flex flex-col gap-4">
      <div class="relative aspect-square overflow-hidden rounded-xl bg-gray-50">
        <img
          [ngSrc]="activeImage().url"
          [alt]="activeImage().alt"
          fill
          class="object-contain p-6"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      @if (images().length > 1) {
        <div class="flex gap-2 overflow-x-auto pb-1" role="list" aria-label="Product images">
          @for (img of images(); track img.id; let i = $index) {
            <button
              class="flex-shrink-0 h-16 w-16 overflow-hidden rounded-md border-2 transition-colors"
              [class]="activeIndex() === i
                ? 'border-[var(--color-primary)]'
                : 'border-gray-200 hover:border-gray-400'"
              (click)="activeIndex.set(i)"
              [attr.aria-label]="img.alt"
              [attr.aria-current]="activeIndex() === i ? 'true' : null"
              role="listitem"
            >
              <img
                [ngSrc]="img.url"
                [alt]="img.alt"
                width="64"
                height="64"
                class="object-contain p-1 h-full w-full"
              />
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class ImageGalleryComponent {
  readonly images = input.required<ProductImage[]>();

  protected readonly activeIndex = signal(0);
  protected readonly activeImage = computed(
    () => this.images()[this.activeIndex()] ?? this.images()[0],
  );
}
