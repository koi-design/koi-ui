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
import { Page, Demo, ApiSection, ApiBlock } from '../docs/Example'

const cardCode = `import { Card, Button } from 'koi-ui'

<Card title="Profile" subtitle="Account details">
  <p>Card body content.</p>
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
  <p>Footer separated by a divider.</p>
</Card>`

const accordionCode = `import { Accordion } from 'koi-ui'

<Accordion
  items={[
    { value: '1', header: 'What is koi-ui?', content: 'A prop-driven React component library.' },
    { value: '2', header: 'Is it themeable?', content: 'Yes, via CSS variables (light + dark).' },
  ]}
/>`

const panelCode = `import { Panel } from 'koi-ui'

<Panel header="Toggleable panel" toggleable>
  <p>Collapsible content area.</p>
</Panel>`

const fieldsetCode = `import { Fieldset } from 'koi-ui'
import { Home } from 'lucide-react'

<Fieldset legend="Address" icon={Home} toggleable>
  <p>Grouped fields go here.</p>
</Fieldset>`

const tabsCode = `import { Tabs } from 'koi-ui'

<Tabs
  tabs={[
    { value: 'a', label: 'Overview', content: 'Overview content' },
    { value: 'b', label: 'Settings', content: 'Settings content' },
    { value: 'c', label: 'Alerts', content: 'Alerts content' },
  ]}
/>`

const splitterCode = `import { Splitter } from 'koi-ui'

<Splitter
  className="h-32"
  panels={[
    { content: <div className="p-3 text-sm">Left</div>, size: 40 },
    { content: <div className="p-3 text-sm">Right</div> },
  ]}
/>`

const scrollAreaCode = `import { ScrollArea } from 'koi-ui'

<ScrollArea className="h-32 rounded-md border border-border p-3">
  <div className="space-y-2 text-sm">
    {rows.map((row, i) => (
      <div key={i}>Scrollable row {i + 1}</div>
    ))}
  </div>
</ScrollArea>`

const toolbarCode = `import { Toolbar, Button, Input } from 'koi-ui'
import { Plus, Trash2, Search } from 'lucide-react'

<Toolbar
  start={
    <>
      <Button label="New" icon={Plus} size="small" />
      <Button label="Delete" icon={Trash2} severity="danger" outlined size="small" />
    </>
  }
  end={<Input inputSize="small" iconLeft={Search} placeholder="Search" className="w-48" />}
/>`

const dividerCode = `import { Separator } from 'koi-ui'

<Separator />
<Separator label="OR" />`

const inplaceCode = `import { Inplace, Input } from 'koi-ui'

const [name, setName] = useState('Quentin')

<Inplace display={<span className="text-primary">{name} (click to edit)</span>} closable>
  <Input inputSize="small" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
</Inplace>`

