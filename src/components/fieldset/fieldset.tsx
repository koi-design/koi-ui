import * as React from 'react'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FieldsetProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend?: React.ReactNode
  icon?: LucideIcon
  toggleable?: boolean
  collapsed?: boolean
  defaultCollapsed?: boolean
  onToggle?: (collapsed: boolean) => void
}

/**
 * Fieldset — grouping box with a legend, optionally collapsible.
 *
 * @example
 * <Fieldset legend="Address" toggleable>…</Fieldset>
 */
export function Fieldset({
  legend,
  icon: Icon,
  toggleable,
  collapsed,
  defaultCollapsed = false,
  onToggle,
  className,
  children,
  ...props
}: FieldsetProps) {
  const [internal, setInternal] = React.useState(defaultCollapsed)
  const isCollapsed = collapsed ?? internal
  const toggle = () => {
    const next = !isCollapsed
    if (collapsed == null) setInternal(next)
    onToggle?.(next)
  }

  return (
    <fieldset
      className={cn('koi-fieldset rounded-md border border-border px-4 pb-4', className)}
      {...props}
    >
      <legend className="px-2">
        {toggleable ? (
          <button
            type="button"
            onClick={toggle}
            className="inline-flex items-center gap-2 font-medium transition-colors hover:text-primary"
          >
            <ChevronDown className={cn('size-4 transition-transform', isCollapsed && '-rotate-90')} />
            {Icon && <Icon className="size-4" aria-hidden />}
            {legend}
          </button>
        ) : (
          <span className="inline-flex items-center gap-2 font-medium">
            {Icon && <Icon className="size-4" aria-hidden />}
            {legend}
          </span>
        )}
      </legend>
      {!isCollapsed && <div className="pt-2">{children}</div>}
    </fieldset>
  )
}
