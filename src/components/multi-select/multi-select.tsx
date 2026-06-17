import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Check, ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MultiSelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  /** Show a search box in the panel. */
  filter?: boolean
  /** How selected items appear in the trigger. */
  display?: 'comma' | 'chip'
  /** Collapse to "n selected" past this count (comma mode). */
  maxLabels?: number
  size?: 'small' | 'normal' | 'large'
  disabled?: boolean
  invalid?: boolean
  className?: string
}

const triggerSizes = {
  small: 'min-h-9 px-2.5 text-sm',
  normal: 'min-h-11 px-3 text-base',
  large: 'min-h-[3.25rem] px-4 text-lg',
}

/**
 * MultiSelect — multiple choice dropdown with optional filter.
 *
 * @example
 * <MultiSelect options={opts} value={vals} onChange={setVals} filter display="chip" />
 */
export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = 'Select',
  filter,
  display = 'comma',
  maxLabels = 3,
  size = 'normal',
  disabled,
  invalid,
  className,
}: MultiSelectProps) {
  const [query, setQuery] = React.useState('')
  const selected = options.filter((o) => value.includes(o.value))
  const shown = filter
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options

  const toggle = (v: string) =>
    onChange?.(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])

  const renderValue = () => {
    if (selected.length === 0) return <span className="text-muted-foreground">{placeholder}</span>
    if (display === 'chip') {
      return (
        <span className="flex flex-wrap gap-1">
          {selected.map((o) => (
            <span
              key={o.value}
              className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs"
            >
              {o.label}
              <X
                className="size-3 cursor-pointer hover:text-danger"
                onClick={(e) => {
                  e.stopPropagation()
                  toggle(o.value)
                }}
              />
            </span>
          ))}
        </span>
      )
    }
    if (selected.length > maxLabels) return `${selected.length} selected`
    return selected.map((o) => o.label).join(', ')
  }

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          'koi-multiselect flex w-full items-center justify-between gap-2 rounded-md border bg-background py-1.5 text-left transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring/30',
          'disabled:pointer-events-none disabled:opacity-60',
          invalid ? 'border-danger' : 'border-input hover:border-primary',
          triggerSizes[size],
          className,
        )}
      >
        <span className="flex-1 overflow-hidden">{renderValue()}</span>
        <ChevronDown className="size-4 shrink-0 opacity-60" />
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className={cn(
            'koi-multiselect-panel z-50 max-h-72 w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-md border border-border bg-background shadow-md',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          )}
        >
          {filter && (
            <div className="border-b border-border p-2">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="h-8 w-full rounded border border-input bg-transparent px-2 text-sm outline-none focus:border-primary"
              />
            </div>
          )}
          <div className="max-h-56 overflow-y-auto p-1">
            {shown.length === 0 && (
              <div className="px-2 py-4 text-center text-sm text-muted-foreground">No results</div>
            )}
            {shown.map((o) => {
              const isSel = value.includes(o.value)
              return (
                <button
                  type="button"
                  key={o.value}
                  disabled={o.disabled}
                  onClick={() => toggle(o.value)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm outline-none',
                    'hover:bg-muted disabled:pointer-events-none disabled:opacity-60',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-4 items-center justify-center rounded border',
                      isSel ? 'border-primary bg-primary text-primary-foreground' : 'border-input',
                    )}
                  >
                    {isSel && <Check className="size-3" />}
                  </span>
                  {o.label}
                </button>
              )
            })}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
