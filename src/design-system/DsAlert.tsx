import React, { ReactNode } from "react";
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from "lucide-react";

export type DsAlertVariant = "info" | "success" | "warning" | "danger";

export interface DsAlertProps {
  variant?: DsAlertVariant;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

export const DsAlert: React.FC<DsAlertProps> = ({
  variant = "info",
  title,
  children,
  onClose,
  className = "",
}) => {
  const iconMap: Record<DsAlertVariant, ReactNode> = {
    info: <Info className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />,
    danger: <AlertCircle className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />,
  };

  const styleMap: Record<DsAlertVariant, string> = {
    info: "bg-[#2563eb]/10 border-[#2563eb]/30 text-[#1e3a8a]",
    success: "bg-[#16a34a]/10 border-[#16a34a]/30 text-[#14532d]",
    warning: "bg-[#d97706]/10 border-[#d97706]/30 text-[#78350f]",
    danger: "bg-[#dc2626]/10 border-[#dc2626]/30 text-[#7f1d1d]",
  };

  return (
    <div
      className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${styleMap[variant]} ${className}`}
      role="alert"
    >
      {iconMap[variant]}
      <div className="flex-1 text-xs sm:text-sm">
        {title && <p className="font-bold text-sm mb-1 leading-snug">{title}</p>}
        <div className="opacity-90 leading-relaxed">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-current opacity-60 hover:opacity-100 transition-opacity p-0.5 rounded-lg cursor-pointer"
          aria-label="Cerrar alerta"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
