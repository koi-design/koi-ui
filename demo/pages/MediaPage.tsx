import { useState } from 'react'
import { Image, Galleria } from '@/index'
import { Carousel } from '@/carousel'
import { Chart } from '@/chart'
import { FileUpload } from '@/file'
import { Page, Demo, ApiSection, ApiBlock } from '../docs/Example'

const photos = [
  'https://picsum.photos/id/10/600/360',
  'https://picsum.photos/id/20/600/360',
  'https://picsum.photos/id/30/600/360',
  'https://picsum.photos/id/40/600/360',
]

const sales = [
  { month: 'Jan', sales: 120, users: 80 },
  { month: 'Feb', sales: 160, users: 95 },
  { month: 'Mar', sales: 140, users: 110 },
  { month: 'Apr', sales: 210, users: 150 },
  { month: 'May', sales: 190, users: 170 },
]
const pie = [
  { name: 'Chrome', value: 62 },
  { name: 'Safari', value: 20 },
  { name: 'Firefox', value: 10 },
  { name: 'Edge', value: 8 },
]

const imageCode = `import { Image } from 'koi-ui'

<Image src={photo} preview width={240} height={150} rounded />`

const galleriaCode = `import { Galleria } from 'koi-ui'

<Galleria
  value={photos}
  itemTemplate={(src) => <img src={src} alt="" className="h-64 w-full object-cover" />}
  thumbnailTemplate={(src) => <img src={src} alt="" className="h-14 w-20 object-cover" />}
  circular
/>`

const carouselCode = `import { Carousel } from 'koi-ui/carousel'

<Carousel
  value={photos}
  slidesToShow={2}
  showArrows
  showDots
  itemTemplate={(src) => <img src={src} alt="" className="h-40 w-full rounded-md object-cover" />}
/>`

const chartCode = `import { Chart } from 'koi-ui/chart'

<Chart
  type="bar"
  data={sales}
  xKey="month"
  series={[{ key: 'sales', name: 'Sales' }, { key: 'users', name: 'Users' }]}
  height={240}
/>
<Chart type="donut" data={pie} nameKey="name" valueKey="value" height={240} />`

const fileUploadCode = `import { FileUpload } from 'koi-ui/file'

<FileUpload multiple onChange={setFiles} />`

