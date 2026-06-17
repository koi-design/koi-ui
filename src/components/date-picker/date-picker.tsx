import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { DayPicker, type DayPickerProps } from 'react-day-picker'
import { format as formatDate } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  /** date-fns format string for the displayed value. */
  format?: string
  placeholder?: string
  size?: 'small' | 'normal' | 'large'
  disabled?: boolean
  invalid?: boolean
  className?: string
  /** Disable days (passed through to react-day-picker). */
  disabledDays?: DayPickerProps['disabled']
}

const triggerSizes = {
  small: 'h-9 px-2.5 text-sm',
  normal: 'h-11 px-3 text-base',
  large: 'h-[3.25rem] px-4 text-lg',
}

const dayPickerClassNames = {
  months: 'relative',
  month_caption: 'flex h-9 items-center justify-center font-medium',
  caption_label: 'text-sm',
  nav: 'absolute inset-x-0 top-0 flex h-9 items-center justify-between px-1',
  button_previous: 'inline-flex size-7 items-center justify-center rounded-md hover:bg-muted',
  button_next: 'inline-flex size-7 items-center justify-center rounded-md hover:bg-muted',
  month_grid: 'w-full border-collapse',
  weekdays: 'flex',
  weekday: 'w-9 text-xs font-normal text-muted-foreground',
  week: 'flex w-full',
  day: 'size-9 p-0 text-center text-sm',
  day_button:
    'inline-flex size-9 items-center justify-center rounded-md hover:bg-muted aria-selected:bg-primary aria-selected:text-primary-foreground aria-selected:hover:bg-primary',
  today: 'font-semibold text-primary aria-selected:text-primary-foreground',
  outside: 'text-muted-foreground/50',
  disabled: 'text-muted-foreground/40 line-through',
  hidden: 'invisible',
}

function Chevron({ orientation }: { orientation?: 'left' | 'right' | 'up' | 'down' }) {
  return orientation === 'left' ? (
    <ChevronLeft className="size-4" />
  ) : (
    <ChevronRight className="size-4" />
  )
}

/**
 * DatePicker — date field with a popover calendar.
 *
 * @example
 * <DatePicker value={d} onChange={setD} />
 */
export function DatePicker({
  value,
  onChange,
  format = 'yyyy-MM-dd',
  placeholder = 'Select date',
  size = 'normal',
  disabled,
  invalid,
  className,
  disabledDays,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          'koi-datepicker inline-flex w-full items-center justify-between gap-2 rounded-md border bg-background text-left transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring/30',
          'disabled:pointer-events-none disabled:opacity-60',
          invalid ? 'border-danger' : 'border-input hover:border-primary',
          triggerSizes[size],
          className,
        )}
      >
        <span className={cn(!value && 'text-muted-foreground')}>
          {value ? formatDate(value, format) : placeholder}
        </span>
        <CalendarIcon className="size-4 shrink-0 opacity-60" />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className={cn(
            'koi-datepicker-panel z-50 rounded-md border border-border bg-background p-3 shadow-md',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          )}
        >
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(d) => {
              onChange?.(d)
              setOpen(false)
            }}
            disabled={disabledDays}
            showOutsideDays
            classNames={dayPickerClassNames}
            components={{ Chevron }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
