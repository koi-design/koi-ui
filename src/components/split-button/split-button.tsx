import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MenuItem } from '@/lib/menu-model'

export interface SplitButtonProps {
  label?: string
  icon?: LucideIcon
  /** Primary action. */
  onClick?: () => void
  /** Items in the dropdown. */
  model: MenuItem[]
  severity?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'secondary'
  size?: 'small' | 'normal' | 'large'
  disabled?: boolean
  className?: string
}

const severityCls: Record<string, string> = {
  primary: 'bg-primary text-primary-foreground enabled:hover:bg-primary/90',
  success: 'bg-success text-success-foreground enabled:hover:bg-success/90',
  info: 'bg-info text-info-foreground enabled:hover:bg-info/90',
  warning: 'bg-warning text-warning-foreground enabled:hover:bg-warning/90',
  danger: 'bg-danger text-danger-foreground enabled:hover:bg-danger/90',
  help: 'bg-help text-help-foreground enabled:hover:bg-help/90',
  secondary: 'bg-muted text-foreground enabled:hover:bg-muted/70',
}

const sizeCls = {
  small: 'h-9 text-sm [&_svg]:size-4',
  normal: 'h-11 text-base [&_svg]:size-4',
  large: 'h-[3.25rem] text-lg [&_svg]:size-5',
}

const itemCls = cn(
  'flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
  'focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-60',
)

/**
 * SplitButton — primary action with a dropdown of secondary actions.
 *
 * @example
 * <SplitButton label="Save" icon={Save} onClick={save} model={[{ label: 'Save as…', command }]} />
 */
export function SplitButton({
  label,
  icon: Icon,
  onClick,
  model,
  severity = 'primary',
  size = 'normal',
  disabled,
  className,
}: SplitButtonProps) {
  return (
    <div className={cn('koi-splitbutton inline-flex', sizeCls[size], className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'inline-flex items-center gap-2 rounded-l-md border-r border-black/10 px-4 font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
          'disabled:pointer-events-none disabled:opacity-60',
          severityCls[severity],
        )}
      >
        {Icon && <Icon aria-hidden />}
        {label}
      </button>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger
          disabled={disabled}
          className={cn(
            'inline-flex items-center justify-center rounded-r-md px-2 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
            'disabled:pointer-events-none disabled:opacity-60',
            severityCls[severity],
          )}
        >
          <ChevronDown className="size-4" />
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="end"
            sideOffset={4}
            className={cn(
              'z-50 min-w-[12rem] rounded-md border border-border bg-background p-1 text-foreground shadow-md',
              'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            )}
          >
            {model.map((item, i) =>
              item.separator ? (
                <DropdownMenuPrimitive.Separator key={i} className="my-1 h-px bg-border" />
              ) : (
                <DropdownMenuPrimitive.Item
                  key={i}
                  disabled={item.disabled}
                  onSelect={() => item.command?.()}
                  className={itemCls}
                >
                  {item.icon && <item.icon className="size-4" aria-hidden />}
                  {item.label}
                </DropdownMenuPrimitive.Item>
              ),
            )}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  )
}
