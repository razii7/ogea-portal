// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Shared animation configurations
export const fadeInUpVariant = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
}

export const fadeInScaleVariant = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.4 }
}

export const heroVariant = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

// Common transition settings
export const easeOutTransition = {
  duration: 0.6,
  ease: "easeOut"
}

// Stat configuration
export const STAT_CONFIG = {
  DURATION: 1.5,
  DELAY_MULTIPLIER: 0.1
}

// Color mappings for components
export const colorMap = {
  blue: { bg: 'bg-slate-600', light: 'bg-slate-50', text: 'text-slate-600', ring: 'ring-slate-100' },
  indigo: { bg: 'bg-amber-600', light: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-100' },
  amber: { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-100' },
  emerald: { bg: 'bg-emerald-600', light: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-100' },
  red: { bg: 'bg-red-500', light: 'bg-red-50', text: 'text-red-600', ring: 'ring-red-100' },
  green: { bg: 'bg-green-500', light: 'bg-green-50', text: 'text-green-600', ring: 'ring-green-100' },
}

// Page section padding
export const sectionPadding = 'py-10 px-4 md:px-8 lg:px-16'

// External links
export const EXTERNAL_LINKS = {
  GOOGLE_DRIVE: 'https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk',
  WEBSITE: 'https://chsoutreach.live',
  EMAIL: 'mailto:niicsoutreachboard@gmail.com',
}

