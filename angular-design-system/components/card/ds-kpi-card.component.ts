import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsCardComponent } from './ds-card.component';

@Component({
  selector: 'ds-kpi-card',
  standalone: true,
  imports: [CommonModule, DsCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ds-card
      [variant]="interactive ? 'interactive' : 'default'"
      padding="md"
      class="relative overflow-hidden block"
      (clicked)="clicked.emit($event)"
    >
      <!-- Top row: Label + Icon -->
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="text-xs font-bold uppercase tracking-wider text-[#38563c]">
          {{ label }}
        </span>
        <div class="w-8 h-8 rounded-lg bg-[#084c61]/10 text-[#084c61] flex items-center justify-center shrink-0">
          <ng-content select="[slot=icon]"></ng-content>
        </div>
      </div>

      <!-- Metric value -->
      <div class="text-2xl sm:text-3xl font-extrabold font-mono text-[#0f2a43] tracking-tight mb-2">
        {{ value }}
      </div>

      <!-- Bottom trend & subtitle -->
      <div
        *ngIf="change !== undefined || subtitle"
        class="flex items-center justify-between text-xs pt-1 border-t border-[var(--ds-border-default)]/60"
      >
        <div *ngIf="change !== undefined" class="flex items-center gap-1 font-semibold">
          <span
            [ngClass]="{
              'text-[#16a34a]': trend === 'up',
              'text-[#dc2626]': trend === 'down',
              'text-[#6b7280]': trend === 'neutral'
            }"
          >
            {{ change }}
          </span>
          <span class="text-[#6b7280] text-[11px] ml-1">{{ changePeriod }}</span>
        </div>
        <span *ngIf="subtitle" class="text-[11px] text-[#6b7280] truncate">
          {{ subtitle }}
        </span>
      </div>
    </ds-card>
  `,
})
export class DsKpiCardComponent {
  @Input() label: string = '';
  @Input() value: string | number = '';
  @Input() change?: string | number;
  @Input() changePeriod: string = 'vs prev.';
  @Input() trend: 'up' | 'down' | 'neutral' = 'up';
  @Input() subtitle?: string;
  @Input() interactive: boolean = false;
  @Output() clicked = new EventEmitter<MouseEvent>();
}
