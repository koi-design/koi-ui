import * as React from 'react'
import { X, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  label?: React.ReactNode
  icon?: LucideIcon
  /** Image URL shown as a leading avatar. */
  image?: string
  /** Show a close button. */
  removable?: boolean
  onRemove?: () => void
}

/**
 * Chip — compact entity with optional icon/image and remove action.
 *
 * @example
 * <Chip label="Apple" icon={Tag} removable onRemove={…} />
 */
export function Chip({ label, icon: Icon, image, removable, onRemove, className, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        'koi-chip inline-flex items-center gap-2 rounded-full bg-muted py-1 pl-1 pr-3 text-sm text-foreground',
        !image && !Icon && 'pl-3',
        className,
      )}
      {...props}
    >
      {image ? (
        <img src={image} alt="" className="size-6 rounded-full object-cover" />
      ) : (
        Icon && <Icon className="size-4" aria-hidden />
      )}
      {label}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="ml-1 inline-flex text-muted-foreground transition-colors hover:text-danger"
        >
          <X className="size-3.5" />
        </button>
      )}
    </span>
  )
}
