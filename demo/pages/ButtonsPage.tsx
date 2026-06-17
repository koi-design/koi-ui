import { useState } from 'react'
import { Save, Trash2, Search, Plus } from 'lucide-react'
import { Button, SplitButton, toast } from '@/index'
import { Page, Demo, Row } from '../docs/Example'

const SEVERITIES = ['primary', 'success', 'info', 'warning', 'danger', 'help', 'secondary'] as const

export function ButtonsPage() {
  const [loading, setLoading] = useState(false)
  return (
    <Page title="Buttons" intro="Actions driven by props: severity, appearance, size, icon, loading.">
      <Demo title="Button" description="severity, outlined / text, sizes, icon, loading, disabled.">
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

      <Demo title="SplitButton" description="Primary action with a dropdown of secondary actions.">
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
    </Page>
  )
}
