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
import { Page, Demo, Row, ApiSection, ApiBlock } from '../docs/Example'

const SEV = ['primary', 'success', 'info', 'warning', 'danger', 'help'] as const

const toastCode = `import { toast } from 'koi-ui'

toast('Event created')
toast.success('Saved!')
toast.error('Failed')`

const messageCode = `import { Message, Messages } from 'koi-ui'

<Message severity="info" text="This is an inline info message." />
<Messages value={msgs} onRemove={(id) => remove(id)} />`

const badgeCode = `import { Badge } from 'koi-ui'

<Badge value={8} severity="danger" />
<Badge value="NEW" severity="success" />
<Badge dot severity="warning" />`

const tagCode = `import { Tag } from 'koi-ui'
import { Check } from 'lucide-react'

<Tag value="success" severity="success" />
<Tag value="rounded" severity="success" rounded icon={Check} />`

const chipCode = `import { Chip } from 'koi-ui'
import { Star } from 'lucide-react'

<Chip label="Apple" icon={Star} />
<Chip label="Quentin" image="/avatar.png" removable onRemove={() => {}} />
<Chip label="Removable" removable onRemove={() => {}} />`

const progressCode = `import { Progress } from 'koi-ui'

<Progress value={60} showValue />
<Progress mode="indeterminate" severity="info" />`

const skeletonCode = `import { Skeleton } from 'koi-ui'

<Skeleton shape="circle" width={40} height={40} />
<Skeleton width={160} height={12} />`

const avatarCode = `import { Avatar, AvatarGroup } from 'koi-ui'
import { User } from 'lucide-react'

<Avatar label="QN" />
<Avatar icon={User} shape="square" />
<AvatarGroup max={3}>
  <Avatar label="A" />
  <Avatar label="B" />
  <Avatar label="C" />
  <Avatar label="D" />
</AvatarGroup>`

const scrollTopCode = `import { ScrollTop } from 'koi-ui'

<ScrollTop threshold={300} />`

