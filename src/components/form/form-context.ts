import * as React from 'react'

export type FormLayout = 'horizontal' | 'vertical' | 'inline'
export type ValidateStatus = 'error' | 'warning' | 'success' | 'validating'

export interface Rule {
  required?: boolean
  message?: string
  /** Min length (string/array) or min value (number). */
  min?: number
  /** Max length (string/array) or max value (number). */
  max?: number
  pattern?: RegExp
  /** Return an error message string (or undefined/empty when valid). */
  validator?: (value: unknown) => string | undefined | Promise<string | undefined>
}

export interface FieldError {
  status: ValidateStatus
  message?: string
}

export interface FormContextValue {
  layout: FormLayout
  size?: 'small' | 'normal' | 'large'
  colon: boolean
  requiredMark: boolean
  labelWidth?: number | string
  values: Record<string, unknown>
  errors: Record<string, FieldError>
  setValue: (name: string, value: unknown) => void
  registerField: (name: string, rules?: Rule[]) => void
  unregisterField: (name: string) => void
}

export const FormContext = React.createContext<FormContextValue | null>(null)

export function useFormContext() {
  return React.useContext(FormContext)
}