export function PanelsPage() {
  const [editName, setEditName] = useState('Quentin')
  return (
    <Page title="Panels & Layout" intro="Containers and layout primitives.">
      <Demo title="Card" description="title / subtitle / header / footer + body." code={cardCode}>
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

      <Demo title="Accordion" description="Collapsible panels (single or multiple)." code={accordionCode}>
        <Accordion
          items={[
            { value: '1', header: 'What is koi-ui?', content: 'A prop-driven React component library.' },
            { value: '2', header: 'Is it themeable?', content: 'Yes, via CSS variables (light + dark).' },
          ]}
        />
      </Demo>

      <Demo title="Panel" description="Titled, optionally collapsible container." code={panelCode}>
        <Panel header="Toggleable panel" toggleable>
          <p className="text-sm text-muted-foreground">Collapsible content area.</p>
        </Panel>
      </Demo>

      <Demo title="Fieldset" description="Grouping box with a legend." code={fieldsetCode}>
        <Fieldset legend="Address" icon={Home} toggleable>
          <p className="text-sm text-muted-foreground">Grouped fields go here.</p>
        </Fieldset>
      </Demo>

      <Demo title="Tabs" description="Model-driven tab view." code={tabsCode}>
        <Tabs
          tabs={[
            { value: 'a', label: 'Overview', content: 'Overview content' },
            { value: 'b', label: 'Settings', content: 'Settings content' },
            { value: 'c', label: 'Alerts', content: 'Alerts content' },
          ]}
        />
      </Demo>

      <Demo title="Splitter" description="Resizable panels." code={splitterCode}>
        <Splitter
          className="h-32"
          panels={[
            { content: <div className="p-3 text-sm">Left</div>, size: 40 },
            { content: <div className="p-3 text-sm">Right</div> },
          ]}
        />
      </Demo>

      <Demo title="ScrollArea" description="Styled, cross-browser scroll container." code={scrollAreaCode}>
        <ScrollArea className="h-32 rounded-md border border-border p-3">
          <div className="space-y-2 text-sm">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i}>Scrollable row {i + 1}</div>
            ))}
          </div>
        </ScrollArea>
      </Demo>

      <Demo title="Toolbar" description="start / center / end regions." code={toolbarCode}>
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

      <Demo title="Divider" description="Separator, optionally with a label." code={dividerCode}>
        <div className="space-y-3">
          <Separator />
          <Separator label="OR" />
        </div>
      </Demo>

      <Demo title="Inplace" description="Click-to-edit." code={inplaceCode}>
        <Inplace display={<span className="text-primary">{editName} (click to edit)</span>} closable>
          <Input inputSize="small" value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus />
        </Inplace>
      </Demo>

      <ApiSection>
        <ApiBlock
          name="Card"
          rows={[
            { name: 'title', type: 'React.ReactNode', description: 'Card title rendered in the body header.' },
            { name: 'subtitle', type: 'React.ReactNode', description: 'Secondary line under the title.' },
            { name: 'header', type: 'React.ReactNode', description: 'Content rendered above the body, edge-to-edge (e.g. an image).' },
            { name: 'footer', type: 'React.ReactNode', description: 'Content rendered at the bottom, separated by a divider.' },
            { name: 'bodyClassName', type: 'string', description: 'Class applied to the inner body wrapper.' },
          ]}
        />
        <ApiBlock
          name="Accordion"
          rows={[
            { name: 'items', type: 'AccordionItem[]', description: 'Panels to render: { value, header, content, icon?, disabled? }.' },
            { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple panels open at once.' },
            { name: 'value', type: 'string | string[]', description: 'Controlled open value(s). String for single, string[] for multiple.' },
            { name: 'defaultValue', type: 'string | string[]', description: 'Uncontrolled initial open value(s).' },
            { name: 'onChange', type: '(value: string | string[]) => void', description: 'Fired when the open panel(s) change.' },
          ]}
        />
        <ApiBlock
          name="Panel"
          rows={[
            { name: 'header', type: 'React.ReactNode', description: 'Title shown in the panel header.' },
            { name: 'icons', type: 'React.ReactNode', description: 'Extra actions rendered on the right of the header.' },
            { name: 'footer', type: 'React.ReactNode', description: 'Content rendered below the body, separated by a divider.' },
            { name: 'toggleable', type: 'boolean', default: 'false', description: 'Allow collapsing via a toggle button.' },
            { name: 'collapsed', type: 'boolean', description: 'Controlled collapsed state.' },
            { name: 'defaultCollapsed', type: 'boolean', default: 'false', description: 'Uncontrolled initial collapsed state.' },
            { name: 'onToggle', type: '(collapsed: boolean) => void', description: 'Fired when the collapsed state changes.' },
          ]}
        />
        <ApiBlock
          name="Fieldset"
          rows={[
            { name: 'legend', type: 'React.ReactNode', description: 'Label rendered in the fieldset legend.' },
            { name: 'icon', type: 'LucideIcon', description: 'Icon shown beside the legend.' },
            { name: 'toggleable', type: 'boolean', default: 'false', description: 'Make the legend a collapse toggle.' },
            { name: 'collapsed', type: 'boolean', description: 'Controlled collapsed state.' },
            { name: 'defaultCollapsed', type: 'boolean', default: 'false', description: 'Uncontrolled initial collapsed state.' },
            { name: 'onToggle', type: '(collapsed: boolean) => void', description: 'Fired when the collapsed state changes.' },
          ]}
        />
        <ApiBlock
          name="Tabs"
          rows={[
            { name: 'tabs', type: 'TabItem[]', description: 'Tabs to render: { value, label, content, icon?, disabled? }.' },
            { name: 'value', type: 'string', description: 'Controlled active tab value.' },
            { name: 'defaultValue', type: 'string', default: 'tabs[0].value', description: 'Uncontrolled initial active tab.' },
            { name: 'onChange', type: '(value: string) => void', description: 'Fired when the active tab changes.' },
            { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Tab list orientation.' },
            { name: 'listClassName', type: 'string', description: 'Class applied to the tab list.' },
          ]}
        />
        <ApiBlock
          name="Splitter"
          rows={[
            { name: 'panels', type: 'SplitterPanel[]', description: 'Resizable panels: { content, size?, minSize?, maxSize? }.' },
            { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Split direction.' },
            { name: 'className', type: 'string', description: 'Class applied to the splitter wrapper (set sizing here).' },
          ]}
        />
        <ApiBlock
          name="ScrollArea"
          rows={[
            { name: 'orientation', type: "'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Which scrollbars to render.' },
            { name: 'viewportClassName', type: 'string', description: 'Class for the inner viewport.' },
            { name: 'className', type: 'string', description: 'Class applied to the root (set sizing here).' },
          ]}
        />
        <ApiBlock
          name="Toolbar"
          rows={[
            { name: 'start', type: 'React.ReactNode', description: 'Left-aligned content.' },
            { name: 'center', type: 'React.ReactNode', description: 'Centered content.' },
            { name: 'end', type: 'React.ReactNode', description: 'Right-aligned content.' },
          ]}
        />
        <ApiBlock
          name="Divider"
          rows={[
            { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Divider direction.' },
            { name: 'label', type: 'React.ReactNode', description: 'Optional centered label (horizontal only).' },
            { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Label alignment when `label` is set.' },
          ]}
        />
        <ApiBlock
          name="Inplace"
          rows={[
            { name: 'display', type: 'React.ReactNode', description: 'Content shown when inactive (click to edit).' },
            { name: 'children', type: 'React.ReactNode', description: 'Content shown when active (the editor).' },
            { name: 'closable', type: 'boolean', default: 'false', description: 'Show a close button to return to display mode.' },
            { name: 'active', type: 'boolean', description: 'Controlled active state.' },
            { name: 'defaultActive', type: 'boolean', default: 'false', description: 'Uncontrolled initial active state.' },
            { name: 'onActiveChange', type: '(active: boolean) => void', description: 'Fired when the active state changes.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable activation.' },
          ]}
        />
      </ApiSection>
    </Page>
  )
}