export function FeedbackPage() {
  const [msgs, setMsgs] = useState([
    { id: 1, severity: 'success' as const, text: 'Profile saved' },
    { id: 2, severity: 'warn' as const, text: 'Subscription expiring soon' },
  ])
  return (
    <Page title="Feedback" intro="Status, notifications and placeholders.">
      <Demo title="Toast" description="Imperative notifications via the toast helper (sonner)." code={toastCode}>
        <Row>
          <Button label="Default" severity="secondary" onClick={() => toast('Event created')} />
          <Button label="Success" severity="success" onClick={() => toast.success('Saved!')} />
          <Button label="Error" severity="danger" onClick={() => toast.error('Failed')} />
        </Row>
      </Demo>

      <Demo title="Message" description="Inline tinted messages; Messages renders a removable stack." code={messageCode}>
        <div className="max-w-md space-y-2">
          <Message severity="info" text="This is an inline info message." />
          <Messages value={msgs} onRemove={(id) => setMsgs((m) => m.filter((x) => x.id !== id))} />
        </div>
      </Demo>

      <Demo title="Badge" description="Counts and dots." code={badgeCode}>
        <Row>
          <Badge value={8} severity="danger" />
          <Badge value="NEW" severity="success" />
          <Badge dot severity="warning" />
        </Row>
      </Demo>

      <Demo title="Tag" description="Labeled status indicator." code={tagCode}>
        <Row>
          {SEV.map((s) => (
            <Tag key={s} value={s} severity={s} />
          ))}
          <Tag value="rounded" severity="success" rounded icon={Check} />
        </Row>
      </Demo>

      <Demo title="Chip" description="Compact entity with icon / image / remove." code={chipCode}>
        <Row>
          <Chip label="Apple" icon={Star} />
          <Chip label="Quentin" image="https://i.pravatar.cc/40?img=12" removable onRemove={() => toast('removed')} />
          <Chip label="Removable" removable onRemove={() => toast('removed')} />
        </Row>
      </Demo>

      <Demo title="Progress" description="Determinate and indeterminate." code={progressCode}>
        <div className="max-w-sm space-y-3">
          <Progress value={60} showValue />
          <Progress mode="indeterminate" severity="info" />
        </div>
      </Demo>

      <Demo title="Skeleton" description="Loading placeholders." code={skeletonCode}>
        <div className="flex items-center gap-3">
          <Skeleton shape="circle" width={40} height={40} />
          <div className="space-y-2">
            <Skeleton width={160} height={12} />
            <Skeleton width={120} height={12} />
          </div>
        </div>
      </Demo>

      <Demo title="Avatar" description="Image / label / icon, with grouping." code={avatarCode}>
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

      <Demo title="ScrollTop" description="A floating button appears after scrolling — see the bottom-right corner." code={scrollTopCode}>
        <p className="text-sm text-muted-foreground">Scroll the page; the back-to-top button shows past 300px.</p>
      </Demo>

      <ApiSection>
        <ApiBlock
          name="toast"
          rows={[
            {
              name: 'toast(message, options?)',
              type: '(message: ReactNode, options?) => string | number',
              description: 'Show a default notification. Returns the toast id.',
            },
            {
              name: 'toast.success / .error / .info / .warning',
              type: '(message: ReactNode, options?) => string | number',
              description: 'Severity-styled variants of the toast helper.',
            },
            {
              name: 'toast.promise / .dismiss / .custom',
              type: 'function',
              description: 'Promise-bound toasts, programmatic dismissal, and custom render (re-exported from sonner).',
            },
          ]}
        />
        <ApiBlock
          name="Toaster"
          rows={[
            {
              name: 'position',
              type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'",
              default: "'top-right'",
              description: 'Where toasts appear. Mount <Toaster /> once near the app root.',
            },
            {
              name: '...props',
              type: 'ComponentProps<typeof SonnerToaster>',
              description: 'Any other sonner Toaster prop (e.g. richColors, duration, expand).',
            },
          ]}
        />
        <ApiBlock
          name="Message"
          rows={[
            {
              name: 'severity',
              type: "'success' | 'info' | 'warn' | 'error'",
              default: "'info'",
              description: 'Tint and default leading icon.',
            },
            { name: 'text', type: 'ReactNode', description: 'Message content.' },
            {
              name: 'icon',
              type: 'LucideIcon | false',
              description: 'Override the leading icon, or false to hide it.',
            },
            { name: 'closable', type: 'boolean', default: 'false', description: 'Show a close button.' },
            { name: 'onClose', type: '() => void', description: 'Called when the close button is clicked.' },
          ]}
        />
        <ApiBlock
          name="Messages"
          rows={[
            {
              name: 'value',
              type: 'MessageItem[]',
              description: 'Items to render: { id, severity?, text }.',
            },
            {
              name: 'onRemove',
              type: '(id: string | number) => void',
              description: "Called with the item's id when its close button is clicked.",
            },
            {
              name: 'closable',
              type: 'boolean',
              default: 'true',
              description: 'Whether each message shows a close button.',
            },
          ]}
        />
        <ApiBlock
          name="Badge"
          rows={[
            { name: 'value', type: 'ReactNode', description: 'Text/number to display. Ignored when dot is set.' },
            {
              name: 'severity',
              type: "'primary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'secondary'",
              default: "'primary'",
              description: 'Color variant.',
            },
            {
              name: 'size',
              type: "'small' | 'normal' | 'large'",
              default: "'normal'",
              description: 'Badge size.',
            },
            { name: 'rounded', type: 'boolean', default: 'true', description: 'Fully rounded vs. small radius.' },
            { name: 'dot', type: 'boolean', default: 'false', description: 'Render as a dot, hiding value.' },
          ]}
        />
        <ApiBlock
          name="Tag"
          rows={[
            { name: 'value', type: 'ReactNode', description: 'Label content.' },
            { name: 'icon', type: 'LucideIcon', description: 'Optional leading icon.' },
            {
              name: 'severity',
              type: "'primary' | 'success' | 'info' | 'warning' | 'danger' | 'help' | 'secondary'",
              default: "'primary'",
              description: 'Color variant.',
            },
            {
              name: 'size',
              type: "'small' | 'normal' | 'large'",
              default: "'normal'",
              description: 'Tag size.',
            },
            { name: 'rounded', type: 'boolean', default: 'false', description: 'Pill vs. small radius.' },
          ]}
        />
        <ApiBlock
          name="Chip"
          rows={[
            { name: 'label', type: 'ReactNode', description: 'Chip content.' },
            { name: 'icon', type: 'LucideIcon', description: 'Leading icon (when no image).' },
            { name: 'image', type: 'string', description: 'Image URL shown as a leading avatar.' },
            { name: 'removable', type: 'boolean', default: 'false', description: 'Show a close button.' },
            { name: 'onRemove', type: '() => void', description: 'Called when the close button is clicked.' },
          ]}
        />
        <ApiBlock
          name="Progress"
          rows={[
            { name: 'value', type: 'number', default: '0', description: '0–100. Ignored when indeterminate.' },
            {
              name: 'mode',
              type: "'determinate' | 'indeterminate'",
              default: "'determinate'",
              description: 'Determinate bar or looping indeterminate animation.',
            },
            { name: 'showValue', type: 'boolean', default: 'false', description: 'Show the percentage label inside the bar.' },
            {
              name: 'severity',
              type: "'primary' | 'success' | 'info' | 'warning' | 'danger'",
              default: "'primary'",
              description: 'Bar color.',
            },
          ]}
        />
        <ApiBlock
          name="Skeleton"
          rows={[
            { name: 'width', type: 'string | number', description: 'Width of the placeholder.' },
            { name: 'height', type: 'string | number', description: 'Height of the placeholder.' },
            {
              name: 'shape',
              type: "'rectangle' | 'circle'",
              default: "'rectangle'",
              description: 'Placeholder shape.',
            },
            { name: 'radius', type: 'string | number', description: 'Border radius for rectangles.' },
          ]}
        />
        <ApiBlock
          name="Avatar"
          rows={[
            { name: 'image', type: 'string', description: 'Image URL. Falls back to label/icon on load failure.' },
            { name: 'alt', type: 'string', description: 'Alt text for the image.' },
            { name: 'label', type: 'string', description: 'Text shown when no image (e.g. initials).' },
            { name: 'icon', type: 'LucideIcon', description: 'Icon shown when no image and no label.' },
            {
              name: 'size',
              type: "'small' | 'normal' | 'large' | 'xlarge'",
              default: "'normal'",
              description: 'Avatar size.',
            },
            {
              name: 'shape',
              type: "'circle' | 'square'",
              default: "'circle'",
              description: 'Avatar shape.',
            },
          ]}
        />
        <ApiBlock
          name="AvatarGroup"
          rows={[
            { name: 'children', type: 'ReactNode', description: 'Avatar elements to stack.' },
            { name: 'max', type: 'number', description: 'Collapse to a "+N" avatar past this count.' },
          ]}
        />
        <ApiBlock
          name="ScrollTop"
          rows={[
            { name: 'threshold', type: 'number', default: '300', description: 'Scroll distance (px) before the button appears.' },
            { name: 'icon', type: 'LucideIcon', default: 'ChevronUp', description: 'Button icon.' },
            {
              name: 'target',
              type: "'window' | 'parent'",
              default: "'window'",
              description: 'Scroll the window or the nearest scrollable parent element.',
            },
          ]}
        />
      </ApiSection>
    </Page>
  )
}
