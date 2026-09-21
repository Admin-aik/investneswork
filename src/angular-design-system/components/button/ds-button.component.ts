import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsButtonVariant =
  | 'primary'
  | 'accent'
  | 'contrast'
  | 'dark'
  | 'outline'
  | 'outline-accent'
  | 'ghost'
  | 'danger'
  | 'success';

export type DsButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type"
      [disabled]="disabled || isLoading"
      (click)="onClick($event)"
      [ngClass]="[
        'inline-flex items-center justify-center font-sans transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        fullWidth ? 'w-full' : '',
        sizeClasses[size],
        variantClasses[variant]
      ]"
    >
      <span *ngIf="isLoading" class="animate-spin shrink-0 mr-2">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </span>
      <ng-content select="[slot=icon-left]"></ng-content>
      <span class="whitespace-nowrap"><ng-content></ng-content></span>
      <ng-content select="[slot=icon-right]"></ng-content>
    </button>
  `,
})
export class DsButtonComponent {
  @Input() variant: DsButtonVariant = 'primary';
  @Input() size: DsButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  @Output() clicked = new EventEmitter<MouseEvent>();

  readonly sizeClasses: Record<DsButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5',
    md: 'px-4 py-2 text-xs sm:text-sm font-bold rounded-xl gap-2',
    lg: 'px-6 py-3 text-sm sm:text-base font-extrabold rounded-2xl gap-2.5',
  };

  readonly variantClasses: Record<DsButtonVariant, string> = {
    primary: 'bg-[#084c61] text-white border border-[#084c61] shadow-sm hover:bg-[#0f2a43] hover:border-[#0f2a43] hover:shadow-[0_4px_12px_rgba(8,76,97,0.25)] active:scale-[0.98]',
    accent: 'bg-[#c9a050] text-[#0f2a43] border border-[#c9a050] shadow-sm hover:bg-[#d8b05e] hover:shadow-[0_0_16px_rgba(201,160,80,0.4)] active:scale-[0.98]',
    contrast: 'bg-[#38563c] text-white border border-[#38563c] shadow-sm hover:bg-[#2c4430] active:scale-[0.98]',
    dark: 'bg-[#0f2a43] text-white border border-[#0f2a43] shadow-md hover:bg-[#084c61] active:scale-[0.98]',
    outline: 'bg-transparent text-[#084c61] border-2 border-[#084c61] hover:bg-[#084c61]/10 active:scale-[0.98]',
    'outline-accent': 'bg-transparent text-[#c9a050] border-2 border-[#c9a050] hover:bg-[#c9a050]/10 active:scale-[0.98]',
    ghost: 'bg-transparent text-[#0f2a43] hover:bg-[#084c61]/10 active:scale-[0.98]',
    danger: 'bg-[#dc2626] text-white border border-[#dc2626] shadow-sm hover:bg-[#b91c1c] active:scale-[0.98]',
    success: 'bg-[#16a34a] text-white border border-[#16a34a] shadow-sm hover:bg-[#15803d] active:scale-[0.98]',
  };

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.isLoading) {
      this.clicked.emit(event);
    }
  }
}
