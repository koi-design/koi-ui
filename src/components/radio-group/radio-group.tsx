import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'

export interface RadioOption {
  label: React.ReactNode
  value: string
  disabled?: boolean
}

export interface RadioGroupProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    'value' | 'onValueChange' | 'onChange' | 'dir'
  > {
  /** Options to render. */
  options: RadioOption[]
  /** Controlled selected value. */
  value?: string
  /** Fires with the newly selected value. */
  onChange?: (value: string) => void
  /** Layout direction of the options. */
  orientation?: 'horizontal' | 'vertical'
  /** Apply the error style. */
  invalid?: boolean
}

/** RadioGroup — prop-driven, options based single selection. */
export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(function RadioGroup(
  { options, value, onChange, orientation = 'vertical', invalid, className, ...props },
  ref,
) {
  const groupId = React.useId()

  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      value={value}
      onValueChange={(v) => onChange?.(v)}
      className={cn(
        'koi-radiogroup flex gap-3',
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap items-center',
        className,
      )}
      {...props}
    >
      {options.map((opt) => {
        const itemId = `${groupId}-${opt.value}`
        return (
          <div key={opt.value} className="inline-flex items-center gap-2">
            <RadioGroupPrimitive.Item
              id={itemId}
              value={opt.value}
              disabled={opt.disabled}
              className={cn(
                'koi-radio aspect-square size-5 rounded-full border transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
                'disabled:pointer-events-none disabled:opacity-60',
                'border-input data-[state=checked]:border-primary',
                invalid && 'border-danger',
              )}
            >
              <RadioGroupPrimitive.Indicator className="flex items-center justify-center after:block after:size-2.5 after:rounded-full after:bg-primary" />
            </RadioGroupPrimitive.Item>
            <label htmlFor={itemId} className="cursor-pointer select-none text-sm leading-none">
              {opt.label}
            </label>
          </div>
        )
      })}
    </RadioGroupPrimitive.Root>
  )
})
