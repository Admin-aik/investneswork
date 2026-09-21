import React, { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

export interface DsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const DsModal: React.FC<DsModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  size = "md",
  children,
  footer,
  className = "",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }[size];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f2a43]/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`w-full ${sizeClasses} bg-[var(--ds-surface-body)] border border-[var(--ds-border-default)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--ds-border-default)] bg-[var(--ds-surface-muted)]/50">
            <div>
              {title && (
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#0f2a43] leading-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-[#6b7280] mt-0.5">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6b7280] hover:text-[#0f2a43] hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-3.5 border-t border-[var(--ds-border-default)] bg-[var(--ds-surface-muted)]/30 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
