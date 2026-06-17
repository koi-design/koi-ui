import * as PopoverPrimitive from '@radix-ui/react-popover'
import { HexColorPicker } from 'react-colorful'
import { cn } from '@/lib/utils'

export interface ColorPickerProps {
  /** Hex color string, e.g. "#6366F1". */
  value?: string
  onChange?: (value: string) => void
  /** Show a hex text input under the picker. */
  showInput?: boolean
  disabled?: boolean
  className?: string
}

/**
 * ColorPicker — swatch trigger with a popover hex picker.
 *
 * @example
 * <ColorPicker value={color} onChange={setColor} />
 */
export function ColorPicker({
  value = '#6366F1',
  onChange,
  showInput = true,
  disabled,
  className,
}: ColorPickerProps) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger
        disabled={disabled}
        className={cn(
          'koi-colorpicker inline-flex items-center gap-2 rounded-md border border-input bg-background p-1 pr-2 transition-colors hover:border-primary',
          'focus:outline-none focus:ring-2 focus:ring-ring/30 disabled:pointer-events-none disabled:opacity-60',
          className,
        )}
      >
        <span
          className="size-6 rounded border border-border"
          style={{ backgroundColor: value }}
        />
        <span className="text-sm uppercase">{value}</span>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className={cn(
            'koi-colorpicker-panel z-50 rounded-md border border-border bg-background p-3 shadow-md',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            '[&_.react-colorful]:!w-48 [&_.react-colorful__saturation]:rounded-t-md',
            '[&_.react-colorful__last-control]:rounded-b-md',
          )}
        >
          <HexColorPicker color={value} onChange={(c) => onChange?.(c)} />
          {showInput && (
            <input
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className="mt-3 h-8 w-48 rounded border border-input bg-transparent px-2 text-sm uppercase outline-none focus:border-primary"
            />
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
