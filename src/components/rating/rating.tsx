import * as React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface RatingProps {
  value?: number
  onChange?: (value: number) => void
  /** Number of stars. */
  count?: number
  /** Allow half-star selection. */
  allowHalf?: boolean
  readOnly?: boolean
  disabled?: boolean
  /** Star size in pixels. */
  size?: number
  className?: string
}

/**
 * Rating — star rating, optional half steps.
 *
 * @example
 * <Rating value={r} onChange={setR} allowHalf />
 */
export function Rating({
  value = 0,
  onChange,
  count = 5,
  allowHalf,
  readOnly,
  disabled,
  size = 20,
  className,
}: RatingProps) {
  const [hover, setHover] = React.useState<number | null>(null)
  const active = hover ?? value
  const interactive = !readOnly && !disabled

  const pick = (e: React.MouseEvent, index: number) => {
    if (!interactive) return
    let v = index + 1
    if (allowHalf) {
      const { left, width } = e.currentTarget.getBoundingClientRect()
      if (e.clientX - left < width / 2) v = index + 0.5
    }
    onChange?.(v === value ? 0 : v)
  }

  const move = (e: React.MouseEvent, index: number) => {
    if (!interactive) return
    let v = index + 1
    if (allowHalf) {
      const { left, width } = e.currentTarget.getBoundingClientRect()
      if (e.clientX - left < width / 2) v = index + 0.5
    }
    setHover(v)
  }

  return (
    <div
      className={cn('koi-rating inline-flex items-center gap-1', disabled && 'opacity-60', className)}
      onMouseLeave={() => setHover(null)}
    >
      {Array.from({ length: count }).map((_, i) => {
        const fill = active - i // 1 full, .5 half, <=0 empty
        return (
          <span
            key={i}
            onClick={(e) => pick(e, i)}
            onMouseMove={(e) => move(e, i)}
            className={cn('relative inline-flex', interactive && 'cursor-pointer')}
            style={{ width: size, height: size }}
          >
            <Star className="absolute inset-0 text-muted-foreground/40" style={{ width: size, height: size }} />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: fill >= 1 ? size : fill > 0 ? size * fill : 0 }}
            >
              <Star
                className="fill-warning text-warning"
                style={{ width: size, height: size }}
              />
            </span>
          </span>
        )
      })}
    </div>
  )
}
