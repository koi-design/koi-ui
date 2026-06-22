import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Select } from '../select/select'

export interface PaginatorProps {
  /** 1-based current page. */
  page: number
  pageSize: number
  /** Total number of records. */
  total: number
  onChange?: (page: number) => void
  pageSizeOptions?: number[]
  onPageSizeChange?: (pageSize: number) => void
  /** Show the "x–y of n" summary. */
  showTotal?: boolean
  className?: string
}

function pageItems(current: number, totalPages: number): (number | '…')[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
  const items: (number | '…')[] = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(totalPages - 1, current + 1)
  if (start > 2) items.push('…')
  for (let i = start; i <= end; i++) items.push(i)
  if (end < totalPages - 1) items.push('…')
  items.push(totalPages)
  return items
}

/**
 * Paginator — page navigation with optional page-size selector.
 *
 * @example
 * <Paginator page={page} pageSize={size} total={240} onChange={setPage}
 *   pageSizeOptions={[10, 20, 50]} onPageSizeChange={setSize} showTotal />
 */
export function Paginator({
  page,
  pageSize,
  total,
  onChange,
  pageSizeOptions,
  onPageSizeChange,
  showTotal,
  className,
}: PaginatorProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(Math.max(page, 1), totalPages)
  const go = (p: number) => p >= 1 && p <= totalPages && p !== currentPage && onChange?.(p)
  const from = total === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const to = Math.min(total, currentPage * pageSize)

  const navBtn =
    'inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-input px-2 text-sm transition-colors enabled:hover:border-primary enabled:hover:text-primary disabled:pointer-events-none disabled:opacity-60'

  return (
    <div className={cn('koi-paginator flex flex-wrap items-center gap-2', className)}>
      {showTotal && (
        <span className="mr-2 text-sm text-muted-foreground">
          {from}–{to} of {total}
        </span>
      )}
      <button type="button" className={navBtn} disabled={currentPage <= 1} onClick={() => go(currentPage - 1)} aria-label="Previous page">
        <ChevronLeft className="size-4" />
      </button>
      {pageItems(currentPage, totalPages).map((it, i) =>
        it === '…' ? (
          <span key={`e${i}`} className="px-1 text-muted-foreground">
            …
          </span>
        ) : (
          <button
            type="button"
            key={it}
            onClick={() => go(it)}
            aria-current={it === currentPage ? 'page' : undefined}
            className={cn(
              'inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-sm transition-colors',
              it === currentPage
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-input hover:border-primary hover:text-primary',
            )}
          >
            {it}
          </button>
        ),
      )}
      <button type="button" className={navBtn} disabled={currentPage >= totalPages} onClick={() => go(currentPage + 1)} aria-label="Next page">
        <ChevronRight className="size-4" />
      </button>
      {pageSizeOptions && (
        <Select
          size="small"
          className="ml-2 w-28"
          value={String(pageSize)}
          onChange={(v) => onPageSizeChange?.(Number(v))}
          options={pageSizeOptions.map((n) => ({ label: `${n} / page`, value: String(n) }))}
        />
      )}
    </div>
  )
}
