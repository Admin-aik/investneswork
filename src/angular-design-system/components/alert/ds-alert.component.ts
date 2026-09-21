import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsAlertVariant = 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'ds-alert',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="isVisible"
      [ngClass]="[
        'p-4 rounded-xl border flex items-start gap-3 transition-all',
        styleMap[variant]
      ]"
      role="alert"
    >
      <!-- Icon slot / default icon -->
      <div class="shrink-0 mt-0.5">
        <ng-content select="[slot=icon]"></ng-content>
      </div>

      <div class="flex-1 text-xs sm:text-sm">
        <p *ngIf="title" class="font-bold text-sm mb-1 leading-snug">{{ title }}</p>
        <div class="opacity-90 leading-relaxed">
          <ng-content></ng-content>
        </div>
      </div>

      <button
        *ngIf="dismissible"
        type="button"
        (click)="dismiss()"
        class="text-current opacity-60 hover:opacity-100 transition-opacity p-0.5 rounded-lg cursor-pointer"
        aria-label="Cerrar alerta"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `,
})
export class DsAlertComponent {
  @Input() variant: DsAlertVariant = 'info';
  @Input() title?: string;
  @Input() dismissible: boolean = false;
  @Output() closed = new EventEmitter<void>();

  isVisible: boolean = true;

  readonly styleMap: Record<DsAlertVariant, string> = {
    info: 'bg-[#2563eb]/10 border-[#2563eb]/30 text-[#1e3a8a]',
    success: 'bg-[#16a34a]/10 border-[#16a34a]/30 text-[#14532d]',
    warning: 'bg-[#d97706]/10 border-[#d97706]/30 text-[#78350f]',
    danger: 'bg-[#dc2626]/10 border-[#dc2626]/30 text-[#7f1d1d]',
  };

  dismiss(): void {
    this.isVisible = false;
    this.closed.emit();
  }
}
