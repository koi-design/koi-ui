import { useState } from 'react'
import { Image, Galleria } from '@/index'
import { Carousel } from '@/carousel'
import { Chart } from '@/chart'
import { FileUpload } from '@/file'
import { Page, Demo } from '../docs/Example'

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

export function MediaPage() {
  const [, setFiles] = useState<File[]>([])
  return (
    <Page title="Media" intro="Images, galleries, charts and uploads. Charts/Carousel ship under subpaths.">
      <Demo title="Image" description="Click to zoom into a fullscreen preview.">
        <Image src={photos[0]} preview width={240} height={150} rounded />
      </Demo>

      <Demo title="Galleria" description="Large view + thumbnail strip.">
        <Galleria
          value={photos}
          itemTemplate={(src: string) => <img src={src} alt="" className="h-64 w-full object-cover" />}
          thumbnailTemplate={(src: string) => <img src={src} alt="" className="h-14 w-20 object-cover" />}
          circular
        />
      </Demo>

      <Demo title="Carousel" description="koi-ui/carousel · embla-backed slider.">
        <Carousel
          value={photos}
          slidesToShow={2}
          showArrows
          showDots
          itemTemplate={(src: string) => <img src={src} alt="" className="h-40 w-full rounded-md object-cover" />}
        />
      </Demo>

      <Demo title="Chart" description="koi-ui/chart · recharts wrapper (line / bar / area / pie / donut).">
        <div className="grid gap-6 lg:grid-cols-2">
          <Chart type="bar" data={sales} xKey="month" series={[{ key: 'sales', name: 'Sales' }, { key: 'users', name: 'Users' }]} height={240} />
          <Chart type="donut" data={pie} nameKey="name" valueKey="value" height={240} />
        </div>
      </Demo>

      <Demo title="FileUpload" description="koi-ui/file · drag & drop with file list.">
        <FileUpload multiple onChange={setFiles} />
      </Demo>
    </Page>
  )
}
