import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MenuItem } from '@/lib/menu-model'

export interface PanelMenuProps {
  model: MenuItem[]
  /** Allow multiple top-level groups open at once. */
  multiple?: boolean
  className?: string
}

function Leaf({ item, depth }: { item: MenuItem; depth: number }) {
  const inner = (
    <>
      {item.icon && <item.icon className="size-4 shrink-0" aria-hidden />}
      <span className="flex-1">{item.label}</span>
    </>
  )
  const cls = cn(
    'flex w-full items-center gap-2 rounded-sm py-2 pr-3 text-left text-sm transition-colors hover:bg-muted',
    'disabled:pointer-events-none disabled:opacity-60',
  )
  return item.url ? (
    <a href={item.url} target={item.target} className={cls} style={{ paddingLeft: 12 + depth * 16 }}>
      {inner}
    </a>
  ) : (
    <button
      type="button"
      disabled={item.disabled}
      onClick={() => item.command?.()}
      className={cls}
      style={{ paddingLeft: 12 + depth * 16 }}
    >
      {inner}
    </button>
  )
}

function Node({ item, depth }: { item: MenuItem; depth: number }) {
  const [open, setOpen] = React.useState(false)
  if (!item.items?.length) return <Leaf item={item} depth={depth} />
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 py-2 pr-3 text-left text-sm font-medium transition-colors hover:bg-muted"
        style={{ paddingLeft: 12 + depth * 16 }}
      >
        {item.icon && <item.icon className="size-4 shrink-0" aria-hidden />}
        <span className="flex-1">{item.label}</span>
        <ChevronDown className={cn('size-4 transition-transform', !open && '-rotate-90')} />
      </button>
      {open && (
        <div>
          {item.items.map((sub, i) => (
            <Node key={i} item={sub} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * PanelMenu — vertical accordion-style nested menu.
 *
 * @example
 * <PanelMenu model={[{ label: 'Users', icon: Users, items: [{ label: 'List' }] }]} />
 */
export function PanelMenu({ model, className }: PanelMenuProps) {
  return (
    <div
      className={cn(
        'koi-panelmenu min-w-[14rem] overflow-hidden rounded-md border border-border bg-background',
        className,
      )}
    >
      {model.map((item, i) => (
        <Node key={i} item={item} depth={0} />
      ))}
    </div>
  )
}
