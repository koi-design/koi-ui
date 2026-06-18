# koi-ui

A prop-driven **React + Tailwind CSS** component library built for admin/back-office systems.
Behaviour is powered by **Radix UI** primitives; styling is themeable via CSS variables (light + dark).

**📚 Docs & live demo: [koi-design.github.io/koi-ui](https://koi-design.github.io/koi-ui/)**

> 72 components across forms, data, panels, overlays, navigation, feedback and media — plus a
> Form system with validation. Heavy components (charts, carousel, drag-and-drop, file upload)
> ship under subpaths as **optional peer dependencies**, so the core stays light.

## Features

- **Prop-driven API** — single component, many props (`label`, `severity`, `size`, `loading`,
  `options`, `value`/`onChange`), familiar to admin developers.
- **antd-style DataTable** — `columns` config with `sorter`, `filters`, `render`, `rowSelection`,
  `expandable` and `pagination`.
- **Form system** — `useForm` + `Form` + `FormItem` with validation rules, layouts and error display.
- **Theming** — CSS variables for colors/radius/typography; ships a Tailwind preset. Light + dark.
- **Tree-shakeable** — ESM + CJS, per-component exports, `"use client"` for Next.js RSC.
- **Light core** — Radix is bundled; recharts / embla / dnd-kit / react-dropzone are optional peers
  behind subpaths.

## Installation

```bash
pnpm add @koidesign/koi-ui
# peers
pnpm add react react-dom tailwindcss
```

## Setup

**1. Add the Tailwind preset and scan koi-ui's output**

```ts
// tailwind.config.ts
import koiPreset from '@koidesign/koi-ui/preset'

export default {
  presets: [koiPreset],
  content: ['./src/**/*.{ts,tsx}', './node_modules/@koidesign/koi-ui/dist/**/*.js'],
}
```

**2. Import the theme variables once at your app entry**

```ts
import '@koidesign/koi-ui/styles.css'
```

**3. Use components**

```tsx
import { Button, Input, DataTable } from '@koidesign/koi-ui'

export function Example() {
  return <Button label="Save" severity="success" icon={Save} />
}
```

## Subpath imports (optional peers)

Heavy components live under subpaths. Install the matching peer only when you use them:

| Import | Components | Peer dependency |
| --- | --- | --- |
| `@koidesign/koi-ui/chart` | `Chart` | `recharts` |
| `@koidesign/koi-ui/carousel` | `Carousel` | `embla-carousel-react` |
| `@koidesign/koi-ui/dnd` | `OrderList`, `PickList` | `@dnd-kit/*` |
| `@koidesign/koi-ui/file` | `FileUpload` | `react-dropzone` |

```tsx
import { Chart } from '@koidesign/koi-ui/chart' // then: pnpm add recharts
```

## Theming

Override any CSS variable to retheme (see `@koidesign/koi-ui/styles.css` for the full list):

```css
:root {
  --koi-primary: 239 84% 67%; /* HSL channels */
  --koi-radius: 6px;
}
.dark {
  --koi-primary: 234 89% 74%;
}
```

Toggle dark mode by adding the `dark` class to `<html>`.

## Component overview

- **Forms** — Input, InputNumber, Password, Textarea, Select, MultiSelect, AutoComplete, Listbox,
  Checkbox, RadioGroup, Switch, ToggleButton, SelectButton, Slider, Rating, Knob, ColorPicker,
  DatePicker, ChipsInput, FloatLabel, InputGroup, Form/FormItem
- **Buttons** — Button, SplitButton
- **Data** — DataTable, TreeTable, DataView, Tree, Timeline, Paginator, OrderList, PickList
- **Panels & Layout** — Card, Accordion, Panel, Fieldset, Tabs, Splitter, ScrollArea, Toolbar,
  Divider, Inplace
- **Overlay** — Dialog, ConfirmDialog, Sheet, Popover, Tooltip
- **Navigation** — Menu, Menubar, Breadcrumb, ContextMenu, TieredMenu, MegaMenu, PanelMenu,
  TabMenu, Steps
- **Feedback** — Toast, Message, Badge, Tag, Chip, Progress, Skeleton, Avatar, AvatarGroup, ScrollTop
- **Media** — Image, Galleria, Carousel, Chart, FileUpload

## Development

```bash
pnpm install
pnpm dev          # run the docs site (http://localhost:5847)
pnpm build        # build the library to dist/ (tsup)
pnpm build:demo   # build the docs site to demo-dist/
pnpm typecheck
```

## Tech stack

React 18 · TypeScript · Tailwind CSS 3 · Radix UI · tsup · Vite (docs).

## License

MIT
