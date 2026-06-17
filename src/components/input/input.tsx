import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'koi-input w-full rounded-md border bg-background text-foreground transition-colors duration-200 ' +
    'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 ' +
    'disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      inputSize: {
        small: 'h-9 px-2.5 text-sm',
        normal: 'h-11 px-3 text-base',
        large: 'h-[3.25rem] px-4 text-lg',
      },
      variant: {
        outlined: 'border-input hover:border-primary focus:border-primary',
        filled: 'border-transparent bg-muted hover:bg-muted/80 focus:bg-background focus:border-primary',
      },
      invalid: {
        true: 'border-danger hover:border-danger focus:border-danger focus:ring-danger/30',
        false: '',
      },
    },
    defaultVariants: { inputSize: 'normal', variant: 'outlined', invalid: false },
  },
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Icon shown inside the field on the left. */
  iconLeft?: LucideIcon
  /** Icon shown inside the field on the right. */
  iconRight?: LucideIcon
}

/**
 * Input — prop-driven text field.
 *
 * @example
 * <Input placeholder="Name" />
 * <Input variant="filled" iconLeft={Search} placeholder="Search" />
 * <Input invalid value={v} onChange={e => setV(e.target.value)} />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, inputSize, variant, invalid, iconLeft: IconLeft, iconRight: IconRight, ...props },
  ref,
) {
  const field = (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        inputVariants({ inputSize, variant, invalid }),
        IconLeft && 'pl-10',
        IconRight && 'pr-10',
        className,
      )}
      {...props}
    />
  )

  if (!IconLeft && !IconRight) return field

  return (
    <div className="relative inline-flex w-full items-center">
      {IconLeft && (
        <IconLeft
          className="pointer-events-none absolute left-3 size-4 text-muted-foreground"
          aria-hidden
        />
      )}
      {field}
      {IconRight && (
        <IconRight
          className="pointer-events-none absolute right-3 size-4 text-muted-foreground"
          aria-hidden
        />
      )}
    </div>
  )
})

export { inputVariants }
