import { cn } from '@/lib/utils'
import type { MenuItem } from '@/lib/menu-model'

export interface MenuProps {
  /** Items; an item with `items` becomes a labeled group. */
  model: MenuItem[]
  className?: string
}

function renderItem(item: MenuItem, key: string) {
  if (item.separator) return <div key={key} className="my-1 h-px bg-border" />
  const inner = (
    <>
      {item.icon && <item.icon className="size-4 shrink-0" aria-hidden />}
      <span className="flex-1">{item.label}</span>
      {item.shortcut && (
        <span className="text-xs tracking-widest text-muted-foreground">{item.shortcut}</span>
      )}
    </>
  )
  const cls = cn(
    'flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors',
    'hover:bg-muted disabled:pointer-events-none disabled:opacity-60',
  )
  return item.url ? (
    <a key={key} href={item.url} target={item.target} className={cls}>
      {inner}
    </a>
  ) : (
    <button key={key} type="button" disabled={item.disabled} onClick={() => item.command?.()} className={cls}>
      {inner}
    </button>
  )
}

/**
 * Menu — vertical list menu, optionally grouped.
 *
 * @example
 * <Menu model={[{ label: 'Account', items: [{ label: 'Settings', icon: Settings }] }]} />
 */
export function Menu({ model, className }: MenuProps) {
  return (
    <div
      className={cn(
        'koi-menu min-w-[12rem] rounded-md border border-border bg-background p-1 text-foreground',
        className,
      )}
    >
      {model.map((item, i) =>
        item.items?.length ? (
          <div key={i}>
            <div className="px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {item.label}
            </div>
            {item.items.map((sub, j) => renderItem(sub, `${i}-${j}`))}
          </div>
        ) : (
          renderItem(item, `${i}`)
        ),
      )}
    </div>
  )
}
