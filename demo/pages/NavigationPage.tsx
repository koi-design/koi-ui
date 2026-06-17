import { useState } from 'react'
import { Home, Settings, Bell, Plus, Copy, Scissors, Trash2, User, FileText, Star } from 'lucide-react'
import {
  Menu,
  Menubar,
  Breadcrumb,
  ContextMenu,
  TieredMenu,
  MegaMenu,
  PanelMenu,
  TabMenu,
  Steps,
  toast,
} from '@/index'
import { Page, Demo, ApiSection, ApiBlock } from '../docs/Example'

const menuCode = `import { Menu } from 'koi-ui'
import { Settings, User } from 'lucide-react'

<Menu
  model={[
    { label: 'Account', items: [{ label: 'Settings', icon: Settings }, { label: 'Logout', icon: User }] },
  ]}
/>`

const menubarCode = `import { Menubar, toast } from 'koi-ui'
import { Plus, Copy, Scissors } from 'lucide-react'

<Menubar
  model={[
    {
      label: 'File',
      items: [
        { label: 'New', icon: Plus, shortcut: '⌘N', command: () => toast('New') },
        { separator: true },
        { label: 'Export', items: [{ label: 'PDF' }, { label: 'CSV' }] },
      ],
    },
    { label: 'Edit', items: [{ label: 'Copy', icon: Copy }, { label: 'Cut', icon: Scissors }] },
  ]}
/>`

const breadcrumbCode = `import { Breadcrumb } from 'koi-ui'
import { Home } from 'lucide-react'

<Breadcrumb home={{ icon: Home, url: '#' }} model={[{ label: 'Users', url: '#' }, { label: 'Edit' }]} />`

const contextMenuCode = `import { ContextMenu, toast } from 'koi-ui'
import { Copy, Trash2 } from 'lucide-react'

<ContextMenu
  model={[
    { label: 'Copy', icon: Copy, command: () => toast('Copied') },
    { label: 'Delete', icon: Trash2, command: () => toast.error('Deleted') },
  ]}
>
  <div>Right-click me</div>
</ContextMenu>`

const tieredMenuCode = `import { TieredMenu } from 'koi-ui'
import { Plus } from 'lucide-react'

<TieredMenu
  model={[
    { label: 'New', icon: Plus },
    { label: 'Export', items: [{ label: 'PDF' }, { label: 'CSV' }, { label: 'More', items: [{ label: 'XML' }] }] },
    { separator: true },
    { label: 'Quit' },
  ]}
/>`

const megaMenuCode = `import { MegaMenu } from 'koi-ui'
import { Star } from 'lucide-react'

<MegaMenu
  model={[
    {
      label: 'Products',
      columns: [
        [{ label: 'Phones', icon: Star }, { label: 'Laptops' }],
        [{ label: 'Tablets' }, { label: 'Watches' }],
      ],
    },
    { label: 'Company', columns: [[{ label: 'About' }, { label: 'Careers' }]] },
    { label: 'Contact' },
  ]}
/>`

const panelMenuCode = `import { PanelMenu } from 'koi-ui'
import { User, FileText } from 'lucide-react'

<PanelMenu
  model={[
    { label: 'Users', icon: User, items: [{ label: 'List' }, { label: 'Create' }] },
    { label: 'Files', icon: FileText, items: [{ label: 'Documents' }, { label: 'Images' }] },
  ]}
/>`

const tabMenuCode = `import { TabMenu } from 'koi-ui'
import { Home, Settings, Bell } from 'lucide-react'

const [tabIdx, setTabIdx] = useState(0)

<TabMenu
  model={[{ label: 'Dashboard', icon: Home }, { label: 'Settings', icon: Settings }, { label: 'Alerts', icon: Bell }]}
  activeIndex={tabIdx}
  onChange={setTabIdx}
/>`

const stepsCode = `import { Steps } from 'koi-ui'

const [stepIdx, setStepIdx] = useState(1)

<Steps
  model={[{ label: 'Cart' }, { label: 'Address' }, { label: 'Payment' }, { label: 'Done' }]}
  activeIndex={stepIdx}
  readonly={false}
  onChange={setStepIdx}
/>`

