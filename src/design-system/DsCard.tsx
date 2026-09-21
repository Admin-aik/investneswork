import React, { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface DsCardProps {
  variant?: "default" | "elevated" | "flat" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export const DsCard: React.FC<DsCardProps> = ({
  variant = "default",
  padding = "md",
  className = "",
  children,
  onClick,
}) => {
  const paddingClasses = {
    none: "p-0",
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-6",
    lg: "p-6 sm:p-8",
  }[padding];

  const variantClasses = {
    default: "bg-[var(--ds-surface-body)] border border-[var(--ds-border-default)] shadow-sm",
    elevated: "bg-[var(--ds-surface-body)] border border-[var(--ds-border-default)] shadow-[0_10px_30px_rgba(8,76,97,0.1)]",
    flat: "bg-[var(--ds-surface-muted)] border border-[var(--ds-border-default)]",
    interactive: "bg-[var(--ds-surface-body)] border border-[var(--ds-border-default)] shadow-sm hover:shadow-[0_10px_25px_rgba(8,76,97,0.15)] hover:border-[#c9a050] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer",
  }[variant];

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl ${paddingClasses} ${variantClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export interface DsKpiCardProps {
  label: string;
  value: string | number;
  change?: string | number;
  changePeriod?: string;
  trend?: "up" | "down" | "neutral";
  icon?: ReactNode;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
}

export const DsKpiCard: React.FC<DsKpiCardProps> = ({
  label,
  value,
  change,
  changePeriod = "vs prev.",
  trend = "up",
  icon,
  subtitle,
  className = "",
  onClick,
}) => {
  return (
    <DsCard
      variant={onClick ? "interactive" : "default"}
      padding="md"
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
    >
      {/* Top row: Label + Icon */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#38563c]">
          {label}
        </span>
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-[#084c61]/10 text-[#084c61] flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
      </div>

      {/* Metric value */}
      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0f2a43] tracking-tight mb-2">
        {value}
      </div>

      {/* Bottom trend & subtitle */}
      {(change !== undefined || subtitle) && (
        <div className="flex items-center justify-between text-xs pt-1 border-t border-[var(--ds-border-default)]/60">
          {change !== undefined && (
            <div className="flex items-center gap-1 font-semibold">
              {trend === "up" && <TrendingUp className="w-3.5 h-3.5 text-[#16a34a]" />}
              {trend === "down" && <TrendingDown className="w-3.5 h-3.5 text-[#dc2626]" />}
              {trend === "neutral" && <Minus className="w-3.5 h-3.5 text-[#6b7280]" />}
              <span
                className={
                  trend === "up"
                    ? "text-[#16a34a]"
                    : trend === "down"
                    ? "text-[#dc2626]"
                    : "text-[#6b7280]"
                }
              >
                {typeof change === "number" && change > 0 ? `+${change}%` : `${change}`}
              </span>
              <span className="text-[#6b7280] text-[11px] ml-1">{changePeriod}</span>
            </div>
          )}
          {subtitle && (
            <span className="text-[11px] text-[#6b7280] truncate">{subtitle}</span>
          )}
        </div>
      )}
    </DsCard>
  );
};
