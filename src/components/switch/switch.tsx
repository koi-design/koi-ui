import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

export interface SwitchProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    'checked' | 'onCheckedChange' | 'onChange'
  > {
  /** Controlled on/off state. */
  checked?: boolean
  /** Fires with the next boolean state. */
  onChange?: (checked: boolean) => void
  /** Inline label rendered next to the switch. */
  label?: React.ReactNode
}

/** Switch — prop-driven on/off toggle. */
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(function Switch({ checked, onChange, label, className, id, ...props }, ref) {
  const autoId = React.useId()
  const inputId = id ?? autoId

  const control = (
    <SwitchPrimitive.Root
      ref={ref}
      id={inputId}
      checked={checked}
      onCheckedChange={(v) => onChange?.(v)}
      className={cn(
        'koi-switch peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-60',
        'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block size-5 rounded-full bg-background shadow-sm ring-0 transition-transform duration-200 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
    </SwitchPrimitive.Root>
  )

  if (!label) return control

  return (
    <div className="inline-flex items-center gap-2">
      {control}
      <label htmlFor={inputId} className="cursor-pointer select-none text-sm leading-none">
        {label}
      </label>
    </div>
  )
})
