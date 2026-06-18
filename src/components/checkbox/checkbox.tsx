import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    'checked' | 'onCheckedChange' | 'onChange'
  > {
  /** Controlled checked state. */
  checked?: boolean
  /** Render the indeterminate (mixed) state. */
  indeterminate?: boolean
  /** Fires with the next boolean state. */
  onChange?: (checked: boolean) => void
  /** Inline label rendered next to the box. */
  label?: React.ReactNode
  /** Apply the error style. */
  invalid?: boolean
}

/** Checkbox — prop-driven, supports an indeterminate state. */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(function Checkbox({ checked, indeterminate, onChange, label, invalid, className, id, ...props }, ref) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const state = indeterminate ? 'indeterminate' : checked

  const box = (
    <CheckboxPrimitive.Root
      ref={ref}
      id={inputId}
      checked={state}
      onCheckedChange={(v) => onChange?.(v === true)}
      className={cn(
        'koi-checkbox peer size-5 shrink-0 rounded border transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
        'disabled:pointer-events-none disabled:opacity-60',
        'data-[state=unchecked]:border-input data-[state=unchecked]:bg-background',
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        'data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
        invalid && 'border-danger',
        className,
      )}
      {...props}
    >
      {/* forceMount keeps the icon slot in the box at every state, so toggling
          never changes the box's baseline and the row can't shift height. */}
      <CheckboxPrimitive.Indicator forceMount className="flex items-center justify-center">
        {indeterminate ? (
          <Minus className="size-4" />
        ) : (
          <Check className={cn('size-4 transition-opacity', state === true ? 'opacity-100' : 'opacity-0')} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  if (!label) return box

  return (
    <div className="inline-flex items-center gap-2">
      {box}
      <label htmlFor={inputId} className="cursor-pointer select-none text-sm leading-none">
        {label}
      </label>
    </div>
  )
})
