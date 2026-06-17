import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'

export interface PopoverProps {
  /** Element that toggles the popover. */
  trigger: React.ReactNode
  children?: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  /** Controlled open state (optional). */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  contentClassName?: string
}

/**
 * Popover — floating panel anchored to a trigger.
 *
 * @example
 * <Popover trigger={<Button label="More" />}>panel content</Popover>
 */
export function Popover({
  trigger,
  children,
  side = 'bottom',
  align = 'center',
  open,
  onOpenChange,
  className,
  contentClassName,
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild className={className}>
        {trigger}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={6}
          className={cn(
            'koi-popover z-50 w-72 rounded-md border border-border bg-background p-4 text-sm text-foreground shadow-md outline-none',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            contentClassName,
          )}
        >
          {children}
          <PopoverPrimitive.Arrow className="fill-background" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
