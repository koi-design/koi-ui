import { useState } from 'react'
import { Save, Trash2 } from 'lucide-react'
import { Button, Dialog, ConfirmDialog, Sheet, Popover, Tooltip, toast } from '@/index'
import { Page, Demo, ApiSection, ApiBlock } from '../docs/Example'

const dialogCode = `import { useState } from 'react'
import { Dialog, Button } from 'koi-ui'

function Example() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button label="Open dialog" onClick={() => setVisible(true)} />
      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        header="Edit profile"
        footer={
          <>
            <Button label="Cancel" severity="secondary" text onClick={() => setVisible(false)} />
            <Button label="Save" onClick={() => setVisible(false)} />
          </>
        }
      >
        Make changes to your profile here.
      </Dialog>
    </>
  )
}`

const confirmDialogCode = `import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { ConfirmDialog, Button, toast } from 'koi-ui'

function Example() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button label="Delete" severity="danger" outlined onClick={() => setVisible(true)} />
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        header="Delete item?"
        message="This action cannot be undone."
        severity="danger"
        icon={Trash2}
        acceptLabel="Delete"
        onAccept={() => toast.error('Deleted')}
      />
    </>
  )
}`

const sheetCode = `import { useState } from 'react'
import { Sheet, Button } from 'koi-ui'

function Example() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button label="Open sheet" severity="secondary" onClick={() => setVisible(true)} />
      <Sheet visible={visible} onHide={() => setVisible(false)} position="right" header="Filters">
        <p className="text-muted-foreground">Slide-in drawer content.</p>
      </Sheet>
    </>
  )
}`

const popoverCode = `import { Popover, Button } from 'koi-ui'

function Example() {
  return (
    <Popover trigger={<Button label="Open popover" severity="secondary" outlined />}>
      <p className="font-medium">Popover panel</p>
      <p className="mt-1 text-muted-foreground">Anchored floating content.</p>
    </Popover>
  )
}`

const tooltipCode = `import { Save } from 'lucide-react'
import { Tooltip, Button } from 'koi-ui'

function Example() {
  return (
    <Tooltip content="Save changes">
      <Button icon={Save} text aria-label="save" />
    </Tooltip>
  )
}`

