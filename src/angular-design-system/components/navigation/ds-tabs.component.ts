import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DsTabItem {
  id: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export type DsTabsVariant = 'pill' | 'underline';

@Component({
  selector: 'ds-tabs',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [ngClass]="[
        variant === 'pill'
          ? 'inline-flex p-1 bg-[var(--ds-surface-muted)] rounded-2xl gap-1 border border-[var(--ds-border-default)]'
          : 'flex border-b border-[var(--ds-border-default)] gap-4 sm:gap-6'
      ]"
      role="tablist"
    >
      <button
        *ngFor="let tab of tabs"
        type="button"
        role="tab"
        [disabled]="tab.disabled"
        [attr.aria-selected]="activeTab === tab.id"
        (click)="selectTab(tab.id)"
        [ngClass]="[
          'inline-flex items-center gap-2 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed',
          variant === 'pill'
            ? activeTab === tab.id
              ? 'bg-[#084c61] text-white px-4 py-2 rounded-xl shadow-sm'
              : 'text-[#6b7280] hover:text-[#0f2a43] px-4 py-2 rounded-xl hover:bg-black/5'
            : activeTab === tab.id
              ? 'text-[#084c61] border-b-2 border-[#084c61] pb-3 -mb-[1px]'
              : 'text-[#6b7280] hover:text-[#0f2a43] pb-3 border-b-2 border-transparent'
        ]"
      >
        <span>{{ tab.label }}</span>
        <span
          *ngIf="tab.count !== undefined"
          [ngClass]="[
            'text-[10px] px-1.5 py-0.5 rounded-full font-bold',
            variant === 'pill' && activeTab === tab.id
              ? 'bg-white/20 text-white'
              : 'bg-[var(--ds-surface-muted)] text-[#6b7280] border border-[var(--ds-border-default)]'
          ]"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>
  `,
})
export class DsTabsComponent {
  @Input() tabs: DsTabItem[] = [];
  @Input() activeTab: string = '';
  @Input() variant: DsTabsVariant = 'pill';
  @Output() tabChange = new EventEmitter<string>();

  selectTab(tabId: string): void {
    if (this.activeTab !== tabId) {
      this.activeTab = tabId;
      this.tabChange.emit(tabId);
    }
  }
}
