import * as React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

/** A draggable, selectable row shared by OrderList and PickList. */
export function SortableItem({
  id,
  selected,
  onClick,
  children,
}: {
  id: string
  selected?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 border-b border-border px-3 py-2 text-sm last:border-b-0',
        onClick && 'cursor-pointer',
        selected ? 'bg-primary/10 text-primary' : 'hover:bg-muted',
        isDragging && 'opacity-50',
      )}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        className="cursor-grab text-muted-foreground active:cursor-grabbing"
        aria-label="Drag"
      >
        <GripVertical className="size-4" />
      </button>
      <span className="flex-1">{children}</span>
    </div>
  )
}
