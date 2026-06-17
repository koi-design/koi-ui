import * as React from 'react'
import { CheckCircle2, Info, AlertTriangle, XCircle, X, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type MessageSeverity = 'success' | 'info' | 'warn' | 'error'

export const messageTones: Record<MessageSeverity, string> = {
  success: 'bg-success/10 text-success border-success/30',
  info: 'bg-info/10 text-info border-info/30',
  warn: 'bg-warning/10 text-warning border-warning/30',
  error: 'bg-danger/10 text-danger border-danger/30',
}

export const messageIcons: Record<MessageSeverity, LucideIcon> = {
  success: CheckCircle2,
  info: Info,
  warn: AlertTriangle,
  error: XCircle,
}

export interface MessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  severity?: MessageSeverity
  text?: React.ReactNode
  /** Override the leading icon (false to hide). */
  icon?: LucideIcon | false
  closable?: boolean
  onClose?: () => void
}

/**
 * Message — inline tinted message bar.
 *
 * @example
 * <Message severity="success" text="Saved successfully" closable />
 */
export function Message({
  severity = 'info',
  text,
  icon,
  closable,
  onClose,
  className,
  ...props
}: MessageProps) {
  const Icon = icon === false ? null : (icon ?? messageIcons[severity])
  return (
    <div
      role="alert"
      className={cn(
        'koi-message flex items-center gap-2 rounded-md border px-3 py-2.5 text-sm',
        messageTones[severity],
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="size-4 shrink-0" aria-hidden />}
      <span className="flex-1">{text}</span>
      {closable && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="shrink-0 opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
