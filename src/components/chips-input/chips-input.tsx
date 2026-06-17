import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChipsInputProps {
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  /** Max number of chips allowed. */
  max?: number
  /** Keys that commit the current text (besides Enter). */
  separators?: string[]
  /** Prevent duplicate values. */
  allowDuplicate?: boolean
  disabled?: boolean
  invalid?: boolean
  className?: string
}

/**
 * ChipsInput — enter multiple values as removable chips.
 *
 * @example
 * <ChipsInput value={tags} onChange={setTags} placeholder="Add tag…" />
 */
export function ChipsInput({
  value = [],
  onChange,
  placeholder,
  max,
  separators = [','],
  allowDuplicate,
  disabled,
  invalid,
  className,
}: ChipsInputProps) {
  const [draft, setDraft] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const add = (raw: string) => {
    const v = raw.trim()
    if (!v) return
    if (max != null && value.length >= max) return
    if (!allowDuplicate && value.includes(v)) return
    onChange?.([...value, v])
    setDraft('')
  }

  const removeAt = (i: number) => onChange?.(value.filter((_, idx) => idx !== i))

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || separators.includes(e.key)) {
      e.preventDefault()
      add(draft)
    } else if (e.key === 'Backspace' && !draft && value.length) {
      removeAt(value.length - 1)
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn(
        'koi-chips flex min-h-11 w-full flex-wrap items-center gap-1.5 rounded-md border bg-background px-2 py-1.5 transition-colors',
        'focus-within:ring-2 focus-within:ring-ring/30',
        invalid ? 'border-danger' : 'border-input focus-within:border-primary',
        disabled && 'pointer-events-none opacity-60',
        className,
      )}
    >
      {value.map((chip, i) => (
        <span
          key={`${chip}-${i}`}
          className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-sm"
        >
          {chip}
          <button
            type="button"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation()
              removeAt(i)
            }}
            className="text-muted-foreground hover:text-danger"
            aria-label={`Remove ${chip}`}
          >
            <X className="size-3" />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={draft}
        disabled={disabled}
        placeholder={value.length ? '' : placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => add(draft)}
        className="h-7 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  )
}
