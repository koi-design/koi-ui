import { Check, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StepItem {
  label: React.ReactNode
  icon?: LucideIcon
  disabled?: boolean
}

export interface StepsProps {
  model: StepItem[]
  activeIndex?: number
  /** Allow clicking steps to navigate. */
  readonly?: boolean
  onChange?: (index: number) => void
  className?: string
}

/**
 * Steps — horizontal step indicator.
 *
 * @example
 * <Steps model={[{ label: 'Cart' }, { label: 'Address' }, { label: 'Pay' }]} activeIndex={1} />
 */
export function Steps({ model, activeIndex = 0, readonly = true, onChange, className }: StepsProps) {
  return (
    <ol className={cn('koi-steps flex w-full items-center', className)}>
      {model.map((step, i) => {
        const done = i < activeIndex
        const active = i === activeIndex
        const clickable = !readonly && !step.disabled
        return (
          <li key={i} className={cn('flex items-center', i < model.length - 1 && 'flex-1')}>
            <button
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onChange?.(i)}
              className={cn(
                'flex items-center gap-2',
                clickable ? 'cursor-pointer' : 'cursor-default',
              )}
            >
              <span
                className={cn(
                  'inline-flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors',
                  done && 'border-primary bg-primary text-primary-foreground',
                  active && 'border-primary text-primary',
                  !done && !active && 'border-border text-muted-foreground',
                )}
              >
                {done ? <Check className="size-4" /> : step.icon ? <step.icon className="size-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  'whitespace-nowrap text-sm font-medium',
                  active ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {step.label}
              </span>
            </button>
            {i < model.length - 1 && (
              <span className={cn('mx-3 h-px flex-1', done ? 'bg-primary' : 'bg-border')} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
