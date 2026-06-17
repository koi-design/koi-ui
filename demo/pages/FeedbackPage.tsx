import { useState } from 'react'
import { Star, Check, User } from 'lucide-react'
import {
  Button,
  Badge,
  Tag,
  Chip,
  Progress,
  Skeleton,
  Avatar,
  AvatarGroup,
  Message,
  Messages,
  toast,
} from '@/index'
import { Page, Demo, Row } from '../docs/Example'

const SEV = ['primary', 'success', 'info', 'warning', 'danger', 'help'] as const

export function FeedbackPage() {
  const [msgs, setMsgs] = useState([
    { id: 1, severity: 'success' as const, text: 'Profile saved' },
    { id: 2, severity: 'warn' as const, text: 'Subscription expiring soon' },
  ])
  return (
    <Page title="Feedback" intro="Status, notifications and placeholders.">
      <Demo title="Toast" description="Imperative notifications via the toast helper (sonner).">
        <Row>
          <Button label="Default" severity="secondary" onClick={() => toast('Event created')} />
          <Button label="Success" severity="success" onClick={() => toast.success('Saved!')} />
          <Button label="Error" severity="danger" onClick={() => toast.error('Failed')} />
        </Row>
      </Demo>

      <Demo title="Message" description="Inline tinted messages; Messages renders a removable stack.">
        <div className="max-w-md space-y-2">
          <Message severity="info" text="This is an inline info message." />
          <Messages value={msgs} onRemove={(id) => setMsgs((m) => m.filter((x) => x.id !== id))} />
        </div>
      </Demo>

      <Demo title="Badge" description="Counts and dots.">
        <Row>
          <Badge value={8} severity="danger" />
          <Badge value="NEW" severity="success" />
          <Badge dot severity="warning" />
        </Row>
      </Demo>

      <Demo title="Tag" description="Labeled status indicator.">
        <Row>
          {SEV.map((s) => (
            <Tag key={s} value={s} severity={s} />
          ))}
          <Tag value="rounded" severity="success" rounded icon={Check} />
        </Row>
      </Demo>

      <Demo title="Chip" description="Compact entity with icon / image / remove.">
        <Row>
          <Chip label="Apple" icon={Star} />
          <Chip label="Quentin" image="https://i.pravatar.cc/40?img=12" removable onRemove={() => toast('removed')} />
          <Chip label="Removable" removable onRemove={() => toast('removed')} />
        </Row>
      </Demo>

      <Demo title="Progress" description="Determinate and indeterminate.">
        <div className="max-w-sm space-y-3">
          <Progress value={60} showValue />
          <Progress mode="indeterminate" severity="info" />
        </div>
      </Demo>

      <Demo title="Skeleton" description="Loading placeholders.">
        <div className="flex items-center gap-3">
          <Skeleton shape="circle" width={40} height={40} />
          <div className="space-y-2">
            <Skeleton width={160} height={12} />
            <Skeleton width={120} height={12} />
          </div>
        </div>
      </Demo>

      <Demo title="Avatar" description="Image / label / icon, with grouping.">
        <Row>
          <Avatar label="QN" />
          <Avatar icon={User} shape="square" />
          <AvatarGroup max={3}>
            <Avatar label="A" />
            <Avatar label="B" />
            <Avatar label="C" />
            <Avatar label="D" />
            <Avatar label="E" />
          </AvatarGroup>
        </Row>
      </Demo>

      <Demo title="ScrollTop" description="A floating button appears after scrolling — see the bottom-right corner.">
        <p className="text-sm text-muted-foreground">Scroll the page; the back-to-top button shows past 300px.</p>
      </Demo>
    </Page>
  )
}
