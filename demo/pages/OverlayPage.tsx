import { useState } from 'react'
import { Save, Trash2 } from 'lucide-react'
import { Button, Dialog, ConfirmDialog, Sheet, Popover, Tooltip, toast } from '@/index'
import { Page, Demo } from '../docs/Example'

export function OverlayPage() {
  const [dialog, setDialog] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [sheet, setSheet] = useState(false)
  return (
    <Page title="Overlay" intro="Modals, drawers and floating panels — all prop-driven (visible / onHide).">
      <Demo title="Dialog" description="visible, onHide, header, footer.">
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

      <Demo title="ConfirmDialog" description="Confirmation with accept / reject.">
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

      <Demo title="Sheet" description="Slide-in drawer (left / right / top / bottom).">
        <Button label="Open sheet" severity="secondary" onClick={() => setSheet(true)} />
        <Sheet visible={sheet} onHide={() => setSheet(false)} position="right" header="Filters">
          <p className="text-muted-foreground">Slide-in drawer content.</p>
        </Sheet>
      </Demo>

      <Demo title="Popover" description="Floating panel anchored to a trigger.">
        <Popover trigger={<Button label="Open popover" severity="secondary" outlined />}>
          <p className="font-medium">Popover panel</p>
          <p className="mt-1 text-muted-foreground">Anchored floating content.</p>
        </Popover>
      </Demo>

      <Demo title="Tooltip" description="Hover / focus hint.">
        <Tooltip content="Save changes">
          <Button icon={Save} text aria-label="save" />
        </Tooltip>
      </Demo>
    </Page>
  )
}
