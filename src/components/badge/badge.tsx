import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'koi-badge inline-flex items-center justify-center font-semibold leading-none',
  {
    variants: {
      severity: {
        primary: 'bg-primary text-primary-foreground',
        success: 'bg-success text-success-foreground',
        info: 'bg-info text-info-foreground',
        warning: 'bg-warning text-warning-foreground',
        danger: 'bg-danger text-danger-foreground',
        help: 'bg-help text-help-foreground',
        secondary: 'bg-muted text-foreground',
      },
      size: {
        small: 'min-w-4 h-4 px-1 text-[0.65rem]',
        normal: 'min-w-5 h-5 px-1.5 text-xs',
        large: 'min-w-7 h-7 px-2 text-sm',
      },
      rounded: { true: 'rounded-full', false: 'rounded' },
      dot: { true: 'min-w-0 p-0', false: '' },
    },
    compoundVariants: [
      { dot: true, size: 'small', class: 'size-2' },
      { dot: true, size: 'normal', class: 'size-2.5' },
      { dot: true, size: 'large', class: 'size-3.5' },
    ],
    defaultVariants: { severity: 'primary', size: 'normal', rounded: true, dot: false },
  },
)

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>,
    VariantProps<typeof badgeVariants> {
  /** Text/number to display. Ignored when `dot` is set. */
  value?: React.ReactNode
}

/**
 * Badge — small status indicator.
 *
 * @example
 * <Badge value={8} severity="danger" />
 * <Badge dot severity="success" />
 */
export function Badge({ value, severity, size, rounded, dot, className, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ severity, size, rounded, dot }), className)} {...props}>
      {!dot && value}
    </span>
  )
}

export { badgeVariants }
