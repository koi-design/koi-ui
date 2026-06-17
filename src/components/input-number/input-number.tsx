import * as React from 'react'
import { ChevronUp, ChevronDown, Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InputNumberProps {
  /** Controlled numeric value (null when empty). */
  value?: number | null
  onChange?: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  /** Number of fraction digits to display. */
  fractionDigits?: number
  mode?: 'decimal' | 'currency'
  currency?: string
  locale?: string
  prefix?: string
  suffix?: string
  /** Show increment/decrement buttons. */
  showButtons?: boolean
  buttonLayout?: 'stacked' | 'horizontal'
  size?: 'small' | 'normal' | 'large'
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
  name?: string
}

const sizes = {
  small: 'h-9 px-2.5 text-sm',
  normal: 'h-11 px-3 text-base',
  large: 'h-[3.25rem] px-4 text-lg',
}

function clamp(n: number, min?: number, max?: number) {
  if (min != null && n < min) return min
  if (max != null && n > max) return max
  return n
}

/**
 * InputNumber — numeric field with steppers and formatting.
 *
 * @example
 * <InputNumber value={qty} onChange={setQty} min={0} showButtons />
 * <InputNumber value={price} onChange={setPrice} mode="currency" currency="USD" />
 */
export function InputNumber({
  value,
  onChange,
  min,
  max,
  step = 1,
  fractionDigits,
  mode = 'decimal',
  currency = 'USD',
  locale,
  prefix,
  suffix,
  showButtons,
  buttonLayout = 'stacked',
  size = 'normal',
  placeholder,
  disabled,
  invalid,
  className,
  name,
}: InputNumberProps) {
  const [focused, setFocused] = React.useState(false)
  const [draft, setDraft] = React.useState('')

  const format = React.useCallback(
    (n: number) => {
      const fmt = new Intl.NumberFormat(locale, {
        style: mode === 'currency' ? 'currency' : 'decimal',
        currency: mode === 'currency' ? currency : undefined,
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits ?? (mode === 'currency' ? 2 : 20),
      })
      return `${prefix ?? ''}${fmt.format(n)}${suffix ?? ''}`
    },
    [locale, mode, currency, fractionDigits, prefix, suffix],
  )

  const display = focused ? draft : value == null ? '' : format(value)

  const commit = (raw: string) => {
    const cleaned = raw.replace(/[^0-9.-]/g, '')
    if (cleaned === '' || cleaned === '-') return onChange?.(null)
    const parsed = Number(cleaned)
    if (!Number.isNaN(parsed)) onChange?.(clamp(parsed, min, max))
  }

  const stepBy = (dir: 1 | -1) => {
    const next = clamp((value ?? 0) + dir * step, min, max)
    onChange?.(next)
  }

  const Stepper = ({ dir, icon: Icon }: { dir: 1 | -1; icon: typeof Plus }) => (
    <button
      type="button"
      tabIndex={-1}
      disabled={disabled}
      onClick={() => stepBy(dir)}
      className="flex flex-1 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-60"
    >
      <Icon className="size-4" />
    </button>
  )

  const field = (
    <input
      type="text"
      inputMode="decimal"
      name={name}
      value={display}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      onFocus={() => {
        setFocused(true)
        setDraft(value == null ? '' : String(value))
      }}
      onBlur={(e) => {
        setFocused(false)
        commit(e.target.value)
      }}
      onChange={(e) => setDraft(e.target.value)}
      className={cn('koi-input w-full bg-transparent outline-none', sizes[size])}
    />
  )

  return (
    <div
      className={cn(
        'koi-inputnumber inline-flex w-full items-stretch overflow-hidden rounded-md border bg-background transition-colors',
        'focus-within:ring-2 focus-within:ring-ring/30',
        invalid ? 'border-danger' : 'border-input focus-within:border-primary',
        disabled && 'opacity-60',
        className,
      )}
    >
      {showButtons && buttonLayout === 'horizontal' && (
        <div className="flex w-10 shrink-0 border-r border-input">
          <Stepper dir={-1} icon={Minus} />
        </div>
      )}
      {field}
      {showButtons && buttonLayout === 'horizontal' && (
        <div className="flex w-10 shrink-0 border-l border-input">
          <Stepper dir={1} icon={Plus} />
        </div>
      )}
      {showButtons && buttonLayout === 'stacked' && (
        <div className="flex w-9 shrink-0 flex-col border-l border-input">
          <Stepper dir={1} icon={ChevronUp} />
          <span className="h-px bg-input" />
          <Stepper dir={-1} icon={ChevronDown} />
        </div>
      )}
    </div>
  )
}
