import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TabItem {
  value: string
  label: React.ReactNode
  content: React.ReactNode
  icon?: LucideIcon
  disabled?: boolean
}

export interface TabsProps {
  tabs: TabItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  className?: string
  listClassName?: string
}

/**
 * Tabs — model-driven tab view.
 *
 * @example
 * <Tabs tabs={[{ value: 'a', label: 'A', content: <…/> }]} />
 */
export function Tabs({
  tabs,
  value,
  defaultValue,
  onChange,
  orientation = 'horizontal',
  className,
  listClassName,
}: TabsProps) {
  return (
    <TabsPrimitive.Root
      value={value}
      defaultValue={defaultValue ?? tabs[0]?.value}
      onValueChange={(v) => onChange?.(v)}
      orientation={orientation}
      className={cn(
        'koi-tabs',
        orientation === 'vertical' ? 'flex gap-4' : 'flex flex-col',
        className,
      )}
    >
      <TabsPrimitive.List
        className={cn(
          'koi-tabs-list flex',
          orientation === 'vertical'
            ? 'flex-col border-r border-border'
            : 'border-b border-border',
          listClassName,
        )}
      >
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className={cn(
              'koi-tab inline-flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium text-muted-foreground transition-colors',
              'hover:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60',
              'data-[state=active]:text-primary',
              orientation === 'vertical'
                ? '-mr-px border-r-2 border-transparent data-[state=active]:border-primary'
                : '-mb-px border-b-2 border-transparent data-[state=active]:border-primary',
            )}
          >
            {tab.icon && <tab.icon className="size-4" aria-hidden />}
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      <div className="flex-1">
        {tabs.map((tab) => (
          <TabsPrimitive.Content
            key={tab.value}
            value={tab.value}
            className="koi-tab-content pt-4 focus-visible:outline-none"
          >
            {tab.content}
          </TabsPrimitive.Content>
        ))}
      </div>
    </TabsPrimitive.Root>
  )
}
