import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { inputVariants } from '../input/input'

export interface AutoCompleteProps {
  /** Controlled input text. */
  value?: string
  /** Fires with the current text as the user types or picks a suggestion. */
  onChange?: (value: string) => void
  /** Suggestions to show in the panel. */
  suggestions?: string[]
  /**
   * Called whenever the query changes — populate `suggestions` in response
   * (e.g. async/remote search). When omitted, `suggestions` are filtered
   * locally against the query (case-insensitive substring match).
   */
  onComplete?: (query: string) => void
  /** Fires when a suggestion is chosen. */
  onSelect?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  inputSize?: 'small' | 'normal' | 'large'
  /** Show a dropdown toggle button that reveals every suggestion. */
  dropdown?: boolean
  /** Minimum characters typed before the panel opens. */
  minLength?: number
  emptyMessage?: React.ReactNode
  className?: string
  name?: string
}

/**
 * AutoComplete — a text input with a floating suggestion panel.
 *
 * Type to filter `suggestions`; click or use ↑/↓ + Enter to pick one. Provide
 * `onComplete` to drive suggestions yourself (remote search); otherwise they
 * are filtered locally. The panel renders in a portal so it is never clipped
 * by an `overflow-hidden` ancestor.
 *
 * @example
 * <AutoComplete value={q} onChange={setQ} suggestions={cities} dropdown />
 */
export function AutoComplete({
  value,
  onChange,
  suggestions = [],
  onComplete,
  onSelect,
  placeholder,
  disabled,
  invalid,
  inputSize,
  dropdown,
  minLength = 1,
  emptyMessage = 'No results found.',
  className,
  name,
}: AutoCompleteProps) {
  const [inner, setInner] = React.useState('')
  const query = value ?? inner
  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState(-1)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const anchorRef = React.useRef<HTMLDivElement>(null)

  // When the parent drives suggestions (onComplete), trust them as-is.
  // Otherwise filter locally so the component is useful out of the box.
  const items = React.useMemo(() => {
    if (onComplete) return suggestions
    const q = query.trim().toLowerCase()
    if (!q) return suggestions
    return suggestions.filter((s) => s.toLowerCase().includes(q))
  }, [suggestions, query, onComplete])

  const setQuery = (q: string) => {
    if (value == null) setInner(q)
    onChange?.(q)
    onComplete?.(q)
  }

  const choose = (s: string) => {
    if (value == null) setInner(s)
    onChange?.(s)
    onSelect?.(s)
    setOpen(false)
    setActive(-1)
    inputRef.current?.focus()
  }

  const close = () => {
    setOpen(false)
    setActive(-1)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) return setOpen(true)
      setActive((i) => Math.min(items.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') {
      if (open && active >= 0 && items[active] != null) {
        e.preventDefault()
        choose(items[active])
      }
    } else if (e.key === 'Escape') {
      close()
    }
  }

  const panelOpen = open && (items.length > 0 || emptyMessage != null)

  return (
    <PopoverPrimitive.Root open={panelOpen} onOpenChange={(o) => !o && close()}>
      <PopoverPrimitive.Anchor asChild>
        <div
          ref={anchorRef}
          className={cn('koi-autocomplete relative inline-flex w-full items-center', className)}
        >
          <input
            ref={inputRef}
            type="text"
            name={name}
            role="combobox"
            aria-expanded={panelOpen}
            aria-autocomplete="list"
            autoComplete="off"
            value={query}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            onChange={(e) => {
              const v = e.target.value
              setQuery(v)
              setOpen(v.length >= minLength)
              setActive(-1)
            }}
            onFocus={() => {
              if (query.length >= minLength && items.length > 0) setOpen(true)
            }}
            onKeyDown={onKeyDown}
            className={cn(inputVariants({ inputSize, invalid }), dropdown && 'pr-10')}
          />
          {dropdown && (
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled}
              aria-label="Show suggestions"
              // Keep focus on the input so the panel's dismiss logic stays predictable.
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setActive(-1)
                setOpen((o) => !o)
                inputRef.current?.focus()
              }}
              className="absolute right-0 inline-flex h-full w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none"
            >
              <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
            </button>
          )}
        </div>
      </PopoverPrimitive.Anchor>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          // Don't move focus into the panel — the input keeps it so typing continues.
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          // Clicking the input/anchor counts as "outside" the panel — don't let
          // that close it; the input drives open/close itself.
          onInteractOutside={(e) => {
            if (anchorRef.current?.contains(e.target as Node)) e.preventDefault()
          }}
          className={cn(
            'koi-autocomplete-panel z-50 max-h-60 w-[var(--radix-popover-trigger-width)] overflow-y-auto',
            'rounded-md border border-border bg-background p-1 text-foreground shadow-md',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          )}
        >
          {items.length === 0 ? (
            <div className="px-2 py-6 text-center text-sm text-muted-foreground">{emptyMessage}</div>
          ) : (
            items.map((item, i) => (
              <button
                key={`${item}-${i}`}
                type="button"
                // preventDefault keeps input focus; the click still selects.
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(item)}
                className={cn(
                  'koi-autocomplete-item flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-2 text-left text-sm outline-none',
                  i === active && 'bg-muted',
                )}
              >
                {item}
              </button>
            ))
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
