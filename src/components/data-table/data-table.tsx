import * as React from 'react'
import { ChevronUp, ChevronDown, ChevronRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Paginator } from '../paginator/paginator'

export interface ColumnType<T> {
  /** Unique column key (defaults to dataIndex). */
  key?: string
  /** Path into the record for the cell value. */
  dataIndex?: keyof T | string
  title: React.ReactNode
  /** Custom cell renderer. */
  render?: (value: unknown, record: T, index: number) => React.ReactNode
  /** true for default compare, or a custom comparator. */
  sorter?: boolean | ((a: T, b: T) => number)
  filters?: { text: React.ReactNode; value: string }[]
  /** Predicate for a filter value against a record. */
  onFilter?: (value: string, record: T) => boolean
  width?: number | string
  align?: 'left' | 'center' | 'right'
  className?: string
}

export interface RowSelection<T> {
  selectedRowKeys: (string | number)[]
  onChange: (keys: (string | number)[], rows: T[]) => void
  type?: 'checkbox' | 'radio'
}

export interface DataTablePagination {
  current: number
  pageSize: number
  total?: number
  pageSizeOptions?: number[]
  onChange: (page: number, pageSize: number) => void
}

export interface DataTableProps<T> {
  columns: ColumnType<T>[]
  dataSource: T[]
  /** Field name or function returning a unique key per row. */
  rowKey: keyof T | ((record: T) => string | number)
  loading?: boolean
  bordered?: boolean
  size?: 'small' | 'middle' | 'large'
  rowSelection?: RowSelection<T>
  pagination?: DataTablePagination | false
  expandable?: {
    expandedRowRender: (record: T, index: number) => React.ReactNode
    rowExpandable?: (record: T) => boolean
  }
  emptyText?: React.ReactNode
  className?: string
}

type SortState = { key: string; order: 'asc' | 'desc' } | null

function getValue<T>(record: T, dataIndex?: keyof T | string): unknown {
  if (dataIndex == null) return undefined
  return (record as Record<string, unknown>)[dataIndex as string]
}

const cellPad = { small: 'px-2 py-1.5', middle: 'px-3 py-2.5', large: 'px-4 py-3.5' }

/**
 * DataTable — antd-style table: columns config, sort, filter, paginate, select, expand.
 *
 * @example
 * <DataTable rowKey="id" columns={cols} dataSource={data}
 *   rowSelection={{ selectedRowKeys, onChange }} pagination={{ current, pageSize, total, onChange }} />
 */
