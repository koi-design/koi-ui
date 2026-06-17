import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { Search, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CommandItem {
  value: string
  label: React.ReactNode
  icon?: LucideIcon
  shortcut?: string
  disabled?: boolean
  /** Extra keywords matched by the filter. */
  keywords?: string[]
  onSelect?: (value: string) => void
}

export interface CommandGroup {
  heading?: React.ReactNode
  items: CommandItem[]
}

export interface CommandProps {
  groups: CommandGroup[]
  placeholder?: string
  emptyText?: React.ReactNode
  /** Hide the search input (use as a static list). */
  searchable?: boolean
  className?: string
}

/**
 * Command — searchable command palette / list (base for autocomplete).
 *
 * @example
 * <Command groups={[{ heading: 'Actions', items: [{ value:'new', label:'New', onSelect }] }]} />
 */
export function Command({
  groups,
  placeholder = 'Type a command or search…',
  emptyText = 'No results found.',
  searchable = true,
  className,
}: CommandProps) {
  return (
    <CommandPrimitive
      className={cn(
        'koi-command flex w-full flex-col overflow-hidden rounded-md border border-border bg-background text-foreground',
        className,
      )}
    >
      {searchable && (
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <CommandPrimitive.Input
            placeholder={placeholder}
            className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      )}
      <CommandPrimitive.List className="max-h-72 overflow-y-auto p-1">
        <CommandPrimitive.Empty className="py-6 text-center text-sm text-muted-foreground">
          {emptyText}
        </CommandPrimitive.Empty>
        {groups.map((group, gi) => (
          <CommandPrimitive.Group
            key={gi}
            heading={group.heading}
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
          >
            {group.items.map((item) => (
              <CommandPrimitive.Item
                key={item.value}
                value={item.value}
                keywords={item.keywords}
                disabled={item.disabled}
                onSelect={() => item.onSelect?.(item.value)}
                className={cn(
                  'koi-command-item flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none',
                  'data-[selected=true]:bg-muted data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-60',
                )}
              >
                {item.icon && <item.icon className="size-4" aria-hidden />}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                    {item.shortcut}
                  </span>
                )}
              </CommandPrimitive.Item>
            ))}
          </CommandPrimitive.Group>
        ))}
      </CommandPrimitive.List>
    </CommandPrimitive>
  )
}
