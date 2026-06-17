import * as React from 'react'
import { Toaster as SonnerToaster, toast } from 'sonner'

export interface ToasterProps extends React.ComponentProps<typeof SonnerToaster> {}

/**
 * Toaster — mount once near the app root. Trigger via the `toast` helper.
 *
 * @example
 * // app root:
 * <Toaster position="top-right" />
 * // anywhere:
 * toast.success('Saved')
 */
export function Toaster({ position = 'top-right', ...props }: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      toastOptions={{
        classNames: {
          toast:
            'koi-toast group rounded-md border border-border bg-background text-foreground shadow-lg',
          description: 'text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-foreground',
          success: 'text-success',
          error: 'text-danger',
          warning: 'text-warning',
          info: 'text-info',
        },
      }}
      {...props}
    />
  )
}

export { toast }
