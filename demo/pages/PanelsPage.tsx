import { useState } from 'react'
import { Home, Plus, Trash2, Search } from 'lucide-react'
import {
  Card,
  Accordion,
  Panel,
  Fieldset,
  Tabs,
  Splitter,
  ScrollArea,
  Toolbar,
  Separator,
  Inplace,
  Button,
  Input,
} from '@/index'
import { Page, Demo } from '../docs/Example'

export function PanelsPage() {
  const [editName, setEditName] = useState('Quentin')
  return (
    <Page title="Panels & Layout" intro="Containers and layout primitives.">
      <Demo title="Card" description="title / subtitle / header / footer + body.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Card title="Profile" subtitle="Account details">
            <p className="text-sm text-muted-foreground">Card body content.</p>
          </Card>
          <Card
            title="With footer"
            footer={
              <div className="flex justify-end gap-2">
                <Button label="Cancel" severity="secondary" text size="small" />
                <Button label="Save" size="small" />
              </div>
            }
          >
            <p className="text-sm text-muted-foreground">Footer separated by a divider.</p>
          </Card>
        </div>
      </Demo>

      <Demo title="Accordion" description="Collapsible panels (single or multiple).">
        <Accordion
          items={[
            { value: '1', header: 'What is koi-ui?', content: 'A prop-driven React component library.' },
            { value: '2', header: 'Is it themeable?', content: 'Yes, via CSS variables (light + dark).' },
          ]}
        />
      </Demo>

      <Demo title="Panel" description="Titled, optionally collapsible container.">
        <Panel header="Toggleable panel" toggleable>
          <p className="text-sm text-muted-foreground">Collapsible content area.</p>
        </Panel>
      </Demo>

      <Demo title="Fieldset" description="Grouping box with a legend.">
        <Fieldset legend="Address" icon={Home} toggleable>
          <p className="text-sm text-muted-foreground">Grouped fields go here.</p>
        </Fieldset>
      </Demo>

      <Demo title="Tabs" description="Model-driven tab view.">
        <Tabs
          tabs={[
            { value: 'a', label: 'Overview', content: 'Overview content' },
            { value: 'b', label: 'Settings', content: 'Settings content' },
            { value: 'c', label: 'Alerts', content: 'Alerts content' },
          ]}
        />
      </Demo>

      <Demo title="Splitter" description="Resizable panels.">
        <Splitter
          className="h-32"
          panels={[
            { content: <div className="p-3 text-sm">Left</div>, size: 40 },
            { content: <div className="p-3 text-sm">Right</div> },
          ]}
        />
      </Demo>

      <Demo title="ScrollArea" description="Styled, cross-browser scroll container.">
        <ScrollArea className="h-32 rounded-md border border-border p-3">
          <div className="space-y-2 text-sm">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i}>Scrollable row {i + 1}</div>
            ))}
          </div>
        </ScrollArea>
      </Demo>

      <Demo title="Toolbar" description="start / center / end regions.">
        <Toolbar
          start={
            <>
              <Button label="New" icon={Plus} size="small" />
              <Button label="Delete" icon={Trash2} severity="danger" outlined size="small" />
            </>
          }
          end={<Input inputSize="small" iconLeft={Search} placeholder="Search" className="w-48" />}
        />
      </Demo>

      <Demo title="Divider" description="Separator, optionally with a label.">
        <div className="space-y-3">
          <Separator />
          <Separator label="OR" />
        </div>
      </Demo>

      <Demo title="Inplace" description="Click-to-edit.">
        <Inplace display={<span className="text-primary">{editName} (click to edit)</span>} closable>
          <Input inputSize="small" value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus />
        </Inplace>
      </Demo>
    </Page>
  )
}