export function OverlayPage() {
  const [dialog, setDialog] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [sheet, setSheet] = useState(false)
  return (
    <Page title="Overlay" intro="Modals, drawers and floating panels — all prop-driven (visible / onHide).">
      <Demo title="Dialog" description="visible, onHide, header, footer." code={dialogCode}>
        <Button label="Open dialog" onClick={() => setDialog(true)} />
        <Dialog
          visible={dialog}
          onHide={() => setDialog(false)}
          header="Edit profile"
          footer={
            <>
              <Button label="Cancel" severity="secondary" text onClick={() => setDialog(false)} />
              <Button label="Save" onClick={() => setDialog(false)} />
            </>
          }
        >
          Make changes to your profile here.
        </Dialog>
      </Demo>

      <Demo title="ConfirmDialog" description="Confirmation with accept / reject." code={confirmDialogCode}>
        <Button label="Delete" severity="danger" outlined onClick={() => setConfirm(true)} />
        <ConfirmDialog
          visible={confirm}
          onHide={() => setConfirm(false)}
          header="Delete item?"
          message="This action cannot be undone."
          severity="danger"
          icon={Trash2}
          acceptLabel="Delete"
          onAccept={() => toast.error('Deleted')}
        />
      </Demo>

      <Demo title="Sheet" description="Slide-in drawer (left / right / top / bottom)." code={sheetCode}>
        <Button label="Open sheet" severity="secondary" onClick={() => setSheet(true)} />
        <Sheet visible={sheet} onHide={() => setSheet(false)} position="right" header="Filters">
          <p className="text-muted-foreground">Slide-in drawer content.</p>
        </Sheet>
      </Demo>

      <Demo title="Popover" description="Floating panel anchored to a trigger." code={popoverCode}>
        <Popover trigger={<Button label="Open popover" severity="secondary" outlined />}>
          <p className="font-medium">Popover panel</p>
          <p className="mt-1 text-muted-foreground">Anchored floating content.</p>
        </Popover>
      </Demo>

      <Demo title="Tooltip" description="Hover / focus hint." code={tooltipCode}>
        <Tooltip content="Save changes">
          <Button icon={Save} text aria-label="save" />
        </Tooltip>
      </Demo>

      <ApiSection>
        <ApiBlock
          name="Dialog"
          rows={[
            { name: 'visible', type: 'boolean', description: 'Controlled open state.' },
            { name: 'onHide', type: '() => void', description: 'Called when the dialog requests to close.' },
            { name: 'header', type: 'ReactNode', description: 'Title content rendered at the top.' },
            { name: 'footer', type: 'ReactNode', description: 'Footer content (typically action buttons).' },
            { name: 'children', type: 'ReactNode', description: 'Dialog body content.' },
            { name: 'closable', type: 'boolean', default: 'true', description: 'Show the top-right close button.' },
            {
              name: 'dismissableMask',
              type: 'boolean',
              default: 'true',
              description: 'Close when clicking the backdrop.',
            },
            { name: 'className', type: 'string', description: 'Extra classes for the dialog content.' },
            {
              name: 'widthClassName',
              type: 'string',
              default: "'max-w-lg'",
              description: 'Width utility class, e.g. "max-w-2xl".',
            },
          ]}
        />
        <ApiBlock
          name="ConfirmDialog"
          rows={[
            { name: 'visible', type: 'boolean', description: 'Controlled open state.' },
            { name: 'onHide', type: '() => void', description: 'Called when the dialog requests to close.' },
            { name: 'header', type: 'ReactNode', default: "'Confirm'", description: 'Title content.' },
            { name: 'message', type: 'ReactNode', description: 'Confirmation message body.' },
            { name: 'icon', type: 'LucideIcon', description: 'Optional icon shown beside the header.' },
            { name: 'acceptLabel', type: 'string', default: "'Yes'", description: 'Label for the accept button.' },
            { name: 'rejectLabel', type: 'string', default: "'No'", description: 'Label for the reject button.' },
            {
              name: 'severity',
              type: "'primary' | 'danger' | 'success' | 'warning'",
              default: "'primary'",
              description: 'Severity applied to the accept button.',
            },
            { name: 'onAccept', type: '() => void', description: 'Called when the accept button is pressed.' },
            { name: 'onReject', type: '() => void', description: 'Called when the reject button is pressed.' },
            { name: 'className', type: 'string', description: 'Extra classes for the dialog content.' },
          ]}
        />
        <ApiBlock
          name="Sheet"
          rows={[
            { name: 'visible', type: 'boolean', description: 'Controlled open state.' },
            { name: 'onHide', type: '() => void', description: 'Called when the sheet requests to close.' },
            {
              name: 'position',
              type: "'left' | 'right' | 'top' | 'bottom'",
              default: "'right'",
              description: 'Edge the drawer slides in from.',
            },
            { name: 'header', type: 'ReactNode', description: 'Title content rendered at the top.' },
            { name: 'children', type: 'ReactNode', description: 'Sheet body content.' },
            { name: 'closable', type: 'boolean', default: 'true', description: 'Show the top-right close button.' },
            {
              name: 'dismissableMask',
              type: 'boolean',
              default: 'true',
              description: 'Close when clicking the backdrop.',
            },
            { name: 'className', type: 'string', description: 'Extra classes for the sheet content.' },
          ]}
        />
        <ApiBlock
          name="Popover"
          rows={[
            { name: 'trigger', type: 'ReactNode', description: 'Element that toggles the popover.' },
            { name: 'children', type: 'ReactNode', description: 'Popover panel content.' },
            {
              name: 'side',
              type: "'top' | 'right' | 'bottom' | 'left'",
              default: "'bottom'",
              description: 'Preferred side relative to the trigger.',
            },
            {
              name: 'align',
              type: "'start' | 'center' | 'end'",
              default: "'center'",
              description: 'Alignment along the chosen side.',
            },
            { name: 'open', type: 'boolean', description: 'Controlled open state (optional).' },
            { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when the open state changes.' },
            { name: 'className', type: 'string', description: 'Extra classes for the trigger wrapper.' },
            { name: 'contentClassName', type: 'string', description: 'Extra classes for the popover panel.' },
          ]}
        />
        <ApiBlock
          name="Tooltip"
          rows={[
            { name: 'content', type: 'ReactNode', description: 'Tooltip text/content.' },
            { name: 'children', type: 'ReactNode', description: 'Element the tooltip is attached to.' },
            {
              name: 'side',
              type: "'top' | 'right' | 'bottom' | 'left'",
              default: "'top'",
              description: 'Preferred side relative to the trigger.',
            },
            {
              name: 'align',
              type: "'start' | 'center' | 'end'",
              default: "'center'",
              description: 'Alignment along the chosen side.',
            },
            { name: 'delay', type: 'number', default: '200', description: 'Delay before showing, in ms.' },
            { name: 'className', type: 'string', description: 'Extra classes for the tooltip content.' },
          ]}
        />
      </ApiSection>
    </Page>
  )
}
