import React, { ReactNode } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

/* ═══ TABS ═══ */
export interface DsTabItem {
  id: string;
  label: string;
  count?: number;
  icon?: ReactNode;
}

export interface DsTabsProps {
  tabs: DsTabItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: "underline" | "pills";
  className?: string;
}

export const DsTabs: React.FC<DsTabsProps> = ({
  tabs,
  activeId,
  onChange,
  variant = "pills",
  className = "",
}) => {
  if (variant === "underline") {
    return (
      <div className={`flex border-b border-[var(--ds-border-default)] space-x-6 overflow-x-auto ${className}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`pb-3 pt-1 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-[#084c61] text-[#084c61]"
                  : "border-transparent text-[#6b7280] hover:text-[#0f2a43] hover:border-[#6b7280]/40"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? "bg-[#084c61]/15 text-[#084c61]"
                      : "bg-[#6b7280]/15 text-[#6b7280]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`inline-flex bg-[var(--ds-surface-muted)] p-1 rounded-xl border border-[var(--ds-border-default)] gap-1 overflow-x-auto ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              isActive
                ? "bg-[#084c61] text-[#c9a050] shadow-sm"
                : "text-[#0f2a43] hover:text-[#084c61] hover:bg-black/5"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive
                    ? "bg-[#c9a050] text-[#084c61]"
                    : "bg-black/10 text-current"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

/* ═══ BREADCRUMB ═══ */
export interface DsBreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface DsBreadcrumbProps {
  items: DsBreadcrumbItem[];
  className?: string;
}

export const DsBreadcrumb: React.FC<DsBreadcrumbProps> = ({ items, className = "" }) => {
  return (
    <nav className={`flex items-center space-x-1.5 text-xs text-[#6b7280] font-medium ${className}`} aria-label="Breadcrumb">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#9ca3af] shrink-0" />}
            {isLast ? (
              <span className="font-bold text-[#084c61] truncate">{item.label}</span>
            ) : item.onClick ? (
              <button
                onClick={item.onClick}
                className="hover:text-[#084c61] transition-colors cursor-pointer truncate"
              >
                {item.label}
              </button>
            ) : (
              <span className="hover:text-[#084c61] transition-colors truncate">{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

/* ═══ PAGINATION ═══ */
export interface DsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const DsPagination: React.FC<DsPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`flex items-center justify-between gap-4 text-xs font-semibold ${className}`}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-surface-body)] text-[#0f2a43] hover:bg-[var(--ds-surface-muted)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? "bg-[#084c61] text-[#c9a050] shadow-sm"
                  : "text-[#0f2a43] hover:bg-[var(--ds-surface-muted)]"
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--ds-border-default)] bg-[var(--ds-surface-body)] text-[#0f2a43] hover:bg-[var(--ds-surface-muted)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
