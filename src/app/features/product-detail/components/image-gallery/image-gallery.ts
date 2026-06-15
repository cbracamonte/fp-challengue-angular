import { ChangeDetectionStrategy, Component, input, signal, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import type { ProductImage } from '@api/types/product.types';

@Component({
  selector: 'app-image-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  templateUrl: './image-gallery.html',
})
export class ImageGalleryComponent {
  readonly images = input.required<ProductImage[]>();

  protected readonly activeIndex = signal(0);
  protected readonly activeImage = computed(
    () => this.images()[this.activeIndex()] ?? this.images()[0],
  );
}
