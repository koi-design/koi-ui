import { Page, CodeBlock } from '../docs/Example'

const install = `pnpm add koi-ui
# peer deps
pnpm add react react-dom tailwindcss`

const tailwindConfig = `// tailwind.config.ts
import koiPreset from 'koi-ui/preset'

export default {
  presets: [koiPreset],
  content: ['./src/**/*.{ts,tsx}', './node_modules/koi-ui/dist/**/*.js'],
}`

const importStyles = `// app entry (main.tsx / layout.tsx)
import 'koi-ui/styles.css'`

const usage = `import { Button } from 'koi-ui'

export function Example() {
  return <Button label="Save" severity="success" />
}`

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-base font-semibold">
        <span className="grid size-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground">
          {n}
        </span>
        {title}
      </h3>
      {children}
    </div>
  )
}

export function Home() {
  return (
    <Page title="koi-ui" intro="A prop-driven React + Tailwind component library for admin systems.">
      <section id="getting-started" className="scroll-mt-20 space-y-8">
        <div>
          <h2 className="text-xl font-semibold">Getting Started</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            72 components across forms, data, panels, overlays, navigation, feedback and media —
            plus a Form system with validation. Heavy components (Chart, Carousel, DnD, FileUpload)
            ship under subpaths as optional peers, so the core stays light.
          </p>
        </div>

        <Step n={1} title="Install">
          <CodeBlock code={install} />
        </Step>

        <Step n={2} title="Add the Tailwind preset">
          <p className="text-sm text-muted-foreground">
            Register the preset and include koi-ui's output in <code className="font-mono">content</code> so its
            classes are generated.
          </p>
          <CodeBlock code={tailwindConfig} />
        </Step>

        <Step n={3} title="Import the theme once">
          <CodeBlock code={importStyles} />
        </Step>

        <Step n={4} title="Use a component">
          <CodeBlock code={usage} />
        </Step>

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
