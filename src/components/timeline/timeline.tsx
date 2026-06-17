import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TimelineEvent {
  /** Main content. */
  content?: React.ReactNode
  /** Content on the opposite side (e.g. a date). */
  opposite?: React.ReactNode
  icon?: LucideIcon
  /** Marker color (CSS color or Tailwind class via markerClassName). */
  markerClassName?: string
}

export interface TimelineProps {
  value: TimelineEvent[]
  align?: 'left' | 'right' | 'alternate'
  className?: string
}

/**
 * Timeline — vertical sequence of events with markers and a connector line.
 *
 * @example
 * <Timeline value={[{ opposite: '09:00', content: 'Ordered', icon: ShoppingCart }]} />
 */
export function Timeline({ value, align = 'left', className }: TimelineProps) {
  return (
    <div className={cn('koi-timeline flex flex-col', className)}>
      {value.map((event, i) => {
        const last = i === value.length - 1
        const flip = align === 'right' || (align === 'alternate' && i % 2 === 1)
        return (
          <div key={i} className={cn('flex gap-4', flip && 'flex-row-reverse')}>
            {/* opposite side */}
            <div className={cn('flex-1 pb-6 text-sm text-muted-foreground', flip ? 'text-left' : 'text-right')}>
              {event.opposite}
            </div>
            {/* marker + connector */}
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-primary',
                  event.markerClassName,
                )}
              >
                {event.icon && <event.icon className="size-4" aria-hidden />}
              </span>
              {!last && <span className="w-px flex-1 bg-border" />}
            </div>
            {/* content side */}
            <div className={cn('flex-1 pb-6 text-sm', flip ? 'text-right' : 'text-left')}>
              {event.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
