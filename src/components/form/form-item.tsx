import * as React from 'react'
import { cn } from '@/lib/utils'
import { useFormContext, type Rule, type ValidateStatus, type ValidateTrigger } from './form-context'

export interface FormItemProps {
  /** Field name; binds the child control to the form store. Omit for layout-only. */
  name?: string
  label?: React.ReactNode
  required?: boolean
  rules?: Rule[]
  /** Helper text below the field; replaced by the error message when invalid. */
  help?: React.ReactNode
  /** Extra hint text, always shown below help. */
  extra?: React.ReactNode
  /** Force a validation status (when not using rules). */
  validateStatus?: ValidateStatus
  /** Prop name the child uses for its value (e.g. 'checked'). */
  valuePropName?: string
  /** Event name that reports changes. */
  trigger?: string
  /** Override the form's validateTrigger for this field. */
  validateTrigger?: ValidateTrigger | ValidateTrigger[]
  /** Extract the value from the trigger's argument. */
  getValueFromEvent?: (arg: unknown) => unknown
  children: React.ReactElement
  className?: string
  labelClassName?: string
}

function defaultGetValue(arg: unknown): unknown {
  if (arg && typeof arg === 'object' && 'target' in arg) {
    const t = (arg as { target: HTMLInputElement }).target
    return t.type === 'checkbox' ? t.checked : t.value
  }
  return arg
}

/**
 * FormItem — labels, binds, and validates a single control inside a <Form>.
 *
 * @example
 * <FormItem name="email" label="Email" rules={[{ required: true, message: 'Required' }]}>
 *   <Input />
 * </FormItem>
 */
export function FormItem({
  name,
  label,
  required,
  rules,
  help,
  extra,
  validateStatus,
  valuePropName = 'value',
  trigger = 'onChange',
  validateTrigger,
  getValueFromEvent = defaultGetValue,
  children,
  className,
  labelClassName,
}: FormItemProps) {
  const ctx = useFormContext()

  React.useEffect(() => {
    if (ctx && name && rules) {
      ctx.registerField(name, rules)
      return () => ctx.unregisterField(name)
    }
  }, [ctx, name, rules])

  const error = ctx && name ? ctx.errors[name] : undefined
  const status = error?.status ?? validateStatus
  const isRequired = required ?? rules?.some((r) => r.required) ?? false
  const horizontal = ctx?.layout === 'horizontal'

  // Has the user interacted with this field yet? Used to gate onBlur validation.
  const dirtyRef = React.useRef(false)
  const currentValueRef = React.useRef<unknown>(ctx && name ? ctx.values[name] : undefined)
  currentValueRef.current = ctx && name ? ctx.values[name] : undefined
  const triggers = validateTrigger
    ? Array.isArray(validateTrigger)
      ? validateTrigger
      : [validateTrigger]
    : ctx?.validateTrigger ?? []

  let control = children
  if (ctx && name) {
    const childProps = children.props as Record<string, unknown>
    control = React.cloneElement(children, {
      // Keep controls controlled: empty string for value-based inputs,
      // false for boolean props (e.g. checked) so reset clears them.
      [valuePropName]: ctx.values[name] ?? (valuePropName === 'value' ? '' : false),
      invalid: status === 'error' || undefined,
      [trigger]: (arg: unknown) => {
        dirtyRef.current = true
        const value = getValueFromEvent(arg)
        currentValueRef.current = value
        ctx.setValue(name, value)
        if (triggers.includes('onChange')) ctx.validateField(name, value)
        ;(childProps[trigger] as ((arg: unknown) => void) | undefined)?.(arg)
      },
      onBlur: (e: React.FocusEvent) => {
        if (dirtyRef.current && triggers.includes('onBlur')) ctx.validateField(name, currentValueRef.current)
        ;(childProps.onBlur as ((e: React.FocusEvent) => void) | undefined)?.(e)
      },
    } as Record<string, unknown>)
  }

  const labelNode = label != null && (
    <label
      className={cn(
        'koi-form-label text-sm font-medium text-foreground',
        horizontal
          ? 'flex min-h-[2.75rem] items-center justify-end text-right'
          : 'mb-1.5 block',
        labelClassName,
      )}
      style={horizontal && ctx?.labelWidth ? { width: ctx.labelWidth } : undefined}
    >
      {isRequired && <span className="mr-1 text-danger">*</span>}
      {label}
      {ctx?.colon && '：'}
    </label>
  )

  const helpNode = (status === 'error' && error?.message) || help
  const helpColor =
    status === 'error' ? 'text-danger' : status === 'warning' ? 'text-warning' : 'text-muted-foreground'
  // Bound fields reserve a constant-height message row so showing/hiding the
  // error doesn't change the item's height (no layout shift / jitter).
  const isBound = !!(ctx && name)
  const showMessageRow = isBound || helpNode != null || extra != null

  return (
    <div
      className={cn(
        'koi-form-item',
        horizontal && 'flex items-start gap-3',
        ctx?.layout === 'inline' ? 'mb-0' : showMessageRow ? 'mb-2' : 'mb-6',
        className,
      )}
    >
      {horizontal && labelNode}
      <div className="min-w-0 flex-1">
        {!horizontal && labelNode}
        {horizontal ? (
          <div className="flex min-h-[2.75rem] items-center">{control}</div>
        ) : (
          control
        )}
        {showMessageRow && (
          <div className="mt-1 min-h-[1.25rem] text-xs leading-5">
            {helpNode != null && <div className={helpColor}>{helpNode}</div>}
            {extra != null && <div className="text-muted-foreground">{extra}</div>}
          </div>
        )}
      </div>
    </div>
  )
}
