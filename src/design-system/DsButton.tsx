import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

export type DsButtonVariant =
  | "primary"
  | "accent"
  | "contrast"
  | "dark"
  | "outline"
  | "outline-accent"
  | "ghost"
  | "danger"
  | "success";

export type DsButtonSize = "sm" | "md" | "lg";

export interface DsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: DsButtonVariant;
  size?: DsButtonSize;
  isLoading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

export const DsButton: React.FC<DsButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled,
  className = "",
  children,
  ...props
}) => {
  const sizeClasses: Record<DsButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5",
    md: "px-4 py-2 text-xs sm:text-sm font-bold rounded-xl gap-2",
    lg: "px-6 py-3 text-sm sm:text-base font-extrabold rounded-2xl gap-2.5",
  };

  const variantClasses: Record<DsButtonVariant, string> = {
    primary:
      "bg-[#084c61] text-white border border-[#084c61] shadow-sm hover:bg-[#0f2a43] hover:border-[#0f2a43] hover:shadow-[0_4px_12px_rgba(8,76,97,0.25)] active:scale-[0.98]",
    accent:
      "bg-[#c9a050] text-[#0f2a43] border border-[#c9a050] shadow-sm hover:bg-[#d8b05e] hover:shadow-[0_0_16px_rgba(201,160,80,0.4)] active:scale-[0.98]",
    contrast:
      "bg-[#38563c] text-white border border-[#38563c] shadow-sm hover:bg-[#2c4430] hover:shadow-[0_4px_12px_rgba(56,86,60,0.25)] active:scale-[0.98]",
    dark:
      "bg-[#0f2a43] text-white border border-[#0f2a43] shadow-md hover:bg-[#084c61] hover:border-[#084c61] active:scale-[0.98]",
    outline:
      "bg-transparent text-[#084c61] border-2 border-[#084c61] hover:bg-[#084c61]/10 active:scale-[0.98]",
    "outline-accent":
      "bg-transparent text-[#c9a050] border-2 border-[#c9a050] hover:bg-[#c9a050]/10 active:scale-[0.98]",
    ghost:
      "bg-transparent text-[#0f2a43] hover:bg-[#084c61]/10 active:scale-[0.98]",
    danger:
      "bg-[#dc2626] text-white border border-[#dc2626] shadow-sm hover:bg-[#b91c1c] active:scale-[0.98]",
    success:
      "bg-[#16a34a] text-white border border-[#16a34a] shadow-sm hover:bg-[#15803d] active:scale-[0.98]",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-sans transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${
        fullWidth ? "w-full" : ""
      } ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        iconLeft && <span className="shrink-0">{iconLeft}</span>
      )}
      <span className="whitespace-nowrap">{children}</span>
      {!isLoading && iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
};
