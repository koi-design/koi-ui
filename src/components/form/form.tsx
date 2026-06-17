import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  FormContext,
  type FormContextValue,
  type FormLayout,
  type FieldError,
  type Rule,
} from './form-context'
import type { FormInstance, FormInstanceInternal } from './use-form'

export interface FormProps<T = Record<string, unknown>>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form?: FormInstance<T>
  layout?: FormLayout
  size?: 'small' | 'normal' | 'large'
  initialValues?: Partial<T>
  colon?: boolean
  requiredMark?: boolean
  /** Width of labels in horizontal layout. */
  labelWidth?: number | string
  onFinish?: (values: T) => void
  onFinishFailed?: (errors: Record<string, FieldError>) => void
}

/**
 * Form — antd-style form container with layout + validation.
 *
 * @example
 * const form = useForm()
 * <Form form={form} layout="vertical" onFinish={save}>
 *   <FormItem name="email" label="Email" rules={[{ required: true }]}><Input /></FormItem>
 *   <Button label="Submit" onClick={() => form.submit()} />
 * </Form>
 */
export function Form<T = Record<string, unknown>>({
  form,
  layout = 'vertical',
  size,
  initialValues,
  colon = false,
  requiredMark = true,
  labelWidth,
  onFinish,
  onFinishFailed,
  className,
  children,
  ...props
}: FormProps<T>) {
  const [values, setValues] = React.useState<Record<string, unknown>>(
    (initialValues as Record<string, unknown>) ?? {},
  )
  const [errors, setErrors] = React.useState<Record<string, FieldError>>({})
  const rulesRef = React.useRef<Record<string, Rule[]>>({})

  // connect the external instance (from useForm) to this form's store
  const valuesRef = React.useRef(values)
  valuesRef.current = values
  React.useMemo(() => {
    const internal = form as FormInstanceInternal<T> | undefined
    internal?.__attach?.({
      getStore: () => valuesRef.current,
      setStore: (v) => setValues(v),
      setErrors,
      getRules: () => rulesRef.current,
      onFinish,
      onFinishFailed,
    })
  }, [form, onFinish, onFinishFailed])

  const ctx: FormContextValue = {
    layout,
    size,
    colon,
    requiredMark,
    labelWidth,
    values,
    errors,
    setValue: (name, value) => {
      setValues((prev) => ({ ...prev, [name]: value }))
      setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined as never } : prev))
    },
    registerField: (name, fieldRules) => {
      if (fieldRules) rulesRef.current[name] = fieldRules
    },
    unregisterField: (name) => {
      delete rulesRef.current[name]
    },
  }

  return (
    <FormContext.Provider value={ctx}>
      <form
        className={cn('koi-form', layout === 'inline' && 'flex flex-wrap items-start gap-4', className)}
        onSubmit={(e) => {
          e.preventDefault()
          ;(form as FormInstanceInternal<T> | undefined)?.submit?.()
        }}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}
