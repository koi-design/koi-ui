import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textareaVariants = cva(
  'koi-textarea w-full rounded-md border bg-background text-foreground transition-colors duration-200 ' +
    'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 ' +
    'disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        outlined: 'border-input hover:border-primary focus:border-primary',
        filled:
          'border-transparent bg-muted hover:bg-muted/80 focus:bg-background focus:border-primary',
      },
      invalid: {
        true: 'border-danger hover:border-danger focus:border-danger focus:ring-danger/30',
        false: '',
      },
    },
    defaultVariants: { variant: 'outlined', invalid: false },
  },
)

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'>,
    VariantProps<typeof textareaVariants> {
  /** Grow with content instead of using a fixed number of rows. */
  autoResize?: boolean
}

/** Textarea — prop-driven multi-line field. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, variant, invalid, autoResize, rows = 3, onInput, ...props },
  ref,
) {
  const innerRef = React.useRef<HTMLTextAreaElement | null>(null)

  const resize = React.useCallback((el: HTMLTextAreaElement | null) => {
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [])

  React.useEffect(() => {
    if (autoResize) resize(innerRef.current)
  }, [autoResize, resize, props.value])

  return (
    <textarea
      ref={(node) => {
        innerRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      rows={rows}
      aria-invalid={invalid || undefined}
      onInput={(e) => {
        if (autoResize) resize(e.currentTarget)
        onInput?.(e)
      }}
      className={cn(textareaVariants({ variant, invalid }), 'px-3 py-2.5', className)}
      {...props}
    />
  )
})