export function DataTable<T>({
  columns,
  dataSource,
  rowKey,
  loading,
  bordered,
  size = 'middle',
  rowSelection,
  pagination,
  expandable,
  emptyText = 'No data',
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState>(null)
  const [filters, setFilters] = React.useState<Record<string, string[]>>({})
  const [expanded, setExpanded] = React.useState<Set<string | number>>(new Set())

  const keyOf = React.useCallback(
    (record: T) => (typeof rowKey === 'function' ? rowKey(record) : (record[rowKey] as string | number)),
    [rowKey],
  )
  const colKey = (c: ColumnType<T>, i: number) => c.key ?? (c.dataIndex as string) ?? String(i)

  // filtering
  let view = dataSource
  for (const [key, values] of Object.entries(filters)) {
    if (!values.length) continue
    const col = columns.find((c, i) => colKey(c, i) === key)
    if (col?.onFilter) view = view.filter((r) => values.some((v) => col.onFilter!(v, r)))
  }

  // sorting
  if (sort) {
    const idx = columns.findIndex((c, i) => colKey(c, i) === sort.key)
    const col = columns[idx]
    if (col?.sorter) {
      const cmp =
        typeof col.sorter === 'function'
          ? col.sorter
          : (a: T, b: T) => {
              const av = getValue(a, col.dataIndex) as never
              const bv = getValue(b, col.dataIndex) as never
              return av > bv ? 1 : av < bv ? -1 : 0
            }
      view = [...view].sort((a, b) => (sort.order === 'asc' ? cmp(a, b) : -cmp(a, b)))
    }
  }

  const toggleSort = (key: string) =>
    setSort((s) =>
      s?.key !== key ? { key, order: 'asc' } : s.order === 'asc' ? { key, order: 'desc' } : null,
    )

  const allKeys = view.map(keyOf)
  const allSelected = rowSelection && allKeys.length > 0 && allKeys.every((k) => rowSelection.selectedRowKeys.includes(k))
  const toggleAll = () => {
    if (!rowSelection) return
    rowSelection.onChange(allSelected ? [] : allKeys, allSelected ? [] : view)
  }
  const toggleRow = (record: T) => {
    if (!rowSelection) return
    const k = keyOf(record)
    const isSel = rowSelection.selectedRowKeys.includes(k)
    const keys =
      rowSelection.type === 'radio'
        ? [k]
        : isSel
          ? rowSelection.selectedRowKeys.filter((x) => x !== k)
          : [...rowSelection.selectedRowKeys, k]
    rowSelection.onChange(keys, view.filter((r) => keys.includes(keyOf(r))))
  }

  const colCount = columns.length + (rowSelection ? 1 : 0) + (expandable ? 1 : 0)
  const alignCls = { left: 'text-left', center: 'text-center', right: 'text-right' }

  return (
    <div className={cn('koi-datatable overflow-hidden rounded-md border border-border bg-background', className)}>
      <div className="relative overflow-x-auto">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60">
            <span className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-left">
              {expandable && <th className={cn('w-10', cellPad[size])} />}
              {rowSelection && (
                <th className={cn('w-10', cellPad[size])}>
                  {rowSelection.type !== 'radio' && (
                    <button
                      type="button"
                      onClick={toggleAll}
                      className={cn(
                        'flex size-4 items-center justify-center rounded border',
                        allSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-input',
                      )}
                    >
                      {allSelected && <Check className="size-3" />}
                    </button>
                  )}
                </th>
              )}
              {columns.map((col, i) => {
                const key = colKey(col, i)
                const sorted = sort?.key === key ? sort.order : null
                return (
                  <th
                    key={key}
                    style={{ width: col.width }}
                    className={cn('font-semibold text-foreground', cellPad[size], col.align && alignCls[col.align], bordered && 'border-r border-border last:border-r-0', col.className)}
                  >
                    <div className={cn('flex items-center gap-1', col.align === 'center' && 'justify-center', col.align === 'right' && 'justify-end')}>
                      <span>{col.title}</span>
                      {col.sorter && (
                        <button type="button" onClick={() => toggleSort(key)} className="inline-flex flex-col -space-y-1">
                          <ChevronUp className={cn('size-3', sorted === 'asc' ? 'text-primary' : 'text-muted-foreground/50')} />
                          <ChevronDown className={cn('size-3', sorted === 'desc' ? 'text-primary' : 'text-muted-foreground/50')} />
                        </button>
                      )}
                      {col.filters && (
                        <FilterDropdown
                          options={col.filters}
                          value={filters[key] ?? []}
                          onChange={(v) => setFilters((f) => ({ ...f, [key]: v }))}
                        />
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {view.length === 0 ? (
              <tr>
                <td colSpan={colCount} className="px-4 py-10 text-center text-muted-foreground">
                  {emptyText}
                </td>
              </tr>
            ) : (
              view.map((record, rowIndex) => {
                const k = keyOf(record)
                const isSel = rowSelection?.selectedRowKeys.includes(k)
                const isExpanded = expanded.has(k)
                const canExpand = !expandable?.rowExpandable || expandable.rowExpandable(record)
                return (
                  <React.Fragment key={k}>
                    <tr className={cn('border-b border-border transition-colors hover:bg-muted/40', isSel && 'bg-primary/5')}>
                      {expandable && (
                        <td className={cellPad[size]}>
                          {canExpand && (
                            <button
                              type="button"
                              onClick={() =>
                                setExpanded((s) => {
                                  const n = new Set(s)
                                  n.has(k) ? n.delete(k) : n.add(k)
                                  return n
                                })
                              }
                              className="inline-flex size-5 items-center justify-center text-muted-foreground"
                            >
                              <ChevronRight className={cn('size-4 transition-transform', isExpanded && 'rotate-90')} />
                            </button>
                          )}
                        </td>
                      )}
                      {rowSelection && (
                        <td className={cellPad[size]}>
                          <button
                            type="button"
                            onClick={() => toggleRow(record)}
                            className={cn(
                              'flex size-4 items-center justify-center border',
                              rowSelection.type === 'radio' ? 'rounded-full' : 'rounded',
                              isSel ? 'border-primary bg-primary text-primary-foreground' : 'border-input',
                            )}
                          >
                            {isSel && <Check className="size-3" />}
                          </button>
                        </td>
                      )}
                      {columns.map((col, i) => {
                        const raw = getValue(record, col.dataIndex)
                        return (
                          <td
                            key={colKey(col, i)}
                            className={cn(cellPad[size], col.align && alignCls[col.align], bordered && 'border-r border-border last:border-r-0', col.className)}
                          >
                            {col.render ? col.render(raw, record, rowIndex) : (raw as React.ReactNode)}
                          </td>
                        )
                      })}
                    </tr>
                    {expandable && isExpanded && canExpand && (
                      <tr className="border-b border-border bg-muted/20">
                        <td colSpan={colCount} className={cellPad[size]}>
                          {expandable.expandedRowRender(record, rowIndex)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="flex justify-end border-t border-border px-4 py-3">
          <Paginator
            page={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total ?? dataSource.length}
            onChange={(p) => pagination.onChange(p, pagination.pageSize)}
            pageSizeOptions={pagination.pageSizeOptions}
            onPageSizeChange={(s) => pagination.onChange(1, s)}
            showTotal
          />
        </div>
      )}
    </div>
  )
}

function FilterDropdown({
  options,
  value,
  onChange,
}: {
  options: { text: React.ReactNode; value: string }[]
  value: string[]
  onChange: (v: string[]) => void
}) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false)
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn('inline-flex', value.length ? 'text-primary' : 'text-muted-foreground/60')}
        aria-label="Filter"
      >
        <svg viewBox="0 0 16 16" className="size-3.5 fill-current">
          <path d="M2 3h12l-5 6v4l-2 1V9z" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-6 z-20 min-w-[10rem] rounded-md border border-border bg-background p-1 shadow-md">
          {options.map((o) => {
            const sel = value.includes(o.value)
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => onChange(sel ? value.filter((v) => v !== o.value) : [...value, o.value])}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm font-normal hover:bg-muted"
              >
                <span className={cn('flex size-4 items-center justify-center rounded border', sel ? 'border-primary bg-primary text-primary-foreground' : 'border-input')}>
                  {sel && <Check className="size-3" />}
                </span>
                {o.text}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
