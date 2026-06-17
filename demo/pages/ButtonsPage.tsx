import { useState } from 'react'
import { Save, Trash2, Search, Plus } from 'lucide-react'
import { Button, SplitButton, toast } from '@/index'
import { Page, Demo, Row, ApiSection, ApiBlock } from '../docs/Example'

const SEVERITIES = ['primary', 'success', 'info', 'warning', 'danger', 'help', 'secondary'] as const

const buttonCode = `import { Button } from 'koi-ui'
import { Save, Trash2, Search } from 'lucide-react'

// severity
<Button label="primary" severity="primary" />
<Button label="danger" severity="danger" />

// appearance
<Button label="Outlined" outlined />
<Button label="Text" text />

// icon + loading
<Button label="Save" icon={Save} severity="success" />
<Button icon={Search} rounded text aria-label="search" />
<Button label="Load" loading={loading} onClick={load} />

// sizes
<Button label="Small" size="small" />
<Button label="Large" size="large" />`

const splitButtonCode = `import { SplitButton } from 'koi-ui'
import { Save, Trash2 } from 'lucide-react'

<SplitButton
  label="Save"
  icon={Save}
  onClick={() => toast('Saved')}
  model={[
    { label: 'Save as draft', command: () => toast('Draft') },
    { label: 'Save & close', command: () => toast('Closed') },
    { separator: true },
    { label: 'Delete', icon: Trash2, command: () => toast.error('Deleted') },
  ]}
/>`

export function ButtonsPage() {
  const [loading, setLoading] = useState(false)
  return (
    <Page title="Buttons" intro="Actions driven by props: severity, appearance, size, icon, loading.">
      <Demo
        title="Button"
        description="severity, outlined / text, sizes, icon, loading, disabled."
        code={buttonCode}
      >
        <div className="space-y-3">
          <Row>
            {SEVERITIES.map((s) => (
              <Button key={s} label={s} severity={s} />
            ))}
          </Row>
          <Row>
            <Button label="Outlined" outlined />
            <Button label="Text" text />
            <Button label="Save" icon={Save} severity="success" />
            <Button label="Delete" icon={Trash2} severity="danger" outlined />
            <Button icon={Search} rounded text aria-label="search" />
            <Button
              label={loading ? 'Saving…' : 'Load'}
              loading={loading}
              onClick={() => {
                setLoading(true)
                setTimeout(() => setLoading(false), 1500)
              }}
            />
            <Button label="Disabled" disabled />
          </Row>
          <Row>
            <Button label="Small" size="small" />
            <Button label="Normal" size="normal" />
            <Button label="Large" size="large" />
          </Row>
        </div>
      </Demo>

      <Demo
        title="SplitButton"
        description="Primary action with a dropdown of secondary actions."
        code={splitButtonCode}
      >
        <Row>
          <SplitButton
            label="Save"
            icon={Save}
            onClick={() => toast('Saved')}
            model={[
              { label: 'Save as draft', command: () => toast('Draft') },
              { label: 'Save & close', command: () => toast('Closed') },
              { separator: true },
              { label: 'Delete', icon: Trash2, command: () => toast.error('Deleted') },
            ]}
          />
          <SplitButton label="Export" icon={Plus} severity="secondary" model={[{ label: 'PDF' }, { label: 'CSV' }]} />
        </Row>
      </Demo>

      <ApiSection>
        <ApiBlock
          name="Button"
          rows={[
            { name: 'label', type: 'string', description: 'Button text. Omit for an icon-only button.' },
            { name: 'icon', type: 'LucideIcon', description: 'Leading icon component.' },
            { name: 'iconPos', type: "'left' | 'right'", default: "'left'", description: 'Render the icon before or after the label.' },
            { name: 'severity', type: "'primary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'secondary'", default: "'primary'", description: 'Color intent.' },
            { name: 'size', type: "'small' | 'normal' | 'large'", default: "'normal'", description: 'Button size.' },
            { name: 'outlined', type: 'boolean', default: 'false', description: 'Transparent background with a colored border.' },
            { name: 'text', type: 'boolean', default: 'false', description: 'Transparent background, no border (link-like).' },
            { name: 'rounded', type: 'boolean', default: 'false', description: 'Fully rounded (pill / circle) corners.' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Show a spinner and disable interaction.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button.' },
            { name: '...props', type: 'ButtonHTMLAttributes', description: 'All native <button> attributes (onClick, type, …).' },
          ]}
        />
        <ApiBlock
          name="SplitButton"
          rows={[
            { name: 'label', type: 'string', description: 'Primary button text.' },
            { name: 'icon', type: 'LucideIcon', description: 'Primary button icon.' },
            { name: 'onClick', type: '() => void', description: 'Primary action handler.' },
            { name: 'model', type: 'MenuItem[]', description: 'Dropdown items ({ label, icon, command, separator, disabled }).' },
            { name: 'severity', type: "'primary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'secondary'", default: "'primary'", description: 'Color intent.' },
            { name: 'size', type: "'small' | 'normal' | 'large'", default: "'normal'", description: 'Button size.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the whole control.' },
          ]}
        />
      </ApiSection>
    </Page>
  )
}
