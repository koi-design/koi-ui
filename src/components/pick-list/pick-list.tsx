import * as React from 'react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SortableItem } from '../order-list/sortable-item'

export interface PickListProps<T> {
  source: T[]
  target: T[]
  onChange: (next: { source: T[]; target: T[] }) => void
  dataKey: keyof T
  itemTemplate: (item: T) => React.ReactNode
  sourceHeader?: React.ReactNode
  targetHeader?: React.ReactNode
  className?: string
}

/**
 * PickList — transfer and reorder items between two lists.
 *
 * @example
 * import { PickList } from 'koi-ui/dnd'
 * <PickList source={src} target={tgt} onChange={({source, target}) => …} dataKey="id" itemTemplate={(it) => it.name} />
 */
export function PickList<T>({
  source,
  target,
  onChange,
  dataKey,
  itemTemplate,
  sourceHeader = 'Available',
  targetHeader = 'Selected',
  className,
}: PickListProps<T>) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))
  const [sel, setSel] = React.useState<{ source: string[]; target: string[] }>({ source: [], target: [] })
  const idOf = (it: T) => String(it[dataKey])

  const toggleSel = (list: 'source' | 'target', id: string) =>
    setSel((s) => ({
      ...s,
      [list]: s[list].includes(id) ? s[list].filter((x) => x !== id) : [...s[list], id],
    }))

  const move = (from: 'source' | 'target', all: boolean) => {
    const to = from === 'source' ? 'target' : 'source'
    const fromList = from === 'source' ? source : target
    const toList = to === 'source' ? source : target
    const moving = all ? fromList : fromList.filter((it) => sel[from].includes(idOf(it)))
    if (!moving.length) return
    const movingIds = new Set(moving.map(idOf))
    const nextFrom = fromList.filter((it) => !movingIds.has(idOf(it)))
    const nextTo = [...toList, ...moving]
    onChange(from === 'source' ? { source: nextFrom, target: nextTo } : { source: nextTo, target: nextFrom })
    setSel((s) => ({ ...s, [from]: [] }))
  }

  const reorder = (list: 'source' | 'target') => (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const arr = list === 'source' ? source : target
    const ids = arr.map(idOf)
    const next = arrayMove(arr, ids.indexOf(String(active.id)), ids.indexOf(String(over.id)))
    onChange(list === 'source' ? { source: next, target } : { source, target: next })
  }

  const renderList = (list: 'source' | 'target', items: T[], header: React.ReactNode) => {
    const ids = items.map(idOf)
    return (
      <div className="flex-1 overflow-hidden rounded-md border border-border bg-background">
        <div className="border-b border-border bg-muted/40 px-3 py-2 font-medium">{header}</div>
        <div className="max-h-72 overflow-y-auto">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={reorder(list)}>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
              {items.map((item) => {
                const id = idOf(item)
                return (
                  <SortableItem key={id} id={id} selected={sel[list].includes(id)} onClick={() => toggleSel(list, id)}>
                    {itemTemplate(item)}
                  </SortableItem>
                )
              })}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    )
  }

  const btn = 'inline-flex size-9 items-center justify-center rounded-md border border-input transition-colors hover:border-primary hover:text-primary'

  return (
    <div className={cn('koi-picklist flex items-stretch gap-3', className)}>
      {renderList('source', source, sourceHeader)}
      <div className="flex flex-col justify-center gap-2">
        <button type="button" className={btn} onClick={() => move('source', false)} aria-label="Move selected to target">
          <ChevronRight className="size-4" />
        </button>
        <button type="button" className={btn} onClick={() => move('source', true)} aria-label="Move all to target">
          <ChevronsRight className="size-4" />
        </button>
        <button type="button" className={btn} onClick={() => move('target', false)} aria-label="Move selected to source">
          <ChevronLeft className="size-4" />
        </button>
        <button type="button" className={btn} onClick={() => move('target', true)} aria-label="Move all to source">
          <ChevronsLeft className="size-4" />
        </button>
      </div>
      {renderList('target', target, targetHeader)}
    </div>
  )
}
