import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const tagVariants = cva(
  'koi-tag inline-flex items-center gap-1 font-medium leading-none',
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
        small: 'px-1.5 py-0.5 text-xs [&_svg]:size-3',
        normal: 'px-2 py-1 text-xs [&_svg]:size-3.5',
        large: 'px-2.5 py-1 text-sm [&_svg]:size-4',
      },
      rounded: { true: 'rounded-full', false: 'rounded' },
    },
    defaultVariants: { severity: 'primary', size: 'normal', rounded: false },
  },
)

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>,
    VariantProps<typeof tagVariants> {
  value?: React.ReactNode
  icon?: LucideIcon
}

/**
 * Tag — labeled status indicator.
 *
 * @example
 * <Tag value="New" severity="success" icon={Check} />
 */
export function Tag({ value, icon: Icon, severity, size, rounded, className, ...props }: TagProps) {
  return (
    <span className={cn(tagVariants({ severity, size, rounded }), className)} {...props}>
      {Icon && <Icon aria-hidden />}
      {value}
    </span>
  )
}

export { tagVariants }
