import { slug } from './nav'

/** A documented component section with a heading anchor. */
export function Demo({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={slug(title)} className="scroll-mt-20">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      <div className="mt-4 rounded-lg border border-border bg-background p-6">{children}</div>
    </section>
  )
}

/** A row of examples inside a Demo. */
export function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
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
