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
import { Page, Demo } from '../docs/Example'

export function NavigationPage() {
  const [tabIdx, setTabIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(1)
  return (
    <Page title="Navigation" intro="Menus, breadcrumbs and step indicators driven by a shared MenuItem model.">
      <Demo title="Menu" description="Vertical list menu, optionally grouped.">
        <Menu
          model={[
            { label: 'Account', items: [{ label: 'Settings', icon: Settings }, { label: 'Logout', icon: User }] },
          ]}
        />
      </Demo>

      <Demo title="Menubar" description="Horizontal application menu with nested submenus.">
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

      <Demo title="Breadcrumb" description="Navigation trail with an optional home item.">
        <Breadcrumb home={{ icon: Home, url: '#' }} model={[{ label: 'Users', url: '#' }, { label: 'Edit' }]} />
      </Demo>

      <Demo title="ContextMenu" description="Right-click menu wrapping a target.">
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

      <Demo title="TieredMenu" description="Vertical menu with nested submenus on hover.">
        <TieredMenu
          model={[
            { label: 'New', icon: Plus },
            { label: 'Export', items: [{ label: 'PDF' }, { label: 'CSV' }, { label: 'More', items: [{ label: 'XML' }] }] },
            { separator: true },
            { label: 'Quit' },
          ]}
        />
      </Demo>

      <Demo title="MegaMenu" description="Horizontal menu with multi-column dropdown panels.">
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

      <Demo title="PanelMenu" description="Vertical accordion-style nested menu.">
        <PanelMenu
          model={[
            { label: 'Users', icon: User, items: [{ label: 'List' }, { label: 'Create' }] },
            { label: 'Files', icon: FileText, items: [{ label: 'Documents' }, { label: 'Images' }] },
          ]}
        />
      </Demo>

      <Demo title="TabMenu" description="Tab-style navigation (no content panels).">
        <TabMenu
          model={[{ label: 'Dashboard', icon: Home }, { label: 'Settings', icon: Settings }, { label: 'Alerts', icon: Bell }]}
          activeIndex={tabIdx}
          onChange={setTabIdx}
        />
      </Demo>

      <Demo title="Steps" description="Horizontal step indicator.">
        <Steps
          model={[{ label: 'Cart' }, { label: 'Address' }, { label: 'Payment' }, { label: 'Done' }]}
          activeIndex={stepIdx}
          readonly={false}
          onChange={setStepIdx}
        />
      </Demo>
    </Page>
  )
}
