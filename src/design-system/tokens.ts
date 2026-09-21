/**
 * InvesNetwork Design System — Core Design Tokens & Palette
 * Single Source of Truth
 */

export const InvesTokens = {
  colors: {
    brand: {
      primary: "#084c61", // Petroleum Teal
      accent: "#c9a050", // Champagne Gold
      contrast: "#38563c", // Deep Forest Green
      secondary: "#38563c",
      dark: "#0f2a43", // Deep Navy
    },
    neutral: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
      950: "#030712",
    },
    state: {
      danger: "#dc2626",
      success: "#16a34a",
      warning: "#d97706",
      info: "#2563eb",
      locked: "#8b5cf6",
      awaiting: "#38bdf8",
      blocked: "#ec4899",
      offline: "#64748b",
    },
    surface: {
      bodyLight: "#FAF7F2",
      bodyDark: "#071725",
      mutedLight: "#F3ECE0",
      mutedDark: "#0d243a",
      borderLight: "#E2D7C3",
      borderDark: "#173854",
    },
  },
  typography: {
    fontSans: '"Montserrat", system-ui, -apple-system, sans-serif',
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
  shadows: {
    brandSm: "0 1px 2px rgba(8, 76, 97, 0.12)",
    brandMd: "0 4px 12px rgba(8, 76, 97, 0.18)",
    brandLg: "0 10px 30px rgba(8, 76, 97, 0.24)",
    brandGlow: "0 0 16px rgba(201, 160, 80, 0.4)",
  },
  gradients: {
    primaryToAccent: "linear-gradient(135deg, #084c61 0%, #c9a050 100%)",
    primaryToDark: "linear-gradient(135deg, #084c61 0%, #0f2a43 100%)",
    darkToAccent: "linear-gradient(135deg, #0f2a43 0%, #c9a050 100%)",
  },
} as const;
