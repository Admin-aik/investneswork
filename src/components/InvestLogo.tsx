import React from "react";

interface InvestLogoProps {
  variant?: "mark" | "full" | "horizontal";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  theme?: "dark" | "light" | "cream";
}

/**
 * Invest Network Official Logo
 * Accurately vectorized from the user's brand emblem (inves.png):
 * - Deep Petroleum Teal (#0B424C) for the bold geometric "I" and "N"
 * - Champagne Metallic Gold (#C5A059 / #DFC07C / #B88E3E) for the circuit traces & 5 circular node pads
 */
export const InvestLogo: React.FC<InvestLogoProps> = ({
  variant = "full",
  size = "md",
  className = "",
  theme = "cream",
}) => {
  // Dimension mappings
  const markDimensions = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  }[size];

  const textColor = theme === "dark" ? "text-white" : "text-[#084c61]";
  const subtextColor = theme === "dark" ? "text-[#c9a050]" : "text-[#38563c]";

  const IconSVG = (
    <svg
      viewBox="0 0 200 160"
      className="w-full h-full object-contain"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Invest Network Isotype"
    >
      <defs>
        {/* Luxury Gold Linear Gradient for circuit traces and nodes */}
        <linearGradient id="invesGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e5c882" />
          <stop offset="50%" stopColor="#c9a050" />
          <stop offset="100%" stopColor="#a37d32" />
        </linearGradient>

        {/* Petroleum Teal Gradient */}
        <linearGradient id="invesTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#084c61" />
          <stop offset="100%" stopColor="#0f2a43" />
        </linearGradient>
      </defs>

      {/* LETTER 'I' (Left vertical pillar) */}
      <rect x="18" y="24" width="24" height="112" rx="1.5" fill="url(#invesTealGrad)" />

      {/* LETTER 'N' LEFT PILLAR */}
      <rect x="48" y="24" width="24" height="112" rx="1.5" fill="url(#invesTealGrad)" />

      {/* LETTER 'N' RIGHT PILLAR */}
      <rect x="124" y="24" width="24" height="112" rx="1.5" fill="url(#invesTealGrad)" />

      {/* LETTER 'N' DIAGONAL STROKE */}
      <polygon
        points="48,24 72,24 148,136 124,136"
        fill="url(#invesTealGrad)"
      />

      {/* CIRCUIT TRACES & NODES (Coming from N) */}
      {/* 1. TOP NODE: line rising from center-top of N */}
      <path
        d="M 94 62 L 94 22 A 6 6 0 0 1 100 16 L 100 16"
        stroke="url(#invesGoldGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Node 1 ring */}
      <circle cx="100" cy="16" r="11" fill="none" stroke="url(#invesGoldGrad)" strokeWidth="6" />

      {/* 2. BOTTOM NODE: line dropping from center-bottom of N */}
      <path
        d="M 102 98 L 102 138 A 6 6 0 0 0 96 144 L 96 144"
        stroke="url(#invesGoldGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Node 2 ring */}
      <circle cx="96" cy="144" r="11" fill="none" stroke="url(#invesGoldGrad)" strokeWidth="6" />

      {/* 3. UPPER RIGHT NODE: horizontal from diagonal of N, stepping right and up */}
      <path
        d="M 102 62 L 152 62 A 6 6 0 0 0 158 56 L 158 52"
        stroke="url(#invesGoldGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Node 3 ring */}
      <circle cx="164" cy="46" r="11" fill="none" stroke="url(#invesGoldGrad)" strokeWidth="6" />

      {/* 4. CENTER-RIGHT NODE: horizontal line straight out from right leg */}
      <path
        d="M 148 80 L 176 80"
        stroke="url(#invesGoldGrad)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Node 4 ring */}
      <circle cx="188" cy="80" r="12" fill="none" stroke="url(#invesGoldGrad)" strokeWidth="6" />

      {/* 5. LOWER-RIGHT NODE: line from right leg stepping down */}
      <path
        d="M 148 108 L 154 108 A 6 6 0 0 1 160 114 L 160 118"
        stroke="url(#invesGoldGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Node 5 ring */}
      <circle cx="164" cy="124" r="11" fill="none" stroke="url(#invesGoldGrad)" strokeWidth="6" />
    </svg>
  );

  if (variant === "mark") {
    return (
      <div
        className={`relative flex items-center justify-center p-1 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/50 shadow-sm transition-all duration-200 hover:shadow-md ${markDimensions} ${className}`}
      >
        {IconSVG}
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 cursor-pointer select-none group ${className}`}>
      {/* Icon Emblem Container with Cream/Gold Framing */}
      <div
        className={`flex items-center justify-center rounded-xl bg-[var(--ds-surface-body)] border-2 border-[var(--ds-color-brand-accent)] p-1.5 shadow-[0_2px_10px_rgba(201,160,80,0.25)] transition-all duration-300 group-hover:scale-105 ${markDimensions}`}
      >
        {IconSVG}
      </div>

      {/* Brand Typographic Identity */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center space-x-2">
          <span
            className={`font-display text-lg sm:text-xl font-extrabold tracking-tight transition-colors ${textColor} group-hover:text-[var(--ds-color-brand-accent)]`}
          >
            INVEST NETWORK
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-extrabold tracking-wider uppercase bg-[var(--ds-color-brand-accent)]/20 text-[var(--ds-color-brand-contrast)] border border-[var(--ds-color-brand-accent)]/50">
            PROPTECH
          </span>
        </div>
        <span className={`text-[10px] font-semibold tracking-wider uppercase mt-0.5 ${subtextColor}`}>
          REMODELACIÓN & REAL ESTATE EE. UU.
        </span>
      </div>
    </div>
  );
};