export function MediaPage() {
  const [, setFiles] = useState<File[]>([])
  return (
    <Page title="Media" intro="Images, galleries, charts and uploads. Charts/Carousel ship under subpaths.">
      <Demo title="Image" description="Click to zoom into a fullscreen preview." code={imageCode}>
        <Image src={photos[0]} preview width={240} height={150} rounded />
      </Demo>

      <Demo title="Galleria" description="Large view + thumbnail strip." code={galleriaCode}>
        <Galleria
          value={photos}
          itemTemplate={(src: string) => <img src={src} alt="" className="h-64 w-full object-cover" />}
          thumbnailTemplate={(src: string) => <img src={src} alt="" className="h-14 w-20 object-cover" />}
          circular
        />
      </Demo>

      <Demo title="Carousel" description="koi-ui/carousel · embla-backed slider." code={carouselCode}>
        <Carousel
          value={photos}
          slidesToShow={2}
          showArrows
          showDots
          itemTemplate={(src: string) => <img src={src} alt="" className="h-40 w-full rounded-md object-cover" />}
        />
      </Demo>

      <Demo title="Chart" description="koi-ui/chart · recharts wrapper (line / bar / area / pie / donut)." code={chartCode}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Chart type="bar" data={sales} xKey="month" series={[{ key: 'sales', name: 'Sales' }, { key: 'users', name: 'Users' }]} height={240} />
          <Chart type="donut" data={pie} nameKey="name" valueKey="value" height={240} />
        </div>
      </Demo>

      <Demo title="FileUpload" description="koi-ui/file · drag & drop with file list." code={fileUploadCode}>
        <FileUpload multiple onChange={setFiles} />
      </Demo>

      <ApiSection>
        <ApiBlock
          name="Image"
          rows={[
            { name: 'src', type: 'string', description: 'Image source URL.' },
            { name: 'preview', type: 'boolean', default: 'false', description: 'Show a zoom button that opens a fullscreen preview.' },
            { name: 'width', type: 'number | string', description: 'Width of the image container.' },
            { name: 'height', type: 'number | string', description: 'Height of the image container.' },
            { name: 'rounded', type: 'boolean', default: 'false', description: 'Apply a rounded border radius.' },
            { name: 'alt', type: 'string', description: 'Alternative text; also forwarded to the preview image.' },
          ]}
        />
        <ApiBlock
          name="Galleria"
          rows={[
            { name: 'value', type: 'T[]', description: 'Items to display.' },
            { name: 'itemTemplate', type: '(item: T, index: number) => ReactNode', description: 'Render the large active item.' },
            { name: 'thumbnailTemplate', type: '(item: T, index: number) => ReactNode', description: 'Render a thumbnail; omit to hide the thumbnail strip.' },
            { name: 'activeIndex', type: 'number', description: 'Controlled active index.' },
            { name: 'onChange', type: '(index: number) => void', description: 'Fires when the active index changes.' },
            { name: 'showArrows', type: 'boolean', default: 'true', description: 'Show previous/next navigation arrows.' },
            { name: 'circular', type: 'boolean', default: 'false', description: 'Wrap around at the ends.' },
          ]}
        />
        <ApiBlock
          name="Carousel"
          rows={[
            { name: 'value', type: 'T[]', description: 'Items to display.' },
            { name: 'itemTemplate', type: '(item: T, index: number) => ReactNode', description: 'Render each slide.' },
            { name: 'slidesToShow', type: 'number', default: '1', description: 'Slides visible at once.' },
            { name: 'loop', type: 'boolean', default: 'false', description: 'Loop back to the start after the last slide.' },
            { name: 'showArrows', type: 'boolean', default: 'true', description: 'Show previous/next navigation arrows.' },
            { name: 'showDots', type: 'boolean', default: 'false', description: 'Show pagination dots.' },
          ]}
        />
        <ApiBlock
          name="Chart"
          rows={[
            { name: 'type', type: "'line' | 'bar' | 'area' | 'pie' | 'donut'", description: 'Chart variant to render.' },
            { name: 'data', type: 'Record<string, unknown>[]', description: 'Data rows.' },
            { name: 'xKey', type: 'string', default: "'name'", description: 'Category axis key for cartesian charts.' },
            { name: 'series', type: 'ChartSeries[]', default: '[]', description: 'Series (key/name/color) for cartesian charts.' },
            { name: 'nameKey', type: 'string', default: "'name'", description: 'Name key for pie/donut.' },
            { name: 'valueKey', type: 'string', default: "'value'", description: 'Value key for pie/donut.' },
            { name: 'height', type: 'number', default: '300', description: 'Chart height in pixels.' },
            { name: 'showLegend', type: 'boolean', default: 'true', description: 'Show the legend.' },
            { name: 'showGrid', type: 'boolean', default: 'true', description: 'Show the cartesian grid.' },
            { name: 'colors', type: 'string[]', default: 'DEFAULT_COLORS', description: 'Color palette for series/slices.' },
          ]}
        />
        <ApiBlock
          name="FileUpload"
          rows={[
            { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow selecting multiple files.' },
            { name: 'accept', type: 'Accept', description: 'Accepted file types (react-dropzone format).' },
            { name: 'maxSize', type: 'number', description: 'Max file size in bytes.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the dropzone.' },
            { name: 'onChange', type: '(files: File[]) => void', description: 'Fires with the full current file list whenever it changes.' },
            { name: 'dragText', type: 'ReactNode', default: "'Drag & drop files here…'", description: 'Prompt text shown in the dropzone.' },
          ]}
        />
      </ApiSection>
    </Page>
  )
}
