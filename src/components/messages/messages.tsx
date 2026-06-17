import * as React from 'react'
import { cn } from '@/lib/utils'
import { Message, type MessageSeverity } from '../message/message'

export interface MessageItem {
  id: string | number
  severity?: MessageSeverity
  text: React.ReactNode
}

export interface MessagesProps {
  value: MessageItem[]
  /** Called with the id when a message's close button is clicked. */
  onRemove?: (id: string | number) => void
  /** Whether each message shows a close button. */
  closable?: boolean
  className?: string
}

/**
 * Messages — a stack of inline messages with optional removal.
 *
 * @example
 * <Messages value={msgs} onRemove={(id) => setMsgs((m) => m.filter((x) => x.id !== id))} closable />
 */
export function Messages({ value, onRemove, closable = true, className }: MessagesProps) {
  return (
    <div className={cn('koi-messages flex flex-col gap-2', className)}>
      {value.map((m) => (
        <Message
          key={m.id}
          severity={m.severity}
          text={m.text}
          closable={closable}
          onClose={() => onRemove?.(m.id)}
        />
      ))}
    </div>
  )
}
