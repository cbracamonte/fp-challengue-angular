import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center justify-center py-16 gap-4" role="alert">
      <p class="text-[var(--color-danger)] text-lg font-medium">{{ message() }}</p>
      @if (retryable()) {
        <button
          class="px-6 py-2 rounded-md bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
          (click)="retry.emit()"
        >
          Try again
        </button>
      }
    </div>
  `,
})
export class ErrorStateComponent {
  readonly message = input<string>('An error occurred. Please try again.');
  readonly retryable = input<boolean>(true);
  readonly retry = output<void>();
}
