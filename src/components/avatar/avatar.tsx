import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const avatarVariants = cva(
  'koi-avatar relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-muted text-muted-foreground font-medium',
  {
    variants: {
      size: {
        small: 'size-8 text-xs',
        normal: 'size-10 text-sm',
        large: 'size-12 text-base',
        xlarge: 'size-16 text-lg',
      },
      shape: { circle: 'rounded-full', square: 'rounded-md' },
    },
    defaultVariants: { size: 'normal', shape: 'circle' },
  },
)

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>,
    VariantProps<typeof avatarVariants> {
  /** Image URL. Falls back to label/icon when it fails to load. */
  image?: string
  alt?: string
  /** Text shown when no image (e.g. initials). */
  label?: string
  /** Icon shown when no image and no label. */
  icon?: LucideIcon
}

/**
 * Avatar — image with label/icon fallback.
 *
 * @example
 * <Avatar image="/me.png" label="QN" />
 * <Avatar icon={User} shape="square" />
 */
export function Avatar({ image, alt, label, icon: Icon, size, shape, className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root className={cn(avatarVariants({ size, shape }), className)} {...props}>
      {image && (
        <AvatarPrimitive.Image src={image} alt={alt ?? label} className="size-full object-cover" />
      )}
      <AvatarPrimitive.Fallback delayMs={image ? 200 : 0} className="flex size-full items-center justify-center">
        {label ?? (Icon ? <Icon className="size-1/2" aria-hidden /> : null)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

export { avatarVariants }
