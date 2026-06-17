import * as React from 'react'
import { X, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  src: string
  /** Show a zoom button that opens a fullscreen preview. */
  preview?: boolean
  width?: number | string
  height?: number | string
  /** Border radius. */
  rounded?: boolean
}

/**
 * Image — image with optional click-to-zoom fullscreen preview.
 *
 * @example
 * <Image src="/photo.jpg" preview width={200} />
 */
export function Image({ src, alt, preview, width, height, rounded, className, ...props }: ImageProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div className="koi-image relative inline-block overflow-hidden" style={{ width, height }}>
        <img
          src={src}
          alt={alt}
          className={cn('block size-full object-cover', rounded && 'rounded-md', className)}
          {...props}
        />
        {preview && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Preview"
            className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity hover:opacity-100"
          >
            <ZoomIn className="size-6" />
          </button>
        )}
      </div>

      {preview && open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-8"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-6 top-6 text-white/80 transition-colors hover:text-white"
            onClick={() => setOpen(false)}
          >
            <X className="size-7" />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
