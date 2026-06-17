import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MenuItem } from '@/lib/menu-model'

export interface MenubarMenu {
  label: React.ReactNode
  items: MenuItem[]
}

export interface MenubarProps {
  model: MenubarMenu[]
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
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
)

function renderItems(items: MenuItem[], keyPrefix: string) {
  return items.map((item, i) => {
    const key = `${keyPrefix}-${i}`
    if (item.separator) {
      return <MenubarPrimitive.Separator key={key} className="my-1 h-px bg-border" />
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
        <MenubarPrimitive.Sub key={key}>
          <MenubarPrimitive.SubTrigger className={itemCls} disabled={item.disabled}>
            {inner}
            <ChevronRight className="ml-1 size-4" />
          </MenubarPrimitive.SubTrigger>
          <MenubarPrimitive.Portal>
            <MenubarPrimitive.SubContent className={contentCls}>
              {renderItems(item.items, key)}
            </MenubarPrimitive.SubContent>
          </MenubarPrimitive.Portal>
        </MenubarPrimitive.Sub>
      )
    }

    return (
      <MenubarPrimitive.Item
        key={key}
        disabled={item.disabled}
        onSelect={() => item.command?.()}
        asChild={!!item.url}
        className={itemCls}
      >
        {item.url ? (
          <a href={item.url} target={item.target}>
            {inner}
          </a>
        ) : (
          inner
        )}
      </MenubarPrimitive.Item>
    )
  })
}

/**
 * Menubar — horizontal application menu with nested submenus.
 *
 * @example
 * <Menubar model={[{ label: 'File', items: [{ label: 'New', command }] }]} />
 */
export function Menubar({ model, className }: MenubarProps) {
  return (
    <MenubarPrimitive.Root
      className={cn(
        'koi-menubar flex items-center gap-1 rounded-md border border-border bg-background p-1',
        className,
      )}
    >
      {model.map((menu, i) => (
        <MenubarPrimitive.Menu key={i}>
          <MenubarPrimitive.Trigger className="koi-menubar-trigger cursor-pointer select-none rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-muted data-[state=open]:bg-muted">
            {menu.label}
          </MenubarPrimitive.Trigger>
          <MenubarPrimitive.Portal>
            <MenubarPrimitive.Content align="start" sideOffset={6} className={contentCls}>
              {renderItems(menu.items, `${i}`)}
            </MenubarPrimitive.Content>
          </MenubarPrimitive.Portal>
        </MenubarPrimitive.Menu>
      ))}
    </MenubarPrimitive.Root>
  )
}
