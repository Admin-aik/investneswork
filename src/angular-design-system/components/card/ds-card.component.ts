import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsCardVariant = 'default' | 'elevated' | 'flat' | 'interactive';
export type DsCardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      (click)="onClick($event)"
      [ngClass]="[
        'rounded-2xl',
        paddingClasses[padding],
        variantClasses[variant]
      ]"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class DsCardComponent {
  @Input() variant: DsCardVariant = 'default';
  @Input() padding: DsCardPadding = 'md';
  @Output() clicked = new EventEmitter<MouseEvent>();

  readonly paddingClasses: Record<DsCardPadding, string> = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  readonly variantClasses: Record<DsCardVariant, string> = {
    default: 'bg-[var(--ds-surface-body)] border border-[var(--ds-border-default)] shadow-sm',
    elevated: 'bg-[var(--ds-surface-body)] border border-[var(--ds-border-default)] shadow-[0_10px_30px_rgba(8,76,97,0.1)]',
    flat: 'bg-[var(--ds-surface-muted)] border border-[var(--ds-border-default)]',
    interactive: 'bg-[var(--ds-surface-body)] border border-[var(--ds-border-default)] shadow-sm hover:shadow-[0_10px_25px_rgba(8,76,97,0.15)] hover:border-[#c9a050] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer',
  };

  onClick(event: MouseEvent): void {
    if (this.variant === 'interactive') {
      this.clicked.emit(event);
    }
  }
}
