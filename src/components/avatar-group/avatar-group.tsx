import * as React from 'react'
import { cn } from '@/lib/utils'
import { Avatar } from '../avatar/avatar'

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Avatar elements to stack. */
  children: React.ReactNode
  /** Collapse to a "+N" avatar past this count. */
  max?: number
}

/**
 * AvatarGroup — overlapping stack of avatars.
 *
 * @example
 * <AvatarGroup max={3}>
 *   <Avatar label="A" /><Avatar label="B" /><Avatar label="C" /><Avatar label="D" />
 * </AvatarGroup>
 */
export function AvatarGroup({ children, max, className, ...props }: AvatarGroupProps) {
  const items = React.Children.toArray(children)
  const visible = max != null ? items.slice(0, max) : items
  const overflow = max != null ? items.length - max : 0

  return (
    <div
      className={cn(
        'koi-avatargroup flex items-center [&>*]:-ml-2 [&>*]:ring-2 [&>*]:ring-background first:[&>*]:ml-0',
        className,
      )}
      {...props}
    >
      {visible}
      {overflow > 0 && <Avatar label={`+${overflow}`} />}
    </div>
  )
}
