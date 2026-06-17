import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InplaceProps {
  /** Content shown when inactive (click to edit). */
  display: React.ReactNode
  /** Content shown when active (the editor). */
  children: React.ReactNode
  /** Show a close button to return to display mode. */
  closable?: boolean
  /** Controlled active state. */
  active?: boolean
  defaultActive?: boolean
  onActiveChange?: (active: boolean) => void
  disabled?: boolean
  className?: string
}

/**
 * Inplace — click-to-edit: shows a display node until activated.
 *
 * @example
 * <Inplace display={<span>Click to edit</span>}><Input autoFocus /></Inplace>
 */
export function Inplace({
  display,
  children,
  closable,
  active,
  defaultActive = false,
  onActiveChange,
  disabled,
  className,
}: InplaceProps) {
  const [internal, setInternal] = React.useState(defaultActive)
  const isActive = active ?? internal
  const set = (next: boolean) => {
    if (active == null) setInternal(next)
    onActiveChange?.(next)
  }

  return (
    <div className={cn('koi-inplace inline-flex items-center gap-2', className)}>
      {isActive ? (
        <>
          {children}
          {closable && (
            <button
              type="button"
              onClick={() => set(false)}
              aria-label="Close"
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted"
            >
              <X className="size-4" />
            </button>
          )}
        </>
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={() => set(true)}
          className="cursor-pointer rounded-md px-2 py-1 text-left transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-60"
        >
          {display}
        </button>
      )}
    </div>
  )
}
