/**
 * InvesNetwork Design System — Angular Design Tokens & Injection Tokens
 */

export const INVES_TOKENS = {
  colors: {
    brand: {
      primary: '#084c61', // Petroleum Teal
      accent: '#c9a050',  // Champagne Gold
      contrast: '#38563c',// Deep Forest Green
      secondary: '#38563c',
      dark: '#0f2a43',    // Deep Navy
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
    state: {
      danger: '#dc2626',
      success: '#16a34a',
      warning: '#d97706',
      info: '#2563eb',
      locked: '#8b5cf6',
      awaiting: '#38bdf8',
      blocked: '#ec4899',
      offline: '#64748b',
    },
    surface: {
      bodyLight: '#FAF7F2',
      bodyDark: '#071725',
      mutedLight: '#F3ECE0',
      mutedDark: '#0d243a',
      borderLight: '#E2D7C3',
      borderDark: '#173854',
    }
  },
  typography: {
    fontFamily: '"Montserrat", system-ui, -apple-system, sans-serif',
  }
} as const;

export type InvesThemeTokens = typeof INVES_TOKENS;
