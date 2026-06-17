import * as React from 'react'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MenuItem } from '@/lib/menu-model'

export interface MegaMenuItem {
  label: React.ReactNode
  icon?: LucideIcon
  /** Columns of sub-items shown in the dropdown panel. */
  columns?: MenuItem[][]
}

export interface MegaMenuProps {
  model: MegaMenuItem[]
  className?: string
}

/**
 * MegaMenu — horizontal menu with multi-column dropdown panels.
 *
 * @example
 * <MegaMenu model={[{ label: 'Products', columns: [[{ label: 'Phones' }], [{ label: 'Laptops' }]] }]} />
 */
export function MegaMenu({ model, className }: MegaMenuProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  return (
    <div
      className={cn(
        'koi-megamenu relative flex items-center gap-1 rounded-md border border-border bg-background p-1',
        className,
      )}
      onMouseLeave={() => setOpenIndex(null)}
    >
      {model.map((root, i) => {
        const hasPanel = !!root.columns?.length
        return (
          <div key={i} onMouseEnter={() => setOpenIndex(hasPanel ? i : null)}>
            <button
              type="button"
              className={cn(
                'inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted',
                openIndex === i && 'bg-muted',
              )}
            >
              {root.icon && <root.icon className="size-4" aria-hidden />}
              {root.label}
              {hasPanel && <ChevronDown className="size-3.5 opacity-60" />}
            </button>
            {hasPanel && openIndex === i && (
              <div className="absolute left-0 top-full z-50 mt-1 flex gap-6 rounded-md border border-border bg-background p-4 shadow-md">
                {root.columns!.map((col, ci) => (
                  <div key={ci} className="min-w-[10rem] space-y-1">
                    {col.map((item, ii) =>
                      item.separator ? (
                        <div key={ii} className="my-1 h-px bg-border" />
                      ) : (
                        <button
                          key={ii}
                          type="button"
                          disabled={item.disabled}
                          onClick={() => item.command?.()}
                          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-60"
                        >
                          {item.icon && <item.icon className="size-4" aria-hidden />}
                          {item.label}
                        </button>
                      ),
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
