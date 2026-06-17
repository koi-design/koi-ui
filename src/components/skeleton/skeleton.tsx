import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
  shape?: 'rectangle' | 'circle'
  /** Border radius for rectangles. */
  radius?: string | number
}

/**
 * Skeleton — loading placeholder.
 *
 * @example
 * <Skeleton width="100%" height={20} />
 * <Skeleton shape="circle" width={48} height={48} />
 */
export function Skeleton({
  width,
  height,
  shape = 'rectangle',
  radius,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'koi-skeleton animate-pulse bg-muted',
        shape === 'circle' ? 'rounded-full' : 'rounded-md',
        className,
      )}
      style={{
        width,
        height,
        borderRadius: shape === 'rectangle' ? radius : undefined,
        ...style,
      }}
      {...props}
    />
  )
}
