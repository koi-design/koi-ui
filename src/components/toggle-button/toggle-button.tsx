import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ToggleButtonProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    'pressed' | 'onPressedChange' | 'onChange'
  > {
  /** Controlled pressed state. */
  checked?: boolean
  /** Fires with the next pressed state. */
  onChange?: (checked: boolean) => void
  /** Label shown when pressed (falls back to `offLabel`). */
  onLabel?: string
  /** Label shown when not pressed. */
  offLabel?: string
  /** Icon shown when pressed (falls back to `offIcon`). */
  onIcon?: LucideIcon
  /** Icon shown when not pressed. */
  offIcon?: LucideIcon
  size?: 'small' | 'normal' | 'large'
}

const sizes = {
  small: 'h-9 px-3 text-sm [&_svg]:size-4',
  normal: 'h-11 px-4 text-base [&_svg]:size-4',
  large: 'h-[3.25rem] px-5 text-lg [&_svg]:size-5',
}

/** ToggleButton — prop-driven two-state button. */
export const ToggleButton = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleButtonProps
>(function ToggleButton(
  { checked, onChange, onLabel, offLabel, onIcon, offIcon, size = 'normal', className, ...props },
  ref,
) {
  const Icon = checked ? (onIcon ?? offIcon) : (offIcon ?? onIcon)
  const label = checked ? (onLabel ?? offLabel) : (offLabel ?? onLabel)

  return (
    <TogglePrimitive.Root
      ref={ref}
      pressed={checked}
      onPressedChange={(v) => onChange?.(v)}
      className={cn(
        'koi-togglebutton inline-flex items-center justify-center gap-2 rounded-md border font-medium transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
        'disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0',
        'border-input bg-background text-foreground enabled:hover:bg-muted',
        'data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:enabled:hover:bg-primary/90',
        sizes[size],
        className,
      )}
      {...props}
    >
      {Icon && <Icon aria-hidden />}
      {label}
    </TogglePrimitive.Root>
  )
})
