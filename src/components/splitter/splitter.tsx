import * as React from 'react'
import { Group, Panel, Separator } from 'react-resizable-panels'
import { cn } from '@/lib/utils'

export interface SplitterPanel {
  content: React.ReactNode
  /** Initial size, e.g. 30 (percent) or "200px". */
  size?: number | string
  minSize?: number | string
  maxSize?: number | string
}

export interface SplitterProps {
  panels: SplitterPanel[]
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

/**
 * Splitter — resizable panels.
 *
 * @example
 * <Splitter panels={[{ content: <Nav/>, size: 30 }, { content: <Main/> }]} />
 */
export function Splitter({ panels, orientation = 'horizontal', className }: SplitterProps) {
  // The library forces `height/width: 100%` inline on <Group>, which would
  // override sizing classes. Sizing/border live on this wrapper; the group fills it.
  return (
    <div className={cn('koi-splitter overflow-hidden rounded-md border border-border', className)}>
      <Group orientation={orientation} className="size-full">
        {panels.map((panel, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <Separator
                className={cn(
                  'koi-splitter-gutter relative shrink-0 bg-border transition-colors hover:bg-primary active:bg-primary',
                  orientation === 'horizontal' ? 'w-px cursor-col-resize' : 'h-px cursor-row-resize',
                )}
              />
            )}
            <Panel defaultSize={panel.size} minSize={panel.minSize} maxSize={panel.maxSize}>
              {panel.content}
            </Panel>
          </React.Fragment>
        ))}
      </Group>
    </div>
  )
}
