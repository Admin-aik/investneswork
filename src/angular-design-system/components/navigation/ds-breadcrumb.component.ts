import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DsBreadcrumbItem {
  label: string;
  url?: string;
  active?: boolean;
}

@Component({
  selector: 'ds-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="flex items-center text-xs sm:text-sm text-[#6b7280] font-medium" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 sm:space-x-2">
        <li *ngFor="let item of items; let last = last" class="inline-flex items-center">
          <div class="flex items-center">
            <span *ngIf="!item.active" (click)="onItemClick(item)" class="hover:text-[#084c61] transition-colors cursor-pointer">
              {{ item.label }}
            </span>
            <span *ngIf="item.active" class="text-[#0f2a43] font-bold" aria-current="page">
              {{ item.label }}
            </span>
            <span *ngIf="!last" class="mx-2 text-[#9ca3af]">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </div>
        </li>
      </ol>
    </nav>
  `,
})
export class DsBreadcrumbComponent {
  @Input() items: DsBreadcrumbItem[] = [];
  @Output() navigate = new EventEmitter<DsBreadcrumbItem>();

  onItemClick(item: DsBreadcrumbItem): void {
    if (!item.active) {
      this.navigate.emit(item);
    }
  }
}
