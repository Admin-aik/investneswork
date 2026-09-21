import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'ds-modal',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      (click)="onBackdropClick($event)"
    >
      <div
        class="bg-[var(--ds-surface-body)] border border-[var(--ds-border-default)] rounded-3xl shadow-2xl w-full overflow-hidden flex flex-col max-h-[90vh] transition-transform animate-in fade-in zoom-in-95 duration-200"
        [ngClass]="sizeClasses[size]"
        (click)="$event.stopPropagation()"
      >
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-[var(--ds-border-default)] flex items-center justify-between bg-[var(--ds-surface-muted)]/50">
          <div>
            <h3 *ngIf="title" class="text-base sm:text-lg font-extrabold text-[#0f2a43] leading-snug">
              {{ title }}
            </h3>
            <p *ngIf="subtitle" class="text-xs text-[#6b7280] mt-0.5">
              {{ subtitle }}
            </p>
          </div>
          <button
            type="button"
            (click)="closeModal()"
            class="text-[#6b7280] hover:text-[#0f2a43] p-1.5 rounded-xl hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="px-6 py-5 overflow-y-auto flex-1 text-sm text-[#374151]">
          <ng-content></ng-content>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-[var(--ds-border-default)] bg-[var(--ds-surface-muted)]/30 flex items-center justify-end gap-3">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class DsModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() size: DsModalSize = 'md';
  @Input() closeOnBackdrop: boolean = true;
  @Output() close = new EventEmitter<void>();

  readonly sizeClasses: Record<DsModalSize, string> = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  closeModal(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop) {
      this.closeModal();
    }
  }
}
