import * as React from 'react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { cn } from '@/lib/utils'
import { SortableItem } from './sortable-item'

export interface OrderListProps<T> {
  value: T[]
  onChange: (value: T[]) => void
  /** Field used as a stable id per item. */
  dataKey: keyof T
  itemTemplate: (item: T) => React.ReactNode
  header?: React.ReactNode
  className?: string
}

/**
 * OrderList — drag to reorder a single list.
 *
 * @example
 * import { OrderList } from 'koi-ui/dnd'
 * <OrderList value={items} onChange={setItems} dataKey="id" itemTemplate={(it) => it.name} />
 */
export function OrderList<T>({ value, onChange, dataKey, itemTemplate, header, className }: OrderListProps<T>) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))
  const ids = value.map((it) => String(it[dataKey]))

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const from = ids.indexOf(String(active.id))
    const to = ids.indexOf(String(over.id))
    onChange(arrayMove(value, from, to))
  }

  return (
    <div className={cn('koi-orderlist overflow-hidden rounded-md border border-border bg-background', className)}>
      {header && <div className="border-b border-border bg-muted/40 px-3 py-2 font-medium">{header}</div>}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {value.map((item, i) => (
            <SortableItem key={ids[i]} id={ids[i]}>
              {itemTemplate(item)}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
