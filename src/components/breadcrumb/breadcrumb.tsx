import * as React from 'react'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label?: React.ReactNode
  icon?: LucideIcon
  url?: string
  command?: () => void
}

export interface BreadcrumbProps {
  model: BreadcrumbItem[]
  /** Leading "home" item rendered before the model. */
  home?: BreadcrumbItem
  separator?: React.ReactNode
  className?: string
}

/**
 * Breadcrumb — navigation trail.
 *
 * @example
 * <Breadcrumb home={{ icon: Home, url: '/' }} model={[{ label: 'Users', url: '/users' }, { label: 'Edit' }]} />
 */
export function Breadcrumb({ model, home, separator, className }: BreadcrumbProps) {
  const items = home ? [home, ...model] : model
  const sep = separator ?? <ChevronRight className="size-4 text-muted-foreground" />

  return (
    <nav aria-label="Breadcrumb" className={cn('koi-breadcrumb', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1
          const content = (
            <span className="inline-flex items-center gap-1.5">
              {item.icon && <item.icon className="size-4" aria-hidden />}
              {item.label}
            </span>
          )
          return (
            <li key={i} className="inline-flex items-center gap-1.5">
              {item.url && !last ? (
                <a href={item.url} className="text-muted-foreground transition-colors hover:text-primary">
                  {content}
                </a>
              ) : item.command && !last ? (
                <button
                  type="button"
                  onClick={item.command}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {content}
                </button>
              ) : (
                <span className={last ? 'font-medium text-foreground' : 'text-muted-foreground'}>
                  {content}
                </span>
              )}
              {!last && <span className="inline-flex">{sep}</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
