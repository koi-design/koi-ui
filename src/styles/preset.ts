import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

/**
 * koi-ui Tailwind preset.
 *
 * Consumers add this to their tailwind.config and include koi-ui's source in
 * `content` so the utility classes are generated:
 *
 *   import koiPreset from 'koi-ui/preset'
 *   export default {
 *     presets: [koiPreset],
 *     content: ['./src/**\/*.{ts,tsx}', './node_modules/koi-ui/dist/**\/*.js'],
 *   }
 *
 * Color tokens resolve to CSS variables defined in `koi-ui/styles.css`
 * (light + dark). Override the variables to retheme.
 */
const preset: Omit<Config, 'content'> = {
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--koi-border) / <alpha-value>)',
        input: 'hsl(var(--koi-input) / <alpha-value>)',
        ring: 'hsl(var(--koi-ring) / <alpha-value>)',
        background: 'hsl(var(--koi-background) / <alpha-value>)',
        foreground: 'hsl(var(--koi-foreground) / <alpha-value>)',
        surface: 'hsl(var(--koi-surface) / <alpha-value>)',
        muted: {
          DEFAULT: 'hsl(var(--koi-muted) / <alpha-value>)',
          foreground: 'hsl(var(--koi-muted-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--koi-primary) / <alpha-value>)',
          foreground: 'hsl(var(--koi-primary-foreground) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'hsl(var(--koi-success) / <alpha-value>)',
          foreground: 'hsl(var(--koi-success-foreground) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'hsl(var(--koi-info) / <alpha-value>)',
          foreground: 'hsl(var(--koi-info-foreground) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--koi-warning) / <alpha-value>)',
          foreground: 'hsl(var(--koi-warning-foreground) / <alpha-value>)',
        },
        danger: {
          DEFAULT: 'hsl(var(--koi-danger) / <alpha-value>)',
          foreground: 'hsl(var(--koi-danger-foreground) / <alpha-value>)',
        },
        help: {
          DEFAULT: 'hsl(var(--koi-help) / <alpha-value>)',
          foreground: 'hsl(var(--koi-help-foreground) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--koi-radius)',
        md: 'calc(var(--koi-radius) - 2px)',
        sm: 'calc(var(--koi-radius) - 4px)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
}

export default preset
