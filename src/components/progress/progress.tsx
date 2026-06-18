import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const barVariants = cva('h-full w-full flex-1 transition-transform duration-300', {
  variants: {
    severity: {
      primary: 'bg-primary',
      success: 'bg-success',
      info: 'bg-info',
      warning: 'bg-warning',
      danger: 'bg-danger',
    },
  },
  defaultVariants: { severity: 'primary' },
})

export interface ProgressProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, 'value'>,
    VariantProps<typeof barVariants> {
  /** 0–100. Ignored when `mode="indeterminate"`. */
  value?: number
  mode?: 'determinate' | 'indeterminate'
  /** Show the percentage label inside the bar. */
  showValue?: boolean
}

/**
 * Progress — determinate or indeterminate bar.
 *
 * @example
 * <Progress value={60} showValue />
 * <Progress mode="indeterminate" severity="info" />
 */
export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(function Progress(
  { value = 0, mode = 'determinate', showValue, severity, className, ...props },
  ref,
) {
  const indeterminate = mode === 'indeterminate'
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={indeterminate ? null : clamped}
      className={cn(
        'koi-progress relative h-5 w-full overflow-hidden rounded-full bg-muted',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          barVariants({ severity }),
          indeterminate &&
            'koi-progress-indeterminate absolute inset-y-0 !w-auto rounded-full !transition-none',
        )}
        style={indeterminate ? undefined : { transform: `translateX(-${100 - clamped}%)` }}
      />
      {showValue && !indeterminate && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary-foreground">
          {clamped}%
        </span>
      )}
    </ProgressPrimitive.Root>
  )
})
