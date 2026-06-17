import { cn } from '@/lib/utils'
import type { MenuItem } from '@/lib/menu-model'

export interface TabMenuProps {
  model: MenuItem[]
  activeIndex?: number
  onChange?: (index: number) => void
  className?: string
}

/**
 * TabMenu — horizontal tab-style navigation (no content panels).
 *
 * @example
 * <TabMenu model={[{ label: 'Home', icon: Home }]} activeIndex={i} onChange={setI} />
 */
export function TabMenu({ model, activeIndex = 0, onChange, className }: TabMenuProps) {
  return (
    <div className={cn('koi-tabmenu flex border-b border-border', className)}>
      {model.map((item, i) => {
        const active = i === activeIndex
        return (
          <button
            key={i}
            type="button"
            disabled={item.disabled}
            onClick={() => {
              item.command?.()
              onChange?.(i)
            }}
            className={cn(
              '-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
              'disabled:pointer-events-none disabled:opacity-60',
              active
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {item.icon && <item.icon className="size-4" aria-hidden />}
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
