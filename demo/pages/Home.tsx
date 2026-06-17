import { Page } from '../docs/Example'

const code = `pnpm add koi-ui

# tailwind.config.ts
import koiPreset from 'koi-ui/preset'
export default {
  presets: [koiPreset],
  content: ['./src/**/*.{ts,tsx}', './node_modules/koi-ui/dist/**/*.js'],
}

# app entry
import 'koi-ui/styles.css'

# use
import { Button } from 'koi-ui'`

export function Home() {
  return (
    <Page title="koi-ui" intro="A prop-driven React + Tailwind component library for admin systems.">
      <section id="getting-started" className="scroll-mt-20 space-y-4">
        <h2 className="text-xl font-semibold">Getting Started</h2>
        <p className="text-sm text-muted-foreground">
          72 components across forms, data, panels, overlays, navigation, feedback and media —
          plus a Form system with validation. Heavy components (Chart, Carousel, DnD, FileUpload)
          ship under subpaths as optional peers, so the core stays light.
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 text-sm">
          <code>{code}</code>
        </pre>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ['Forms', '22 inputs + Form/validation'],
            ['Data', 'DataTable, TreeTable, Tree, Timeline…'],
            ['Overlay', 'Dialog, Sheet, Popover, Tooltip…'],
            ['Theming', 'CSS variables, light + dark'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg border border-border p-4">
              <div className="font-medium">{t}</div>
              <div className="text-sm text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
      </section>
    </Page>
  )
}