export function NavigationPage() {
  const [tabIdx, setTabIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(1)
  return (
    <Page title="Navigation" intro="Menus, breadcrumbs and step indicators driven by a shared MenuItem model.">
      <Demo title="Menu" description="Vertical list menu, optionally grouped." code={menuCode}>
        <Menu
          model={[
            { label: 'Account', items: [{ label: 'Settings', icon: Settings }, { label: 'Logout', icon: User }] },
          ]}
        />
      </Demo>

      <Demo title="Menubar" description="Horizontal application menu with nested submenus." code={menubarCode}>
        <Menubar
          model={[
            {
              label: 'File',
              items: [
                { label: 'New', icon: Plus, shortcut: '⌘N', command: () => toast('New') },
                { separator: true },
                { label: 'Export', items: [{ label: 'PDF' }, { label: 'CSV' }] },
              ],
            },
            { label: 'Edit', items: [{ label: 'Copy', icon: Copy }, { label: 'Cut', icon: Scissors }] },
          ]}
        />
      </Demo>

      <Demo title="Breadcrumb" description="Navigation trail with an optional home item." code={breadcrumbCode}>
        <Breadcrumb home={{ icon: Home, url: '#' }} model={[{ label: 'Users', url: '#' }, { label: 'Edit' }]} />
      </Demo>

      <Demo title="ContextMenu" description="Right-click menu wrapping a target." code={contextMenuCode}>
        <ContextMenu
          model={[
            { label: 'Copy', icon: Copy, command: () => toast('Copied') },
            { label: 'Delete', icon: Trash2, command: () => toast.error('Deleted') },
          ]}
        >
          <div className="grid h-20 place-items-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
            Right-click me
          </div>
        </ContextMenu>
      </Demo>

      <Demo title="TieredMenu" description="Vertical menu with nested submenus on hover." code={tieredMenuCode}>
        <TieredMenu
          model={[
            { label: 'New', icon: Plus },
            { label: 'Export', items: [{ label: 'PDF' }, { label: 'CSV' }, { label: 'More', items: [{ label: 'XML' }] }] },
            { separator: true },
            { label: 'Quit' },
          ]}
        />
      </Demo>

      <Demo title="MegaMenu" description="Horizontal menu with multi-column dropdown panels." code={megaMenuCode}>
        <MegaMenu
          model={[
            {
              label: 'Products',
              columns: [
                [{ label: 'Phones', icon: Star }, { label: 'Laptops' }],
                [{ label: 'Tablets' }, { label: 'Watches' }],
              ],
            },
            { label: 'Company', columns: [[{ label: 'About' }, { label: 'Careers' }]] },
            { label: 'Contact' },
          ]}
        />
      </Demo>

      <Demo title="PanelMenu" description="Vertical accordion-style nested menu." code={panelMenuCode}>
        <PanelMenu
          model={[
            { label: 'Users', icon: User, items: [{ label: 'List' }, { label: 'Create' }] },
            { label: 'Files', icon: FileText, items: [{ label: 'Documents' }, { label: 'Images' }] },
          ]}
        />
      </Demo>

      <Demo title="TabMenu" description="Tab-style navigation (no content panels)." code={tabMenuCode}>
        <TabMenu
          model={[{ label: 'Dashboard', icon: Home }, { label: 'Settings', icon: Settings }, { label: 'Alerts', icon: Bell }]}
          activeIndex={tabIdx}
          onChange={setTabIdx}
        />
      </Demo>

      <Demo title="Steps" description="Horizontal step indicator." code={stepsCode}>
        <Steps
          model={[{ label: 'Cart' }, { label: 'Address' }, { label: 'Payment' }, { label: 'Done' }]}
          activeIndex={stepIdx}
          readonly={false}
          onChange={setStepIdx}
        />
      </Demo>

      <ApiSection>
        <ApiBlock
          name="Menu"
          rows={[
            {
              name: 'model',
              type: 'MenuItem[]',
              description:
                'Items to render. A MenuItem has label, icon, command, url, shortcut, items, separator and disabled; an item with `items` becomes a labeled group.',
            },
            { name: 'className', type: 'string', description: 'Extra classes on the root element.' },
          ]}
        />

        <ApiBlock
          name="Menubar"
          rows={[
            {
              name: 'model',
              type: 'MenubarMenu[]',
              description:
                'Top-level menus, each `{ label, items }` where items is a MenuItem[] (supports nested submenus and separators).',
            },
            { name: 'className', type: 'string', description: 'Extra classes on the root element.' },
          ]}
        />

        <ApiBlock
          name="Breadcrumb"
          rows={[
            {
              name: 'model',
              type: 'BreadcrumbItem[]',
              description: 'Trail items, each `{ label, icon, url, command }`. The last item renders as the current page.',
            },
            {
              name: 'home',
              type: 'BreadcrumbItem',
              description: 'Leading "home" item rendered before the model.',
            },
            {
              name: 'separator',
              type: 'React.ReactNode',
              default: '<ChevronRight/>',
              description: 'Node rendered between items.',
            },
            { name: 'className', type: 'string', description: 'Extra classes on the root element.' },
          ]}
        />

        <ApiBlock
          name="ContextMenu"
          rows={[
            {
              name: 'model',
              type: 'MenuItem[]',
              description:
                'Menu items shown on right-click. A MenuItem supports label, icon, command, shortcut, nested items, separator and disabled.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              description: 'The element that responds to right-click.',
            },
            { name: 'className', type: 'string', description: 'Classes applied to the trigger wrapper.' },
          ]}
        />

        <ApiBlock
          name="TieredMenu"
          rows={[
            {
              name: 'model',
              type: 'MenuItem[]',
              description:
                'Items to render. An item with `items` opens a nested submenu on hover; supports icon, command, url, shortcut, separator and disabled.',
            },
            { name: 'className', type: 'string', description: 'Extra classes on the root element.' },
          ]}
        />

        <ApiBlock
          name="MegaMenu"
          rows={[
            {
              name: 'model',
              type: 'MegaMenuItem[]',
              description:
                'Top-level entries, each `{ label, icon, columns }` where columns is a MenuItem[][] rendered as panel columns.',
            },
            { name: 'className', type: 'string', description: 'Extra classes on the root element.' },
          ]}
        />

        <ApiBlock
          name="PanelMenu"
          rows={[
            {
              name: 'model',
              type: 'MenuItem[]',
              description:
                'Items to render. An item with `items` becomes a collapsible group; leaves support icon, command, url and disabled.',
            },
            {
              name: 'multiple',
              type: 'boolean',
              default: 'false',
              description: 'Allow multiple top-level groups open at once.',
            },
            { name: 'className', type: 'string', description: 'Extra classes on the root element.' },
          ]}
        />

        <ApiBlock
          name="TabMenu"
          rows={[
            {
              name: 'model',
              type: 'MenuItem[]',
              description: 'Tabs to render; each MenuItem supports label, icon, command and disabled.',
            },
            {
              name: 'activeIndex',
              type: 'number',
              default: '0',
              description: 'Index of the active tab.',
            },
            {
              name: 'onChange',
              type: '(index: number) => void',
              description: 'Called with the new index when a tab is selected.',
            },
            { name: 'className', type: 'string', description: 'Extra classes on the root element.' },
          ]}
        />

        <ApiBlock
          name="Steps"
          rows={[
            {
              name: 'model',
              type: 'StepItem[]',
              description: 'Steps to render, each `{ label, icon, disabled }`.',
            },
            {
              name: 'activeIndex',
              type: 'number',
              default: '0',
              description: 'Index of the current step; earlier steps render as completed.',
            },
            {
              name: 'readonly',
              type: 'boolean',
              default: 'true',
              description: 'When false, steps are clickable to navigate.',
            },
            {
              name: 'onChange',
              type: '(index: number) => void',
              description: 'Called with the clicked index when not readonly.',
            },
            { name: 'className', type: 'string', description: 'Extra classes on the root element.' },
          ]}
        />
      </ApiSection>
    </Page>
  )
}
