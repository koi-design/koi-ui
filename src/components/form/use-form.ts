import * as React from 'react'
import type { Rule, FieldError } from './form-context'

export interface FormInstance<T = Record<string, unknown>> {
  getFieldValue: (name: string) => unknown
  getFieldsValue: () => T
  setFieldValue: (name: string, value: unknown) => void
  setFieldsValue: (values: Partial<T>) => void
  resetFields: () => void
  /** Validate all registered fields; resolves with values or rejects with errors. */
  validateFields: () => Promise<T>
  submit: () => void
}

/** Internal connection between a Form and its instance. */
export interface FormInstanceInternal<T = Record<string, unknown>> extends FormInstance<T> {
  __attach: (api: {
    getStore: () => Record<string, unknown>
    setStore: (values: Record<string, unknown>) => void
    setErrors: (errors: Record<string, FieldError>) => void
    getRules: () => Record<string, Rule[]>
    onFinish?: (values: T) => void
    onFinishFailed?: (errors: Record<string, FieldError>) => void
  }) => void
}

export async function runRules(value: unknown, rules: Rule[]): Promise<string | undefined> {
  for (const rule of rules) {
    if (rule.required) {
      const empty =
        value == null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      if (empty) return rule.message ?? 'This field is required'
    }
    if (value == null || value === '') continue
    if (typeof value === 'string' || Array.isArray(value)) {
      if (rule.min != null && value.length < rule.min) return rule.message ?? `Min length ${rule.min}`
      if (rule.max != null && value.length > rule.max) return rule.message ?? `Max length ${rule.max}`
    }
    if (typeof value === 'number') {
      if (rule.min != null && value < rule.min) return rule.message ?? `Min ${rule.min}`
      if (rule.max != null && value > rule.max) return rule.message ?? `Max ${rule.max}`
    }
    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      return rule.message ?? 'Invalid format'
    }
    if (rule.validator) {
      const msg = await rule.validator(value)
      if (msg) return msg
    }
  }
  return undefined
}

/**
 * useForm — create a form instance to control a <Form> imperatively.
 *
 * @example
 * const form = useForm()
 * <Form form={form} onFinish={(v) => console.log(v)}>…</Form>
 * form.validateFields().then(console.log)
 */
export function useForm<T = Record<string, unknown>>(): FormInstance<T> {
  const ref = React.useRef<FormInstance<T>>()
  if (!ref.current) {
    let api: Parameters<FormInstanceInternal<T>['__attach']>[0] | null = null

    const instance: FormInstanceInternal<T> = {
      __attach: (a) => {
        api = a
      },
      getFieldValue: (name) => api?.getStore()[name],
      getFieldsValue: () => (api?.getStore() ?? {}) as T,
      setFieldValue: (name, value) => {
        if (!api) return
        api.setStore({ ...api.getStore(), [name]: value })
      },
      setFieldsValue: (values) => {
        if (!api) return
        api.setStore({ ...api.getStore(), ...(values as Record<string, unknown>) })
      },
      resetFields: () => api?.setStore({}),
      validateFields: async () => {
        if (!api) return {} as T
        const store = api.getStore()
        const rules = api.getRules()
        const errors: Record<string, FieldError> = {}
        for (const name of Object.keys(rules)) {
          const msg = await runRules(store[name], rules[name])
          if (msg) errors[name] = { status: 'error', message: msg }
        }
        api.setErrors(errors)
        if (Object.keys(errors).length) {
          api.onFinishFailed?.(errors)
          throw errors
        }
        return store as T
      },
      submit: () => {
        instance.validateFields().then(
          (values) => api?.onFinish?.(values),
          () => {},
        )
      },
    }
    ref.current = instance
  }
  return ref.current
}
