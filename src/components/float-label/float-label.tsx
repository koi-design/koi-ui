import * as React from 'react'
import { cn } from '@/lib/utils'

export interface FloatLabelProps {
  /** The floating label text. */
  label: React.ReactNode
  /** A single form control (Input, Select, etc.). */
  children: React.ReactElement
  className?: string
}

/**
 * FloatLabel — label that floats above the field when filled or focused.
 * Wrap a single control; the control must forward `className` and `placeholder`.
 *
 * @example
 * <FloatLabel label="Name"><Input /></FloatLabel>
 */
export function FloatLabel({ label, children, className }: FloatLabelProps) {
  const id = React.useId()
  const childId = (children.props as { id?: string }).id ?? id

  const child = React.cloneElement(children, {
    id: childId,
    placeholder: ' ',
    className: cn('peer', (children.props as { className?: string }).className),
  } as Record<string, unknown>)

  return (
    <span className={cn('koi-floatlabel relative block', className)}>
      {child}
      <label
        htmlFor={childId}
        className={cn(
          'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-background px-1 text-muted-foreground transition-all duration-200',
          'peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary',
          'peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs',
        )}
      >
        {label}
      </label>
    </span>
  )
}
