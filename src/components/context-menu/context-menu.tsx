import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MenuItem } from '@/lib/menu-model'

export interface ContextMenuProps {
  model: MenuItem[]
  /** The element that responds to right-click. */
  children: React.ReactNode
  className?: string
}

const itemCls = cn(
  'koi-menu-item relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
  'focus:bg-muted data-[state=open]:bg-muted',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
)

const contentCls = cn(
  'koi-menu-content z-50 min-w-[12rem] rounded-md border border-border bg-background p-1 text-foreground shadow-md',
  'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
)

function renderItems(items: MenuItem[], keyPrefix: string) {
  return items.map((item, i) => {
    const key = `${keyPrefix}-${i}`
    if (item.separator) {
      return <ContextMenuPrimitive.Separator key={key} className="my-1 h-px bg-border" />
    }
    const inner = (
      <>
        {item.icon && <item.icon className="size-4" aria-hidden />}
        <span className="flex-1">{item.label}</span>
        {item.shortcut && (
          <span className="ml-auto text-xs tracking-widest text-muted-foreground">
            {item.shortcut}
          </span>
        )}
      </>
    )

    if (item.items?.length) {
      return (
        <ContextMenuPrimitive.Sub key={key}>
          <ContextMenuPrimitive.SubTrigger className={itemCls} disabled={item.disabled}>
            {inner}
            <ChevronRight className="ml-1 size-4" />
          </ContextMenuPrimitive.SubTrigger>
          <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.SubContent className={contentCls}>
              {renderItems(item.items, key)}
            </ContextMenuPrimitive.SubContent>
          </ContextMenuPrimitive.Portal>
        </ContextMenuPrimitive.Sub>
      )
    }

    return (
      <ContextMenuPrimitive.Item
        key={key}
        disabled={item.disabled}
        onSelect={() => item.command?.()}
        className={itemCls}
      >
        {inner}
      </ContextMenuPrimitive.Item>
    )
  })
}

/**
 * ContextMenu — right-click menu wrapping a target.
 *
 * @example
 * <ContextMenu model={items}><div>Right-click me</div></ContextMenu>
 */
export function ContextMenu({ model, children, className }: ContextMenuProps) {
  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger className={className}>{children}</ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content className={contentCls}>
          {renderItems(model, 'ctx')}
        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  )
}
