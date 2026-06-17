export interface NavItem {
  label: string
  /** Route path of the category page. */
  to: string
  /** Section id to scroll to within the page. */
  anchor: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

const g = (to: string, label: string): NavItem => ({ to, label, anchor: slug(label) })

export function slug(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export const nav: NavGroup[] = [
  { title: 'Overview', items: [{ label: 'Getting Started', to: '/', anchor: 'getting-started' }] },
  {
    title: 'Forms',
    items: [
      g('/forms', 'Form & Validation'),
      g('/forms', 'Input'),
      g('/forms', 'InputNumber'),
      g('/forms', 'Password'),
      g('/forms', 'Textarea'),
      g('/forms', 'Select'),
      g('/forms', 'MultiSelect'),
      g('/forms', 'AutoComplete'),
      g('/forms', 'Listbox'),
      g('/forms', 'Checkbox'),
      g('/forms', 'RadioGroup'),
      g('/forms', 'Switch'),
      g('/forms', 'ToggleButton'),
      g('/forms', 'SelectButton'),
      g('/forms', 'Slider'),
      g('/forms', 'Rating'),
      g('/forms', 'Knob'),
      g('/forms', 'ColorPicker'),
      g('/forms', 'DatePicker'),
      g('/forms', 'ChipsInput'),
      g('/forms', 'FloatLabel'),
      g('/forms', 'InputGroup'),
    ],
  },
  { title: 'Buttons', items: [g('/buttons', 'Button'), g('/buttons', 'SplitButton')] },
  {
    title: 'Data',
    items: [
      g('/data', 'DataTable'),
      g('/data', 'TreeTable'),
      g('/data', 'DataView'),
      g('/data', 'Tree'),
      g('/data', 'Timeline'),
      g('/data', 'Paginator'),
      g('/data', 'OrderList'),
      g('/data', 'PickList'),
    ],
  },
  {
    title: 'Panels & Layout',
    items: [
      g('/panels', 'Card'),
      g('/panels', 'Accordion'),
      g('/panels', 'Panel'),
      g('/panels', 'Fieldset'),
      g('/panels', 'Tabs'),
      g('/panels', 'Splitter'),
      g('/panels', 'ScrollArea'),
      g('/panels', 'Toolbar'),
      g('/panels', 'Divider'),
      g('/panels', 'Inplace'),
    ],
  },
  {
    title: 'Overlay',
    items: [
      g('/overlay', 'Dialog'),
      g('/overlay', 'ConfirmDialog'),
      g('/overlay', 'Sheet'),
      g('/overlay', 'Popover'),
      g('/overlay', 'Tooltip'),
    ],
  },
  {
    title: 'Navigation',
    items: [
      g('/navigation', 'Menu'),
      g('/navigation', 'Menubar'),
      g('/navigation', 'Breadcrumb'),
      g('/navigation', 'ContextMenu'),
      g('/navigation', 'TieredMenu'),
      g('/navigation', 'MegaMenu'),
      g('/navigation', 'PanelMenu'),
      g('/navigation', 'TabMenu'),
      g('/navigation', 'Steps'),
    ],
  },
  {
    title: 'Feedback',
    items: [
      g('/feedback', 'Toast'),
      g('/feedback', 'Message'),
      g('/feedback', 'Badge'),
      g('/feedback', 'Tag'),
      g('/feedback', 'Chip'),
      g('/feedback', 'Progress'),
      g('/feedback', 'Skeleton'),
      g('/feedback', 'Avatar'),
      g('/feedback', 'ScrollTop'),
    ],
  },
  {
    title: 'Media',
    items: [
      g('/media', 'Image'),
      g('/media', 'Galleria'),
      g('/media', 'Carousel'),
      g('/media', 'Chart'),
      g('/media', 'FileUpload'),
    ],
  },
]
