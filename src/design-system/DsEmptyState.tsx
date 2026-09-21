import React, { ReactNode } from "react";
import { FolderSearch } from "lucide-react";

export interface DsEmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const DsEmptyState: React.FC<DsEmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border-2 border-dashed border-[var(--ds-border-default)] bg-[var(--ds-surface-muted)]/40 ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-[#084c61]/10 text-[#084c61] flex items-center justify-center mb-4">
        {icon || <FolderSearch className="w-6 h-6" />}
      </div>
      <h4 className="text-base sm:text-lg font-bold text-[#0f2a43] tracking-tight">
        {title}
      </h4>
      {description && (
        <p className="text-xs sm:text-sm text-[#6b7280] max-w-sm mt-1.5 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};
