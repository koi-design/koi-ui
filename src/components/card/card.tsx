import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card title rendered in the body header. */
  title?: React.ReactNode
  /** Secondary line under the title. */
  subtitle?: React.ReactNode
  /** Content rendered above the body, edge-to-edge (e.g. an image). */
  header?: React.ReactNode
  /** Content rendered at the bottom, separated by a divider. */
  footer?: React.ReactNode
  /** Class applied to the inner body wrapper. */
  bodyClassName?: string
}

/**
 * Card — prop-driven container.
 *
 * @example
 * <Card title="Profile" subtitle="Account details">…</Card>
 * <Card header={<img src="cover.jpg" />} footer={<Button label="Save" />}>…</Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { title, subtitle, header, footer, bodyClassName, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'koi-card overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-sm',
        className,
      )}
      {...props}
    >
      {header && <div className="koi-card-header">{header}</div>}

      <div className={cn('p-5', bodyClassName)}>
        {(title || subtitle) && (
          <div className="mb-4">
            {title && <div className="text-xl font-semibold leading-tight">{title}</div>}
            {subtitle && <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div>}
          </div>
        )}
        {children}
      </div>

      {footer && <div className="border-t border-border px-5 py-4">{footer}</div>}
    </div>
  )
})
