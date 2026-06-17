import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'koi-button inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-200 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ' +
    'disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0',
  {
    variants: {
      severity: {
        primary: '',
        success: '',
        info: '',
        warning: '',
        danger: '',
        help: '',
        secondary: '',
      },
      // visual style
      appearance: {
        solid: 'text-white',
        outlined: 'bg-transparent border',
        text: 'bg-transparent border-transparent',
      },
      size: {
        small: 'h-9 px-3 text-sm [&_svg]:size-4',
        normal: 'h-11 px-4 text-base [&_svg]:size-4',
        large: 'h-[3.25rem] px-5 text-lg [&_svg]:size-5',
      },
      rounded: { true: 'rounded-full', false: 'rounded-md' },
      iconOnly: { true: 'aspect-square px-0', false: '' },
    },
    compoundVariants: [
      // solid
      { appearance: 'solid', severity: 'primary', class: 'bg-primary enabled:hover:bg-primary/90' },
      { appearance: 'solid', severity: 'success', class: 'bg-success enabled:hover:bg-success/90' },
      { appearance: 'solid', severity: 'info', class: 'bg-info enabled:hover:bg-info/90' },
      { appearance: 'solid', severity: 'warning', class: 'bg-warning enabled:hover:bg-warning/90' },
      { appearance: 'solid', severity: 'danger', class: 'bg-danger enabled:hover:bg-danger/90' },
      { appearance: 'solid', severity: 'help', class: 'bg-help enabled:hover:bg-help/90' },
      {
        appearance: 'solid',
        severity: 'secondary',
        class: 'bg-muted text-foreground enabled:hover:bg-muted/70',
      },
      // outlined
      { appearance: 'outlined', severity: 'primary', class: 'text-primary border-primary enabled:hover:bg-primary/10' },
      { appearance: 'outlined', severity: 'success', class: 'text-success border-success enabled:hover:bg-success/10' },
      { appearance: 'outlined', severity: 'info', class: 'text-info border-info enabled:hover:bg-info/10' },
      { appearance: 'outlined', severity: 'warning', class: 'text-warning border-warning enabled:hover:bg-warning/10' },
      { appearance: 'outlined', severity: 'danger', class: 'text-danger border-danger enabled:hover:bg-danger/10' },
      { appearance: 'outlined', severity: 'help', class: 'text-help border-help enabled:hover:bg-help/10' },
      { appearance: 'outlined', severity: 'secondary', class: 'text-foreground border-input enabled:hover:bg-muted' },
      // text
      { appearance: 'text', severity: 'primary', class: 'text-primary enabled:hover:bg-primary/10' },
      { appearance: 'text', severity: 'success', class: 'text-success enabled:hover:bg-success/10' },
      { appearance: 'text', severity: 'info', class: 'text-info enabled:hover:bg-info/10' },
      { appearance: 'text', severity: 'warning', class: 'text-warning enabled:hover:bg-warning/10' },
      { appearance: 'text', severity: 'danger', class: 'text-danger enabled:hover:bg-danger/10' },
      { appearance: 'text', severity: 'help', class: 'text-help enabled:hover:bg-help/10' },
      { appearance: 'text', severity: 'secondary', class: 'text-foreground enabled:hover:bg-muted' },
    ],
    defaultVariants: {
      severity: 'primary',
      appearance: 'solid',
      size: 'normal',
      rounded: false,
      iconOnly: false,
    },
  },
)

type ButtonBaseVariants = Omit<VariantProps<typeof buttonVariants>, 'appearance' | 'iconOnly'>

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    ButtonBaseVariants {
  /** Button text. Omit for an icon-only button. */
  label?: string
  /** Leading icon (lucide-react component). */
  icon?: LucideIcon
  /** Render the icon after the label. */
  iconPos?: 'left' | 'right'
  /** Transparent background with a colored border. */
  outlined?: boolean
  /** Transparent background, no border (link-like). */
  text?: boolean
  /** Show a spinner and disable interaction. */
  loading?: boolean
  /** Escape hatch for arbitrary children when `label` is not enough. */
  children?: React.ReactNode
}

/**
 * Button — prop-driven.
 *
 * @example
 * <Button label="Save" icon={Save} severity="success" />
 * <Button label="Delete" severity="danger" outlined loading />
 * <Button icon={Search} rounded text aria-label="Search" />
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    label,
    icon: Icon,
    iconPos = 'left',
    outlined,
    text,
    loading = false,
    severity,
    size,
    rounded,
    disabled,
    className,
    children,
    ...props
  },
  ref,
) {
  const appearance = text ? 'text' : outlined ? 'outlined' : 'solid'
  const iconOnly = !label && !children
  const content = children ?? label

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ severity, appearance, size, rounded, iconOnly }), className)}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin" aria-hidden />
      ) : (
        Icon && iconPos === 'left' && <Icon aria-hidden />
      )}
      {content}
      {!loading && Icon && iconPos === 'right' && <Icon aria-hidden />}
    </button>
  )
})

export { buttonVariants }
