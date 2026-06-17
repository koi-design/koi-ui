import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../button/button'

export interface ConfirmDialogProps {
  visible: boolean
  onHide: () => void
  header?: React.ReactNode
  message?: React.ReactNode
  icon?: LucideIcon
  acceptLabel?: string
  rejectLabel?: string
  /** Severity applied to the accept button. */
  severity?: 'primary' | 'danger' | 'success' | 'warning'
  onAccept?: () => void
  onReject?: () => void
  className?: string
}

/**
 * ConfirmDialog — prop-driven confirmation modal.
 *
 * @example
 * <ConfirmDialog visible={open} onHide={close} header="Delete?"
 *   message="This cannot be undone." severity="danger"
 *   onAccept={remove} />
 */
export function ConfirmDialog({
  visible,
  onHide,
  header = 'Confirm',
  message,
  icon: Icon,
  acceptLabel = 'Yes',
  rejectLabel = 'No',
  severity = 'primary',
  onAccept,
  onReject,
  className,
}: ConfirmDialogProps) {
  return (
    <AlertDialogPrimitive.Root open={visible} onOpenChange={(o) => !o && onHide()}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="koi-confirm-mask fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <AlertDialogPrimitive.Content
          className={cn(
            'koi-confirm fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            className,
          )}
        >
          <div className="flex items-start gap-3">
            {Icon && <Icon className="mt-0.5 size-6 shrink-0 text-muted-foreground" aria-hidden />}
            <div className="space-y-1">
              <AlertDialogPrimitive.Title className="text-lg font-semibold leading-none">
                {header}
              </AlertDialogPrimitive.Title>
              {message && (
                <AlertDialogPrimitive.Description className="text-sm text-muted-foreground">
                  {message}
                </AlertDialogPrimitive.Description>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <AlertDialogPrimitive.Cancel asChild>
              <Button label={rejectLabel} severity="secondary" text size="small" onClick={onReject} />
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <Button label={acceptLabel} severity={severity} size="small" onClick={onAccept} />
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}
