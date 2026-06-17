import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CarouselProps<T> {
  value: T[]
  itemTemplate: (item: T, index: number) => React.ReactNode
  /** Slides visible at once. */
  slidesToShow?: number
  loop?: boolean
  showArrows?: boolean
  showDots?: boolean
  className?: string
}

/**
 * Carousel — embla-backed slider.
 *
 * @example
 * import { Carousel } from 'koi-ui/carousel'
 * <Carousel value={items} slidesToShow={3} showArrows showDots itemTemplate={(it) => …} />
 */
export function Carousel<T>({
  value,
  itemTemplate,
  slidesToShow = 1,
  loop,
  showArrows = true,
  showDots,
  className,
}: CarouselProps<T>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, align: 'start' })
  const [selected, setSelected] = React.useState(0)
  const [snaps, setSnaps] = React.useState<number[]>([])

  React.useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    setSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const basis = `${100 / slidesToShow}%`

  return (
    <div className={cn('koi-carousel relative', className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {value.map((item, i) => (
            <div key={i} className="min-w-0 shrink-0 grow-0 px-2" style={{ flexBasis: basis }}>
              {itemTemplate(item, i)}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous"
            className="absolute -left-3 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-muted"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next"
            className="absolute -right-3 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-muted"
          >
            <ChevronRight className="size-4" />
          </button>
        </>
      )}

      {showDots && (
        <div className="mt-3 flex justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn('size-2 rounded-full transition-colors', i === selected ? 'bg-primary' : 'bg-muted')}
            />
          ))}
        </div>
      )}
    </div>
  )
}
