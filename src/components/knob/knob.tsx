import * as React from 'react'
import { cn } from '@/lib/utils'

export interface KnobProps {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  /** Diameter in pixels. */
  size?: number
  strokeWidth?: number
  showValue?: boolean
  /** Format the centered value text. */
  valueTemplate?: (value: number) => string
  readOnly?: boolean
  disabled?: boolean
  className?: string
}

const GAP = 90 // degrees of open gap at the bottom

/**
 * Knob — circular range input, draggable.
 *
 * @example
 * <Knob value={v} onChange={setV} min={0} max={100} showValue />
 */
export function Knob({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size = 100,
  strokeWidth = 14,
  showValue = true,
  valueTemplate = (v) => `${v}`,
  readOnly,
  disabled,
  className,
}: KnobProps) {
  const ref = React.useRef<SVGSVGElement>(null)
  const interactive = !readOnly && !disabled
  const radius = size / 2
  const r = radius - strokeWidth / 2
  const startAngle = 90 + GAP / 2
  const endAngle = 90 - GAP / 2 + 360
  const ratio = (value - min) / (max - min)

  const polar = (angleDeg: number) => {
    const a = (angleDeg * Math.PI) / 180
    return { x: radius + r * Math.cos(a), y: radius + r * Math.sin(a) }
  }
  const arcPath = (fromDeg: number, toDeg: number) => {
    const from = polar(fromDeg)
    const to = polar(toDeg)
    const large = toDeg - fromDeg > 180 ? 1 : 0
    return `M ${from.x} ${from.y} A ${r} ${r} 0 ${large} 1 ${to.x} ${to.y}`
  }

  const valueAngle = startAngle + ratio * (endAngle - startAngle)

  const updateFromPointer = (clientX: number, clientY: number) => {
    const svg = ref.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    let deg = (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI
    if (deg < 0) deg += 360
    let norm = (deg - startAngle) / (endAngle - startAngle)
    norm = Math.min(1, Math.max(0, norm))
    const raw = min + norm * (max - min)
    const stepped = Math.round(raw / step) * step
    onChange?.(Math.min(max, Math.max(min, stepped)))
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive) return
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    updateFromPointer(e.clientX, e.clientY)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive || e.buttons !== 1) return
    updateFromPointer(e.clientX, e.clientY)
  }

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="slider"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      className={cn('koi-knob touch-none select-none', interactive && 'cursor-pointer', disabled && 'opacity-60', className)}
    >
      <path d={arcPath(startAngle, endAngle)} fill="none" strokeWidth={strokeWidth} className="stroke-muted" strokeLinecap="round" />
      {ratio > 0 && (
        <path
          d={arcPath(startAngle, valueAngle)}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-primary"
          strokeLinecap="round"
        />
      )}
      {showValue && (
        <text
          x={radius}
          y={radius}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-foreground text-sm font-medium"
        >
          {valueTemplate(value)}
        </text>
      )}
    </svg>
  )
}
