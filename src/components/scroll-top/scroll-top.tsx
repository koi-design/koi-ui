import * as React from 'react'
import { ChevronUp, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ScrollTopProps {
  /** Scroll distance (px) before the button appears. */
  threshold?: number
  icon?: LucideIcon
  /** Scroll the window or the nearest scrollable parent element. */
  target?: 'window' | 'parent'
  className?: string
}

/**
 * ScrollTop — floating "back to top" button that appears after scrolling.
 *
 * @example
 * <ScrollTop threshold={300} />
 */
export function ScrollTop({
  threshold = 300,
  icon: Icon = ChevronUp,
  target = 'window',
  className,
}: ScrollTopProps) {
  const [visible, setVisible] = React.useState(false)
  const ref = React.useRef<HTMLButtonElement>(null)
  const scroller = React.useRef<HTMLElement | Window | null>(null)

  React.useEffect(() => {
    const el: HTMLElement | Window =
      target === 'parent' && ref.current
        ? (ref.current.closest('[data-scrollable]') as HTMLElement) ?? window
        : window
    scroller.current = el
    const getTop = () => (el === window ? window.scrollY : (el as HTMLElement).scrollTop)
    const onScroll = () => setVisible(getTop() > threshold)
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [threshold, target])

  const toTop = () => {
    const el = scroller.current
    if (el === window) window.scrollTo({ top: 0, behavior: 'smooth' })
    else (el as HTMLElement)?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={toTop}
      aria-label="Scroll to top"
      className={cn(
        'koi-scrolltop fixed bottom-6 right-6 z-40 inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
        className,
      )}
    >
      <Icon className="size-5" />
    </button>
  )
}
