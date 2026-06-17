import * as React from 'react'
import { ChevronRight, Check, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TreeNode {
  key: string
  label: React.ReactNode
  icon?: LucideIcon
  children?: TreeNode[]
  disabled?: boolean
}

export interface TreeProps {
  value: TreeNode[]
  selectionMode?: 'single' | 'multiple' | 'checkbox'
  selectedKeys?: string[]
  onSelectionChange?: (keys: string[]) => void
  expandedKeys?: string[]
  defaultExpandedKeys?: string[]
  onToggle?: (keys: string[]) => void
  className?: string
}

/**
 * Tree — hierarchical node list with expand and selection.
 *
 * @example
 * <Tree value={nodes} selectionMode="checkbox" selectedKeys={sel} onSelectionChange={setSel} />
 */
export function Tree({
  value,
  selectionMode,
  selectedKeys = [],
  onSelectionChange,
  expandedKeys,
  defaultExpandedKeys = [],
  onToggle,
  className,
}: TreeProps) {
  const [internalExpanded, setInternalExpanded] = React.useState<string[]>(defaultExpandedKeys)
  const expanded = expandedKeys ?? internalExpanded

  const toggleExpand = (key: string) => {
    const next = expanded.includes(key) ? expanded.filter((k) => k !== key) : [...expanded, key]
    if (expandedKeys == null) setInternalExpanded(next)
    onToggle?.(next)
  }

  const select = (key: string) => {
    if (!selectionMode) return
    if (selectionMode === 'single') {
      onSelectionChange?.(selectedKeys.includes(key) ? [] : [key])
    } else {
      onSelectionChange?.(
        selectedKeys.includes(key) ? selectedKeys.filter((k) => k !== key) : [...selectedKeys, key],
      )
    }
  }

  const renderNode = (node: TreeNode, depth: number): React.ReactNode => {
    const hasChildren = !!node.children?.length
    const isOpen = expanded.includes(node.key)
    const isSelected = selectedKeys.includes(node.key)
    return (
      <div key={node.key}>
        <div
          className={cn(
            'flex items-center gap-1.5 rounded-sm py-1.5 pr-2 text-sm transition-colors',
            selectionMode && !node.disabled && 'cursor-pointer',
            isSelected && selectionMode !== 'checkbox' ? 'bg-primary/10 text-primary' : 'hover:bg-muted',
            node.disabled && 'pointer-events-none opacity-60',
          )}
          style={{ paddingLeft: 8 + depth * 16 }}
          onClick={() => select(node.key)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (hasChildren) toggleExpand(node.key)
            }}
            className={cn('inline-flex size-5 items-center justify-center', !hasChildren && 'invisible')}
          >
            <ChevronRight className={cn('size-4 transition-transform', isOpen && 'rotate-90')} />
          </button>
          {selectionMode === 'checkbox' && (
            <span
              className={cn(
                'flex size-4 items-center justify-center rounded border',
                isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-input',
              )}
            >
              {isSelected && <Check className="size-3" />}
            </span>
          )}
          {node.icon && <node.icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />}
          <span className="flex-1">{node.label}</span>
        </div>
        {hasChildren && isOpen && <div>{node.children!.map((c) => renderNode(c, depth + 1))}</div>}
      </div>
    )
  }

  return (
    <div className={cn('koi-tree rounded-md border border-border bg-background p-2', className)}>
      {value.map((n) => renderNode(n, 0))}
    </div>
  )
}
