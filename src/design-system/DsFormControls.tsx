import React, { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";

export interface DsInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const DsInput: React.FC<DsInputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = "",
  id,
  disabled,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`${fullWidth ? "w-full" : "inline-block"} space-y-1.5`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-bold uppercase tracking-wider text-[#38563c]"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-[#6b7280] pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          disabled={disabled}
          className={`w-full bg-[var(--ds-surface-body)] border rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#0f2a43] placeholder:text-[#9ca3af] transition-all duration-200 outline-none ${
            leftIcon ? "pl-10" : ""
          } ${rightIcon ? "pr-10" : ""} ${
            error
              ? "border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/20"
              : "border-[var(--ds-border-default)] focus:border-[#084c61] focus:ring-2 focus:ring-[#084c61]/15"
          } ${disabled ? "opacity-50 cursor-not-allowed bg-[var(--ds-surface-muted)]" : ""} ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 text-[#6b7280]">{rightIcon}</div>
        )}
      </div>
      {error && <p className="text-[11px] font-semibold text-[#dc2626]">{error}</p>}
      {!error && hint && <p className="text-[11px] text-[#6b7280]">{hint}</p>}
    </div>
  );
};

export interface DsSelectOption {
  value: string | number;
  label: string;
}

export interface DsSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: DsSelectOption[];
  fullWidth?: boolean;
}

export const DsSelect: React.FC<DsSelectProps> = ({
  label,
  error,
  hint,
  options,
  fullWidth = true,
  className = "",
  id,
  disabled,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`${fullWidth ? "w-full" : "inline-block"} space-y-1.5`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-bold uppercase tracking-wider text-[#38563c]"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        disabled={disabled}
        className={`w-full bg-[var(--ds-surface-body)] border rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#0f2a43] transition-all duration-200 outline-none cursor-pointer ${
          error
            ? "border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/20"
            : "border-[var(--ds-border-default)] focus:border-[#084c61] focus:ring-2 focus:ring-[#084c61]/15"
        } ${disabled ? "opacity-50 cursor-not-allowed bg-[var(--ds-surface-muted)]" : ""} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-[11px] font-semibold text-[#dc2626]">{error}</p>}
      {!error && hint && <p className="text-[11px] text-[#6b7280]">{hint}</p>}
    </div>
  );
};

export interface DsToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: "sm" | "md";
}

export const DsToggle: React.FC<DsToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
}) => {
  const isSm = size === "sm";

  return (
    <label className={`flex items-start gap-3 cursor-pointer select-none ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex shrink-0 rounded-full transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none ${
          isSm ? "h-4 w-7" : "h-6 w-11"
        } ${checked ? "bg-[#084c61]" : "bg-[var(--ds-border-default)]"}`}
      >
        <span
          className={`pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
            isSm
              ? `h-3 w-3 mt-0.5 ${checked ? "translate-x-3.5" : "translate-x-0.5"}`
              : `h-5 w-5 mt-0.5 ${checked ? "translate-x-5.5" : "translate-x-0.5"}`
          }`}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-xs sm:text-sm font-bold text-[#0f2a43] leading-snug">
              {label}
            </span>
          )}
          {description && (
            <span className="text-[11px] text-[#6b7280] leading-normal">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
};
