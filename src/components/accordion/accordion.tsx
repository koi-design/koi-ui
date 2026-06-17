import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AccordionItem {
  value: string
  header: React.ReactNode
  content: React.ReactNode
  icon?: LucideIcon
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  /** Allow multiple panels open at once. */
  multiple?: boolean
  /** Controlled value(s). string for single, string[] for multiple. */
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[]) => void
  className?: string
}

/**
 * Accordion — collapsible panels.
 *
 * @example
 * <Accordion items={faq} />
 * <Accordion multiple items={faq} />
 */
export function Accordion({
  items,
  multiple,
  value,
  defaultValue,
  onChange,
  className,
}: AccordionProps) {
  const body = items.map((item) => (
    <AccordionPrimitive.Item
      key={item.value}
      value={item.value}
      disabled={item.disabled}
      className="koi-accordion-item border-b border-border last:border-b-0"
    >
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          className={cn(
            'koi-accordion-trigger group flex flex-1 items-center gap-2 py-4 text-left font-medium transition-colors',
            'hover:text-primary focus-visible:outline-none focus-visible:text-primary',
            'disabled:pointer-events-none disabled:opacity-60 [&[data-state=open]>svg.koi-chevron]:rotate-180',
          )}
        >
          {item.icon && <item.icon className="size-4 shrink-0" aria-hidden />}
          <span className="flex-1">{item.header}</span>
          <ChevronDown className="koi-chevron size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="koi-accordion-content overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="pb-4">{item.content}</div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  ))

  const common = { className: cn('koi-accordion w-full', className) }

  if (multiple) {
    return (
      <AccordionPrimitive.Root
        type="multiple"
        value={value as string[] | undefined}
        defaultValue={defaultValue as string[] | undefined}
        onValueChange={(v) => onChange?.(v)}
        {...common}
      >
        {body}
      </AccordionPrimitive.Root>
    )
  }

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      value={value as string | undefined}
      defaultValue={defaultValue as string | undefined}
      onValueChange={(v) => onChange?.(v)}
      {...common}
    >
      {body}
    </AccordionPrimitive.Root>
  )
}
