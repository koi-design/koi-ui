import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  label: React.ReactNode
  value: string
  disabled?: boolean
}

export interface SelectProps {
  /** Options to choose from. */
  options: SelectOption[]
  /** Controlled selected value. */
  value?: string
  /** Fires with the selected value. */
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  size?: 'small' | 'normal' | 'large'
  className?: string
  /** Width of the popover content; defaults to the trigger width. */
  contentClassName?: string
  name?: string
}

const triggerSizes = {
  small: 'h-9 px-2.5 text-sm',
  normal: 'h-11 px-3 text-base',
  large: 'h-[3.25rem] px-4 text-lg',
}

/**
 * Select — prop-driven dropdown.
 *
 * @example
 * <Select options={cities} value={v} onChange={setV} placeholder="Pick a city" />
 */
export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select',
  disabled,
  invalid,
  size = 'normal',
  className,
  contentClassName,
  name,
}: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange} disabled={disabled} name={name}>
      <SelectPrimitive.Trigger
        aria-invalid={invalid || undefined}
        className={cn(
          'koi-select inline-flex w-full items-center justify-between gap-2 rounded-md border bg-background text-foreground transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary',
          'data-[placeholder]:text-muted-foreground',
          'disabled:pointer-events-none disabled:opacity-60',
          invalid ? 'border-danger' : 'border-input hover:border-primary',
          triggerSizes[size],
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="size-4 opacity-60" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className={cn(
            'koi-select-content z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-border bg-background text-foreground shadow-md',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            contentClassName,
          )}
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className={cn(
                  'koi-select-item relative flex cursor-pointer select-none items-center rounded-sm py-2 pl-3 pr-8 text-sm outline-none',
                  'focus:bg-muted data-[state=checked]:font-medium',
                  'data-[disabled]:pointer-events-none data-[disabled]:opacity-60',
                )}
              >
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-2 inline-flex items-center">
                  <Check className="size-4 text-primary" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
