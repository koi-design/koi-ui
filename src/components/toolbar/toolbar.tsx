import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left-aligned content. */
  start?: React.ReactNode
  /** Centered content. */
  center?: React.ReactNode
  /** Right-aligned content. */
  end?: React.ReactNode
}

/**
 * Toolbar — horizontal bar with start / center / end regions.
 *
 * @example
 * <Toolbar start={<Button label="New" />} end={<Input placeholder="Search" />} />
 */
export function Toolbar({ start, center, end, className, children, ...props }: ToolbarProps) {
  return (
    <div
      className={cn(
        'koi-toolbar flex flex-wrap items-center gap-2 rounded-md border border-border bg-muted/40 px-4 py-3',
        className,
      )}
      {...props}
    >
      {start && <div className="flex items-center gap-2">{start}</div>}
      {center && <div className="flex flex-1 items-center justify-center gap-2">{center}</div>}
      {!center && <div className="flex-1" />}
      {end && <div className="flex items-center gap-2">{end}</div>}
      {children}
    </div>
  )
}
