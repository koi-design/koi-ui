import * as React from 'react'
import { Toaster as SonnerToaster, toast } from 'sonner'

export interface ToasterProps extends React.ComponentProps<typeof SonnerToaster> {}

/**
 * Maps sonner's color CSS variables onto koi's design tokens, so the toast
 * surface and the per-type (success/error/warning/info) variants follow the
 * theme and flip automatically in dark mode.
 *
 * These are set inline on the toaster container — inline custom properties
 * inherit down to every toast and outrank both sonner's own stylesheet and
 * any Tailwind utility, so we don't have to fight CSS load order / specificity.
 * `richColors` is what enables sonner's per-type color rules in the first place.
 */
// Tinted backgrounds are mixed into the opaque surface color with color-mix so
// they stay fully opaque — using an alpha channel (e.g. `/ 0.12`) instead would
// let the page behind the toast show through.
const tint = (token: string, pct: number) =>
  `color-mix(in srgb, hsl(var(${token})) ${pct}%, hsl(var(--koi-background)))`

const tokenVars = {
  '--normal-bg': 'hsl(var(--koi-background))',
  '--normal-border': 'hsl(var(--koi-border))',
  '--normal-text': 'hsl(var(--koi-foreground))',
  '--success-bg': tint('--koi-success', 12),
  '--success-border': tint('--koi-success', 40),
  '--success-text': 'hsl(var(--koi-success))',
  '--error-bg': tint('--koi-danger', 12),
  '--error-border': tint('--koi-danger', 40),
  '--error-text': 'hsl(var(--koi-danger))',
  '--warning-bg': tint('--koi-warning', 12),
  '--warning-border': tint('--koi-warning', 40),
  '--warning-text': 'hsl(var(--koi-warning))',
  '--info-bg': tint('--koi-info', 12),
  '--info-border': tint('--koi-info', 40),
  '--info-text': 'hsl(var(--koi-info))',
} as React.CSSProperties

/**
 * Toaster — mount once near the app root. Trigger via the `toast` helper.
 *
 * @example
 * // app root:
 * <Toaster position="top-right" />
 * // anywhere:
 * toast.success('Saved')
 */
export function Toaster({ position = 'top-right', richColors = true, style, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      richColors={richColors}
      style={{ ...tokenVars, ...style }}
      toastOptions={{
        classNames: {
          toast: 'koi-toast group shadow-lg',
          description: 'text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-foreground',
        },
      }}
      {...props}
    />
  )
}

export { toast }
