import * as React from 'react'
import { Check, Copy, Code2 } from 'lucide-react'
import { cn } from '@/index'
import { slug } from './nav'

/** A code block with a copy-to-clipboard button. */
export function CodeBlock({
  code,
  flush = false,
  className,
}: {
  code: string
  /** Drop the rounded border so it can sit flush inside another bordered box. */
  flush?: boolean
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }
  return (
    <div className={cn('group relative', className)}>
      <pre
        className={cn(
          'overflow-x-auto bg-muted/40 p-4 pr-12 text-[13px] leading-relaxed',
          flush ? '' : 'rounded-lg border border-border',
        )}
      >
        <code className="font-mono">{code}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted"
      >
        {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
      </button>
    </div>
  )
}

/** A documented component section with a heading anchor and optional "Show code". */
export function Demo({
  title,
  description,
  code,
  children,
}: {
  title: string
  description?: string
  /** Source snippet revealed by the "Show code" toggle. */
  code?: string
  children: React.ReactNode
}) {
  const [show, setShow] = React.useState(false)
  return (
    <section id={slug(title)} className="scroll-mt-20">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      <div className="mt-4 overflow-hidden rounded-lg border border-border bg-background">
        <div className="p-6">{children}</div>
        {code && (
          <>
            <div className="flex justify-end border-t border-border px-3 py-1.5">
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted"
              >
                <Code2 className="size-3.5" />
                {show ? 'Hide code' : 'Show code'}
              </button>
            </div>
            {show && <CodeBlock code={code} flush className="border-t border-border" />}
          </>
        )}
      </div>
    </section>
  )
}

/** A row of examples inside a Demo. */
export function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
}

export interface ApiRow {
  name: string
  type: string
  default?: string
  description: string
}

/** A single props table. */
export function ApiTable({ rows }: { rows: ApiRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-left">
            <th className="whitespace-nowrap px-4 py-2 font-medium">Prop</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium">Type</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium">Default</th>
            <th className="px-4 py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-border align-top last:border-0">
              <td className="whitespace-nowrap px-4 py-2 font-mono text-xs text-primary">{r.name}</td>
              <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{r.type}</td>
              <td className="whitespace-nowrap px-4 py-2 font-mono text-xs text-muted-foreground">
                {r.default ?? '—'}
              </td>
              <td className="px-4 py-2 text-muted-foreground">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** A named props table for one component, used inside the page-level API section. */
export function ApiBlock({ name, rows }: { name: string; rows: ApiRow[] }) {
  return (
    <div className="space-y-2">
      <h3 className="font-mono text-base font-semibold text-foreground">{name}</h3>
      <ApiTable rows={rows} />
    </div>
  )
}

/** Page-level API reference section (rendered at the bottom of a page). */
export function ApiSection({ children }: { children: React.ReactNode }) {
  return (
    <section id="api" className="scroll-mt-20 space-y-6 border-t border-border pt-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">API</h2>
        <p className="mt-1 text-sm text-muted-foreground">Props reference for the components on this page.</p>
      </div>
      {children}
    </section>
  )
}

/** Page wrapper: title + intro + stacked demos. */
export function Page({
  title,
  intro,
  children,
}: {
  title: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-4xl space-y-12 px-6 py-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {intro && <p className="mt-2 text-muted-foreground">{intro}</p>}
      </header>
      {children}
    </div>
  )
}
