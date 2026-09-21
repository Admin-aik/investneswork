import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-pagination',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="flex items-center justify-between gap-4 select-none" aria-label="Pagination">
      <button
        type="button"
        [disabled]="currentPage <= 1"
        (click)="changePage(currentPage - 1)"
        class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#0f2a43] bg-[var(--ds-surface-body)] border border-[var(--ds-border-default)] rounded-xl hover:bg-black/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <span>Anterior</span>
      </button>

      <div class="flex items-center gap-1">
        <button
          *ngFor="let page of pages"
          type="button"
          (click)="changePage(page)"
          [ngClass]="[
            'w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer',
            currentPage === page
              ? 'bg-[#084c61] text-white shadow-sm'
              : 'text-[#6b7280] hover:text-[#0f2a43] hover:bg-black/5'
          ]"
        >
          {{ page }}
        </button>
      </div>

      <button
        type="button"
        [disabled]="currentPage >= totalPages"
        (click)="changePage(currentPage + 1)"
        class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#0f2a43] bg-[var(--ds-surface-body)] border border-[var(--ds-border-default)] rounded-xl hover:bg-black/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <span>Siguiente</span>
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </nav>
  `,
})
export class DsPaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  pages: number[] = [];

  ngOnChanges(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }
}
