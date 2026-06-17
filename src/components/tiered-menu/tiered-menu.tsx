import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MenuItem } from '@/lib/menu-model'

export interface TieredMenuProps {
  model: MenuItem[]
  className?: string
}

const listCls =
  'koi-tieredmenu-list min-w-[12rem] rounded-md border border-border bg-background p-1 text-foreground shadow-md'

function Node({ item }: { item: MenuItem }) {
  const [open, setOpen] = React.useState(false)
  if (item.separator) return <div className="my-1 h-px bg-border" />

  const hasChildren = !!item.items?.length
  const inner = (
    <>
      {item.icon && <item.icon className="size-4 shrink-0" aria-hidden />}
      <span className="flex-1">{item.label}</span>
      {hasChildren && <ChevronRight className="size-4" />}
      {!hasChildren && item.shortcut && (
        <span className="text-xs tracking-widest text-muted-foreground">{item.shortcut}</span>
      )}
    </>
  )
  const cls = cn(
    'flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-muted',
    'disabled:pointer-events-none disabled:opacity-60',
  )

  return (
    <div
      className="relative"
      onMouseEnter={() => hasChildren && setOpen(true)}
      onMouseLeave={() => hasChildren && setOpen(false)}
    >
      {item.url && !hasChildren ? (
        <a href={item.url} target={item.target} className={cls}>
          {inner}
        </a>
      ) : (
        <button type="button" disabled={item.disabled} onClick={() => item.command?.()} className={cls}>
          {inner}
        </button>
      )}
      {hasChildren && open && (
        <div className={cn(listCls, 'absolute left-full top-0 -ml-1')}>
          {item.items!.map((sub, i) => (
            <Node key={i} item={sub} />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * TieredMenu — vertical menu with nested submenus on hover.
 *
 * @example
 * <TieredMenu model={[{ label: 'File', items: [{ label: 'Export', items: [{ label: 'PDF' }] }] }]} />
 */
export function TieredMenu({ model, className }: TieredMenuProps) {
  return (
    <div className={cn(listCls, className)}>
      {model.map((item, i) => (
        <Node key={i} item={item} />
      ))}
    </div>
  )
}
