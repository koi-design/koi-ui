import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ColumnType } from '../data-table/data-table'

export interface TreeTableProps<T extends { children?: T[] }> {
  columns: ColumnType<T>[]
  dataSource: T[]
  rowKey: keyof T | ((record: T) => string | number)
  defaultExpandedKeys?: (string | number)[]
  indentSize?: number
  size?: 'small' | 'middle' | 'large'
  bordered?: boolean
  emptyText?: React.ReactNode
  className?: string
}

const cellPad = { small: 'px-2 py-1.5', middle: 'px-3 py-2.5', large: 'px-4 py-3.5' }

function getValue<T>(record: T, dataIndex?: keyof T | string): unknown {
  if (dataIndex == null) return undefined
  return (record as Record<string, unknown>)[dataIndex as string]
}

/**
 * TreeTable — table whose rows can contain nested `children` (antd tree data).
 *
 * @example
 * <TreeTable rowKey="key" columns={cols} dataSource={tree} defaultExpandedKeys={['1']} />
 */
export function TreeTable<T extends { children?: T[] }>({
  columns,
  dataSource,
  rowKey,
  defaultExpandedKeys = [],
  indentSize = 16,
  size = 'middle',
  bordered,
  emptyText = 'No data',
  className,
}: TreeTableProps<T>) {
  const [expanded, setExpanded] = React.useState<Set<string | number>>(new Set(defaultExpandedKeys))
  const keyOf = (r: T) => (typeof rowKey === 'function' ? rowKey(r) : (r[rowKey] as string | number))
  const alignCls = { left: 'text-left', center: 'text-center', right: 'text-right' }

  const renderRows = (records: T[], depth: number): React.ReactNode[] =>
    records.flatMap((record) => {
      const k = keyOf(record)
      const hasChildren = !!record.children?.length
      const isOpen = expanded.has(k)
      const row = (
        <tr key={k} className="border-b border-border transition-colors hover:bg-muted/40">
          {columns.map((col, i) => {
            const raw = getValue(record, col.dataIndex)
            const content = col.render ? col.render(raw, record, depth) : (raw as React.ReactNode)
            return (
              <td
                key={col.key ?? (col.dataIndex as string) ?? i}
                className={cn(cellPad[size], col.align && alignCls[col.align], bordered && 'border-r border-border last:border-r-0')}
              >
                {i === 0 ? (
                  <div className="flex items-center gap-1" style={{ paddingLeft: depth * indentSize }}>
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((s) => {
                          const n = new Set(s)
                          n.has(k) ? n.delete(k) : n.add(k)
                          return n
                        })
                      }
                      className={cn('inline-flex size-5 items-center justify-center text-muted-foreground', !hasChildren && 'invisible')}
                    >
                      <ChevronRight className={cn('size-4 transition-transform', isOpen && 'rotate-90')} />
                    </button>
                    {content}
                  </div>
                ) : (
                  content
                )}
              </td>
            )
          })}
        </tr>
      )
      return hasChildren && isOpen ? [row, ...renderRows(record.children!, depth + 1)] : [row]
    })

  return (
    <div className={cn('koi-treetable overflow-hidden rounded-md border border-border bg-background', className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-left">
              {columns.map((col, i) => (
                <th
                  key={col.key ?? (col.dataIndex as string) ?? i}
                  style={{ width: col.width }}
                  className={cn('font-semibold', cellPad[size], col.align && alignCls[col.align], bordered && 'border-r border-border last:border-r-0')}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSource.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-muted-foreground">
                  {emptyText}
                </td>
              </tr>
            ) : (
              renderRows(dataSource, 0)
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
