import * as React from 'react'
import { cn } from '@/lib/utils'
import { useFormContext, type Rule, type ValidateStatus } from './form-context'

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

  let control = children
  if (ctx && name) {
    const childProps = children.props as Record<string, unknown>
    control = React.cloneElement(children, {
      [valuePropName]: ctx.values[name] ?? (valuePropName === 'value' ? '' : undefined),
      invalid: status === 'error' || undefined,
      [trigger]: (arg: unknown) => {
        ctx.setValue(name, getValueFromEvent(arg))
        ;(childProps[trigger] as ((arg: unknown) => void) | undefined)?.(arg)
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

  return (
    <div
      className={cn(
        'koi-form-item',
        horizontal && 'flex gap-3',
        ctx?.layout === 'inline' ? 'mb-0' : 'mb-6',
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
        {helpNode != null && <div className={cn('mt-1 text-xs', helpColor)}>{helpNode}</div>}
        {extra != null && <div className="mt-1 text-xs text-muted-foreground">{extra}</div>}
      </div>
    </div>
  )
}
