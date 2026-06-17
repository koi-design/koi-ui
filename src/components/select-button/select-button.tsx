import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectButtonOption {
  label?: React.ReactNode
  value: string
  icon?: LucideIcon
  disabled?: boolean
}

interface BaseProps {
  options: SelectButtonOption[]
  size?: 'small' | 'normal' | 'large'
  className?: string
  disabled?: boolean
}
type SingleProps = BaseProps & {
  multiple?: false
  value?: string
  onChange?: (value: string) => void
}
type MultipleProps = BaseProps & {
  multiple: true
  value?: string[]
  onChange?: (value: string[]) => void
}

export type SelectButtonProps = SingleProps | MultipleProps

const sizes = {
  small: 'h-9 px-3 text-sm [&_svg]:size-4',
  normal: 'h-11 px-4 text-base [&_svg]:size-4',
  large: 'h-[3.25rem] px-5 text-lg [&_svg]:size-5',
}

/**
 * SelectButton — segmented single or multiple choice.
 *
 * @example
 * <SelectButton options={opts} value={v} onChange={setV} />
 * <SelectButton multiple options={opts} value={arr} onChange={setArr} />
 */
export function SelectButton(props: SelectButtonProps) {
  const { options, size = 'normal', className, disabled } = props

  const itemCls = cn(
    'koi-selectbutton-item inline-flex items-center justify-center gap-2 border-y border-r font-medium transition-colors duration-200',
    'first:rounded-l-md first:border-l last:rounded-r-md',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset',
    'disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0',
    'border-input bg-background text-foreground enabled:hover:bg-muted',
    'data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
    sizes[size],
  )

  const items = options.map((opt) => (
    <ToggleGroupPrimitive.Item
      key={opt.value}
      value={opt.value}
      disabled={opt.disabled}
      className={itemCls}
    >
      {opt.icon && <opt.icon aria-hidden />}
      {opt.label}
    </ToggleGroupPrimitive.Item>
  ))

  const rootCls = cn('koi-selectbutton inline-flex', className)

  if (props.multiple) {
    return (
      <ToggleGroupPrimitive.Root
        type="multiple"
        disabled={disabled}
        value={props.value}
        onValueChange={(v) => props.onChange?.(v)}
        className={rootCls}
      >
        {items}
      </ToggleGroupPrimitive.Root>
    )
  }

  return (
    <ToggleGroupPrimitive.Root
      type="single"
      disabled={disabled}
      value={props.value}
      onValueChange={(v) => v && props.onChange?.(v)}
      className={rootCls}
    >
      {items}
    </ToggleGroupPrimitive.Root>
  )
}
