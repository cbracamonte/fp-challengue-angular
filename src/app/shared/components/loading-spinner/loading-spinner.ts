import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex items-center justify-center py-16"
      role="status"
      aria-label="Loading"
    >
      <div
        class="h-10 w-10 animate-spin rounded-full border-4 border-gray-200"
        style="border-top-color: var(--color-primary)"
        aria-hidden="true"
      ></div>
    </div>
  `,
})
export class LoadingSpinnerComponent {}
