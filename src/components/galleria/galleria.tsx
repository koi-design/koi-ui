import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface GalleriaProps<T> {
  value: T[]
  /** Render the large active item. */
  itemTemplate: (item: T, index: number) => React.ReactNode
  /** Render a thumbnail; omit to hide the thumbnail strip. */
  thumbnailTemplate?: (item: T, index: number) => React.ReactNode
  activeIndex?: number
  onChange?: (index: number) => void
  showArrows?: boolean
  circular?: boolean
  className?: string
}

/**
 * Galleria — image gallery with a large view and a thumbnail strip.
 *
 * @example
 * <Galleria value={photos} itemTemplate={(p) => <img src={p.full} />}
 *   thumbnailTemplate={(p) => <img src={p.thumb} />} />
 */
export function Galleria<T>({
  value,
  itemTemplate,
  thumbnailTemplate,
  activeIndex,
  onChange,
  showArrows = true,
  circular,
  className,
}: GalleriaProps<T>) {
  const [internal, setInternal] = React.useState(0)
  const index = activeIndex ?? internal
  const setIndex = (i: number) => {
    const next = circular ? (i + value.length) % value.length : Math.max(0, Math.min(value.length - 1, i))
    if (activeIndex == null) setInternal(next)
    onChange?.(next)
  }

  if (!value.length) return null

  return (
    <div className={cn('koi-galleria', className)}>
      <div className="relative overflow-hidden rounded-md border border-border bg-background">
        {itemTemplate(value[index], index)}
        {showArrows && value.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setIndex(index - 1)}
              disabled={!circular && index === 0}
              aria-label="Previous"
              className="absolute left-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 disabled:opacity-40"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setIndex(index + 1)}
              disabled={!circular && index === value.length - 1}
              aria-label="Next"
              className="absolute right-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 disabled:opacity-40"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>
      {thumbnailTemplate && (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {value.map((item, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setIndex(i)}
              className={cn(
                'shrink-0 overflow-hidden rounded-md border-2 transition-colors',
                i === index ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100',
              )}
            >
              {thumbnailTemplate(item, i)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
