import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

type SingleProps = {
  range?: false
  value?: number
  onChange?: (value: number) => void
}
type RangeProps = {
  range: true
  value?: [number, number]
  onChange?: (value: [number, number]) => void
}

export type SliderProps = Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  'value' | 'defaultValue' | 'onValueChange' | 'onChange'
> &
  (SingleProps | RangeProps)

/**
 * Slider — prop-driven. Single value by default, `range` for two thumbs.
 *
 * @example
 * <Slider value={v} onChange={setV} />
 * <Slider range value={[20, 80]} onChange={setRange} />
 */
export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(function Slider({ range, value, onChange, className, orientation = 'horizontal', ...props }, ref) {
  const arrValue = value == null ? undefined : range ? (value as number[]) : [value as number]

  const thumbCount = range ? 2 : 1

  return (
    <SliderPrimitive.Root
      ref={ref}
      orientation={orientation}
      value={arrValue}
      onValueChange={(v) => {
        if (range) (onChange as RangeProps['onChange'])?.([v[0], v[1]])
        else (onChange as SingleProps['onChange'])?.(v[0])
      }}
      className={cn(
        'koi-slider relative flex touch-none select-none items-center',
        'data-[orientation=horizontal]:h-5 data-[orientation=horizontal]:w-full',
        'data-[orientation=vertical]:h-44 data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5">
        <SliderPrimitive.Range className="absolute rounded-full bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block size-4 cursor-pointer rounded-full border-2 border-primary bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-60"
        />
      ))}
    </SliderPrimitive.Root>
  )
})
