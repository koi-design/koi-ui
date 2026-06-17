import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  header?: React.ReactNode
  /** Extra actions rendered on the right of the header. */
  icons?: React.ReactNode
  footer?: React.ReactNode
  /** Allow collapsing via a toggle button. */
  toggleable?: boolean
  /** Controlled collapsed state. */
  collapsed?: boolean
  defaultCollapsed?: boolean
  onToggle?: (collapsed: boolean) => void
}

/**
 * Panel — titled, optionally collapsible content container.
 *
 * @example
 * <Panel header="Details" toggleable>…</Panel>
 */
export function Panel({
  header,
  icons,
  footer,
  toggleable,
  collapsed,
  defaultCollapsed = false,
  onToggle,
  className,
  children,
  ...props
}: PanelProps) {
  const [internal, setInternal] = React.useState(defaultCollapsed)
  const isCollapsed = collapsed ?? internal
  const toggle = () => {
    const next = !isCollapsed
    if (collapsed == null) setInternal(next)
    onToggle?.(next)
  }

  return (
    <div
      className={cn(
        'koi-panel overflow-hidden rounded-md border border-border bg-background',
        className,
      )}
      {...props}
    >
      {(header || toggleable || icons) && (
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
          <span className="flex-1 font-medium">{header}</span>
          {icons}
          {toggleable && (
            <button
              type="button"
              onClick={toggle}
              aria-label={isCollapsed ? 'Expand' : 'Collapse'}
              className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted"
            >
              <ChevronDown className={cn('size-4 transition-transform', isCollapsed && '-rotate-90')} />
            </button>
          )}
        </div>
      )}
      {!isCollapsed && <div className="p-4">{children}</div>}
      {!isCollapsed && footer && <div className="border-t border-border px-4 py-3">{footer}</div>}
    </div>
  )
}
