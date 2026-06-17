import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputGroupProps {
  children: React.ReactNode
  /** Content attached before the field (text or icon). */
  addonBefore?: React.ReactNode
  /** Content attached after the field. */
  addonAfter?: React.ReactNode
  size?: 'small' | 'normal' | 'large'
  className?: string
}

const heights = { small: 'h-9', normal: 'h-11', large: 'h-[3.25rem]' }

/**
 * InputGroup — attaches addons before/after a field.
 * The inner control's border/radius are neutralized; the group draws the box.
 *
 * @example
 * <InputGroup addonBefore="https://"><Input /></InputGroup>
 * <InputGroup addonAfter="@mail.com"><Input /></InputGroup>
 */
export function InputGroup({
  children,
  addonBefore,
  addonAfter,
  size = 'normal',
  className,
}: InputGroupProps) {
  const addon = (node: React.ReactNode, side: 'left' | 'right') => (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap bg-muted px-3 text-sm text-muted-foreground',
        side === 'left' ? 'border-r border-input' : 'border-l border-input',
      )}
    >
      {node}
    </span>
  )

  return (
    <div
      className={cn(
        'koi-inputgroup inline-flex w-full items-stretch overflow-hidden rounded-md border border-input bg-background transition-colors',
        'focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30',
        heights[size],
        // neutralize the inner control's own chrome
        '[&_.koi-input]:h-full [&_.koi-input]:rounded-none [&_.koi-input]:border-0 [&_.koi-input]:bg-transparent',
        '[&_.koi-input]:ring-0 [&_.koi-input:focus]:ring-0 [&_.koi-input]:focus-visible:ring-0',
        className,
      )}
    >
      {addonBefore != null && addon(addonBefore, 'left')}
      <span className="flex min-w-0 flex-1 items-center">{children}</span>
      {addonAfter != null && addon(addonAfter, 'right')}
    </div>
  )
}
