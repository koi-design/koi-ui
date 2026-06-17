import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

/** Shared menu item model used by Menubar, ContextMenu and other menus. */
export interface MenuItem {
  label?: ReactNode
  icon?: LucideIcon
  /** Invoked on select. */
  command?: () => void
  /** Render as a link instead of a button. */
  url?: string
  target?: string
  /** Right-aligned hint, e.g. a keyboard shortcut. */
  shortcut?: string
  /** Nested submenu. */
  items?: MenuItem[]
  /** Render a divider (ignores other fields). */
  separator?: boolean
  disabled?: boolean
}
