import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SheetProps {
  visible: boolean
  onHide: () => void
  position?: 'left' | 'right' | 'top' | 'bottom'
  header?: React.ReactNode
  children?: React.ReactNode
  closable?: boolean
  dismissableMask?: boolean
  className?: string
}

const sides = {
  left: 'inset-y-0 left-0 h-full w-80 border-r data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
  right:
    'inset-y-0 right-0 h-full w-80 border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
  top: 'inset-x-0 top-0 w-full border-b data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
  bottom:
    'inset-x-0 bottom-0 w-full border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
}

/**
 * Sheet — slide-in panel (drawer).
 *
 * @example
 * <Sheet visible={open} onHide={close} position="right" header="Filters">…</Sheet>
 */
export function Sheet({
  visible,
  onHide,
  position = 'right',
  header,
  children,
  closable = true,
  dismissableMask = true,
  className,
}: SheetProps) {
  return (
    <DialogPrimitive.Root open={visible} onOpenChange={(o) => !o && onHide()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="koi-sheet-mask fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          onInteractOutside={(e) => !dismissableMask && e.preventDefault()}
          className={cn(
            'koi-sheet fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-lg border-border transition ease-in-out',
            'data-[state=open]:animate-in data-[state=open]:duration-300 data-[state=closed]:animate-out data-[state=closed]:duration-200',
            sides[position],
            className,
          )}
        >
          {header && (
            <DialogPrimitive.Title className="text-lg font-semibold leading-none">
              {header}
            </DialogPrimitive.Title>
          )}
          <div className="flex-1 overflow-auto text-sm">{children}</div>
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
