import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DialogProps {
  /** Controlled open state. */
  visible: boolean
  /** Called when the dialog requests to close. */
  onHide: () => void
  header?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  /** Hide the top-right close button. */
  closable?: boolean
  /** Close when clicking the backdrop. */
  dismissableMask?: boolean
  className?: string
  /** Width utility, e.g. "max-w-lg" (default) or "max-w-2xl". */
  widthClassName?: string
}

/**
 * Dialog — prop-driven modal.
 *
 * @example
 * <Dialog visible={open} onHide={() => setOpen(false)} header="Title"
 *   footer={<Button label="OK" onClick={…} />}>
 *   body
 * </Dialog>
 */
export function Dialog({
  visible,
  onHide,
  header,
  footer,
  children,
  closable = true,
  dismissableMask = true,
  className,
  widthClassName = 'max-w-lg',
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={visible} onOpenChange={(o) => !o && onHide()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'koi-dialog-mask fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          )}
        />
        <DialogPrimitive.Content
          onPointerDownOutside={(e) => !dismissableMask && e.preventDefault()}
          onInteractOutside={(e) => !dismissableMask && e.preventDefault()}
          className={cn(
            'koi-dialog fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border border-border bg-background p-6 shadow-lg',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            widthClassName,
            className,
          )}
        >
          {header && (
            <DialogPrimitive.Title className="text-lg font-semibold leading-none">
              {header}
            </DialogPrimitive.Title>
          )}
          <div className="text-sm text-muted-foreground">{children}</div>
          {footer && <div className="flex justify-end gap-2">{footer}</div>}
          {closable && (
            <DialogPrimitive.Close
              className="absolute right-4 top-4 rounded-sm p-1 text-muted-foreground opacity-70 transition hover:bg-muted hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring/40"
              aria-label="Close"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
