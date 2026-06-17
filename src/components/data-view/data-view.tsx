import * as React from 'react'
import { LayoutGrid, List } from 'lucide-react'
import { cn } from '@/lib/utils'

export type DataViewLayout = 'list' | 'grid'

export interface DataViewProps<T> {
  value: T[]
  /** Render a single item for the current layout. */
  itemTemplate: (item: T, layout: DataViewLayout) => React.ReactNode
  layout?: DataViewLayout
  defaultLayout?: DataViewLayout
  onLayoutChange?: (layout: DataViewLayout) => void
  /** Show the built-in list/grid switcher in the header. */
  showLayoutSwitcher?: boolean
  header?: React.ReactNode
  /** Columns for grid layout (Tailwind grid-cols-* count). */
  gridCols?: 2 | 3 | 4
  emptyText?: React.ReactNode
  className?: string
}

const gridColsCls = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }

/**
 * DataView — list/grid data presentation with an optional layout switcher.
 *
 * @example
 * <DataView value={products} showLayoutSwitcher itemTemplate={(p, layout) => …} />
 */
export function DataView<T>({
  value,
  itemTemplate,
  layout,
  defaultLayout = 'list',
  onLayoutChange,
  showLayoutSwitcher,
  header,
  gridCols = 3,
  emptyText = 'No records found',
  className,
}: DataViewProps<T>) {
  const [internal, setInternal] = React.useState<DataViewLayout>(defaultLayout)
  const current = layout ?? internal
  const setLayout = (l: DataViewLayout) => {
    if (layout == null) setInternal(l)
    onLayoutChange?.(l)
  }

  const switcher = (
    <div className="inline-flex overflow-hidden rounded-md border border-input">
      {(['list', 'grid'] as const).map((l) => {
        const Icon = l === 'list' ? List : LayoutGrid
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLayout(l)}
            aria-pressed={current === l}
            className={cn(
              'inline-flex size-9 items-center justify-center transition-colors',
              current === l ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
            )}
          >
            <Icon className="size-4" />
          </button>
        )
      })}
    </div>
  )

  return (
    <div className={cn('koi-dataview overflow-hidden rounded-md border border-border bg-background', className)}>
      {(header || showLayoutSwitcher) && (
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
          <div className="flex-1">{header}</div>
          {showLayoutSwitcher && switcher}
        </div>
      )}
      {value.length === 0 ? (
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">{emptyText}</div>
      ) : current === 'grid' ? (
        <div className={cn('grid grid-cols-1 gap-4 p-4', gridColsCls[gridCols])}>
          {value.map((item, i) => (
            <React.Fragment key={i}>{itemTemplate(item, 'grid')}</React.Fragment>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-border">
          {value.map((item, i) => (
            <React.Fragment key={i}>{itemTemplate(item, 'list')}</React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}
