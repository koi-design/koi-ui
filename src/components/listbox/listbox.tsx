import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ListboxOption {
  label: React.ReactNode
  value: string
  disabled?: boolean
}

interface BaseProps {
  options: ListboxOption[]
  filter?: boolean
  className?: string
  /** Max height of the scroll area. */
  listClassName?: string
}
type SingleProps = BaseProps & {
  multiple?: false
  value?: string
  onChange?: (value: string) => void
}
type MultipleProps = BaseProps & {
  multiple: true
  value?: string[]
  onChange?: (value: string[]) => void
}

export type ListboxProps = SingleProps | MultipleProps

/**
 * Listbox — inline selectable list (single or multiple), with optional filter.
 *
 * @example
 * <Listbox options={opts} value={v} onChange={setV} filter />
 * <Listbox multiple options={opts} value={arr} onChange={setArr} />
 */
export function Listbox(props: ListboxProps) {
  const { options, filter, className, listClassName } = props
  const [query, setQuery] = React.useState('')
  const shown = filter
    ? options.filter((o) =>
        String(o.label).toLowerCase().includes(query.toLowerCase()),
      )
    : options

  const isSelected = (v: string) =>
    props.multiple ? (props.value ?? []).includes(v) : props.value === v

  const select = (v: string) => {
    if (props.multiple) {
      const cur = props.value ?? []
      props.onChange?.(cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v])
    } else {
      props.onChange?.(v)
    }
  }

  return (
    <div className={cn('koi-listbox overflow-hidden rounded-md border border-border bg-background', className)}>
      {filter && (
        <div className="border-b border-border p-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="h-8 w-full rounded border border-input bg-transparent px-2 text-sm outline-none focus:border-primary"
          />
        </div>
      )}
      <div className={cn('max-h-60 overflow-y-auto p-1', listClassName)}>
        {shown.map((o) => {
          const sel = isSelected(o.value)
          return (
            <button
              type="button"
              key={o.value}
              disabled={o.disabled}
              onClick={() => select(o.value)}
              className={cn(
                'flex w-full items-center justify-between gap-2 rounded-sm px-3 py-2 text-left text-sm outline-none transition-colors',
                'disabled:pointer-events-none disabled:opacity-60',
                sel ? 'bg-primary/10 text-primary' : 'hover:bg-muted',
              )}
            >
              <span>{o.label}</span>
              {sel && <Check className="size-4" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
