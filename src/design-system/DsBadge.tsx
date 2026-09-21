import React, { ReactNode } from "react";

export type DsBadgeVariant =
  | "primary"
  | "accent"
  | "contrast"
  | "dark"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral"
  | "locked"
  | "awaiting"
  | "blocked"
  | "offline";

export type DsBadgeFormat = "subtle" | "solid" | "outline";
export type DsBadgeSize = "sm" | "md";

export interface DsBadgeProps {
  variant?: DsBadgeVariant;
  format?: DsBadgeFormat;
  size?: DsBadgeSize;
  dot?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const DsBadge: React.FC<DsBadgeProps> = ({
  variant = "primary",
  format = "subtle",
  size = "md",
  dot = false,
  icon,
  children,
  className = "",
}) => {
  const sizeClasses: Record<DsBadgeSize, string> = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
  };

  const dotColors: Record<DsBadgeVariant, string> = {
    primary: "bg-[#084c61]",
    accent: "bg-[#c9a050]",
    contrast: "bg-[#38563c]",
    dark: "bg-[#0f2a43]",
    success: "bg-[#16a34a]",
    danger: "bg-[#dc2626]",
    warning: "bg-[#d97706]",
    info: "bg-[#2563eb]",
    neutral: "bg-[#6b7280]",
    locked: "bg-[#8b5cf6]",
    awaiting: "bg-[#38bdf8]",
    blocked: "bg-[#ec4899]",
    offline: "bg-[#64748b]",
  };

  const formatVariantClasses: Record<DsBadgeFormat, Record<DsBadgeVariant, string>> = {
    subtle: {
      primary: "bg-[#084c61]/15 text-[#084c61] border border-[#084c61]/30",
      accent: "bg-[#c9a050]/20 text-[#8c6d2b] border border-[#c9a050]/40",
      contrast: "bg-[#38563c]/15 text-[#38563c] border border-[#38563c]/30",
      dark: "bg-[#0f2a43]/15 text-[#0f2a43] border border-[#0f2a43]/30",
      success: "bg-[#16a34a]/15 text-[#15803d] border border-[#16a34a]/30",
      danger: "bg-[#dc2626]/15 text-[#b91c1c] border border-[#dc2626]/30",
      warning: "bg-[#d97706]/15 text-[#b45309] border border-[#d97706]/30",
      info: "bg-[#2563eb]/15 text-[#1d4ed8] border border-[#2563eb]/30",
      neutral: "bg-[#6b7280]/15 text-[#374151] border border-[#6b7280]/30",
      locked: "bg-[#8b5cf6]/15 text-[#6d28d9] border border-[#8b5cf6]/30",
      awaiting: "bg-[#38bdf8]/15 text-[#0369a1] border border-[#38bdf8]/30",
      blocked: "bg-[#ec4899]/15 text-[#be185d] border border-[#ec4899]/30",
      offline: "bg-[#64748b]/15 text-[#334155] border border-[#64748b]/30",
    },
    solid: {
      primary: "bg-[#084c61] text-white",
      accent: "bg-[#c9a050] text-[#0f2a43] font-black",
      contrast: "bg-[#38563c] text-white",
      dark: "bg-[#0f2a43] text-white",
      success: "bg-[#16a34a] text-white",
      danger: "bg-[#dc2626] text-white",
      warning: "bg-[#d97706] text-white",
      info: "bg-[#2563eb] text-white",
      neutral: "bg-[#6b7280] text-white",
      locked: "bg-[#8b5cf6] text-white",
      awaiting: "bg-[#38bdf8] text-[#0f2a43]",
      blocked: "bg-[#ec4899] text-white",
      offline: "bg-[#64748b] text-white",
    },
    outline: {
      primary: "bg-transparent text-[#084c61] border border-[#084c61]",
      accent: "bg-transparent text-[#c9a050] border border-[#c9a050]",
      contrast: "bg-transparent text-[#38563c] border border-[#38563c]",
      dark: "bg-transparent text-[#0f2a43] border border-[#0f2a43]",
      success: "bg-transparent text-[#16a34a] border border-[#16a34a]",
      danger: "bg-transparent text-[#dc2626] border border-[#dc2626]",
      warning: "bg-transparent text-[#d97706] border border-[#d97706]",
      info: "bg-transparent text-[#2563eb] border border-[#2563eb]",
      neutral: "bg-transparent text-[#6b7280] border border-[#6b7280]",
      locked: "bg-transparent text-[#8b5cf6] border border-[#8b5cf6]",
      awaiting: "bg-transparent text-[#38bdf8] border border-[#38bdf8]",
      blocked: "bg-transparent text-[#ec4899] border border-[#ec4899]",
      offline: "bg-transparent text-[#64748b] border border-[#64748b]",
    },
  };

  return (
    <span
      className={`inline-flex items-center font-bold tracking-wider rounded-full uppercase leading-none ${
        sizeClasses[size]
      } ${formatVariantClasses[format][variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            format === "solid" ? "bg-white" : dotColors[variant]
          }`}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );
};
