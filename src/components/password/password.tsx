import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { inputVariants } from '../input/input'

export interface PasswordProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  inputSize?: 'small' | 'normal' | 'large'
  variant?: 'outlined' | 'filled'
  invalid?: boolean
  /** Show the visibility toggle icon. */
  toggleMask?: boolean
  /** Show a strength meter below the field. */
  feedback?: boolean
}

function strength(value: string): { score: number; label: string } {
  if (!value) return { score: 0, label: '' }
  let score = 0
  if (value.length >= 8) score++
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++
  if (/\d/.test(value)) score++
  if (/[^A-Za-z0-9]/.test(value)) score++
  const label = ['Weak', 'Weak', 'Medium', 'Good', 'Strong'][score]
  return { score, label }
}

/**
 * Password — text field with visibility toggle and optional strength meter.
 *
 * @example
 * <Password value={pw} onChange={(e) => setPw(e.target.value)} feedback />
 */
export const Password = React.forwardRef<HTMLInputElement, PasswordProps>(function Password(
  { className, inputSize, variant, invalid, toggleMask = true, feedback, value, onChange, ...props },
  ref,
) {
  const [visible, setVisible] = React.useState(false)
  const [inner, setInner] = React.useState('')
  const current = value != null ? String(value) : inner
  const { score, label } = strength(current)
  const colors = ['bg-danger', 'bg-danger', 'bg-warning', 'bg-info', 'bg-success']

  return (
    <div className="koi-password w-full">
      <div className="relative inline-flex w-full items-center">
        <input
          ref={ref}
          type={visible ? 'text' : 'password'}
          value={value}
          aria-invalid={invalid || undefined}
          onChange={(e) => {
            if (value == null) setInner(e.target.value)
            onChange?.(e)
          }}
          className={cn(inputVariants({ inputSize, variant, invalid }), toggleMask && 'pr-10', className)}
          {...props}
        />
        {toggleMask && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="absolute right-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
      </div>
      {feedback && (
        <div className="mt-2 space-y-1">
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn('h-1 flex-1 rounded-full', i < score ? colors[score] : 'bg-muted')}
              />
            ))}
          </div>
          {label && <span className="text-xs text-muted-foreground">{label}</span>}
        </div>
      )}
    </div>
  )
})
