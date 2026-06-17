import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cn } from '@/lib/utils'

export interface SeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>, 'children'> {
  orientation?: 'horizontal' | 'vertical'
  /** Optional centered label (horizontal only). */
  label?: React.ReactNode
  /** Label alignment when `label` is set. */
  align?: 'start' | 'center' | 'end'
}

/**
 * Separator — divider, optionally with a label.
 *
 * @example
 * <Separator />
 * <Separator label="OR" />
 * <Separator orientation="vertical" />
 */
export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(function Separator(
  { orientation = 'horizontal', label, align = 'center', decorative = true, className, ...props },
  ref,
) {
  if (label && orientation === 'horizontal') {
    return (
      <div
        className={cn(
          'koi-separator flex items-center gap-3 text-sm text-muted-foreground',
          align === 'start' && 'flex-row-reverse justify-end',
          align === 'end' && 'justify-end',
          className,
        )}
      >
        <span className="h-px flex-1 bg-border" />
        <span className="shrink-0">{label}</span>
        {align === 'center' && <span className="h-px flex-1 bg-border" />}
      </div>
    )
  }

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'koi-separator shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  )
})
