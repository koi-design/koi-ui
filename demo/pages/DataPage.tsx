import { useState } from 'react'
import { Plus, Settings, Home, Star } from 'lucide-react'
import { DataTable, type ColumnType, TreeTable, DataView, Tree, Timeline, Paginator, Tag } from '@/index'
import { OrderList, PickList } from '@/dnd'
import { Page, Demo } from '../docs/Example'

type Row = { id: number; name: string; role: string; status: 'active' | 'inactive' }
const users: Row[] = [
  { id: 1, name: 'Alice', role: 'Admin', status: 'active' },
  { id: 2, name: 'Bob', role: 'Editor', status: 'inactive' },
  { id: 3, name: 'Carol', role: 'Viewer', status: 'active' },
  { id: 4, name: 'Dave', role: 'Editor', status: 'active' },
]

type TreeRow = { key: string; name: string; size: string; children?: TreeRow[] }
const files: TreeRow[] = [
  { key: '1', name: 'src', size: '—', children: [{ key: '1-1', name: 'index.ts', size: '2 KB' }, { key: '1-2', name: 'app.tsx', size: '8 KB' }] },
  { key: '2', name: 'package.json', size: '1 KB' },
]

export function DataPage() {
  const [sel, setSel] = useState<(string | number)[]>([])
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState([
    { id: 'a', name: 'San Francisco' },
    { id: 'b', name: 'London' },
    { id: 'c', name: 'Tokyo' },
  ])
  const [pick, setPick] = useState({
    source: [
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Banana' },
      { id: 3, name: 'Cherry' },
    ],
    target: [{ id: 4, name: 'Mango' }],
  })

  const cols: ColumnType<Row>[] = [
    { title: 'Name', dataIndex: 'name', sorter: true },
    {
      title: 'Role',
      dataIndex: 'role',
      filters: [
        { text: 'Admin', value: 'Admin' },
        { text: 'Editor', value: 'Editor' },
        { text: 'Viewer', value: 'Viewer' },
      ],
      onFilter: (v, r) => r.role === v,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (v) => <Tag value={v as string} severity={v === 'active' ? 'success' : 'secondary'} />,
    },
  ]

  const treeCols: ColumnType<TreeRow>[] = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Size', dataIndex: 'size', align: 'right' },
  ]

  return (
    <Page title="Data" intro="antd-style DataTable (columns config), trees, lists and timelines.">
      <Demo title="DataTable" description="columns + sorter / filters / rowSelection / expandable / pagination.">
        <DataTable
          rowKey="id"
          columns={cols}
          dataSource={users}
          bordered
          rowSelection={{ selectedRowKeys: sel, onChange: setSel }}
          expandable={{ expandedRowRender: (r) => <span className="text-muted-foreground">Details for {r.name}</span> }}
          pagination={{ current: page, pageSize: 2, total: users.length, onChange: setPage, pageSizeOptions: [2, 5, 10] }}
        />
      </Demo>

      <Demo title="TreeTable" description="Table with nested children (tree data).">
        <TreeTable rowKey="key" columns={treeCols} dataSource={files} defaultExpandedKeys={['1']} bordered />
      </Demo>

      <Demo title="DataView" description="List / grid presentation with a layout switcher.">
        <DataView
          value={[
            { name: 'Phone', price: '$699' },
            { name: 'Laptop', price: '$1299' },
            { name: 'Watch', price: '$399' },
          ]}
          showLayoutSwitcher
          header={<span className="font-medium">Products</span>}
          itemTemplate={(p: { name: string; price: string }, layout) => (
            <div className={layout === 'grid' ? 'rounded-md border border-border p-4' : 'flex items-center justify-between p-3'}>
              <span className="font-medium">{p.name}</span>
              <span className="text-primary">{p.price}</span>
            </div>
          )}
        />
      </Demo>

      <Demo title="Tree" description="Hierarchical node list with expand and selection.">
        <Tree
          selectionMode="checkbox"
          defaultExpandedKeys={['docs']}
          value={[
            { key: 'docs', label: 'Documents', children: [{ key: 'work', label: 'Work' }, { key: 'home', label: 'Home' }] },
            { key: 'pics', label: 'Pictures', icon: Star },
          ]}
        />
      </Demo>

      <Demo title="Timeline" description="Vertical sequence of events.">
        <div className="max-w-md">
          <Timeline
            value={[
              { opposite: '09:00', content: 'Order placed', icon: Plus },
              { opposite: '10:30', content: 'Processing', icon: Settings },
              { opposite: '14:00', content: 'Delivered', icon: Home },
            ]}
          />
        </div>
      </Demo>

      <Demo title="Paginator" description="Page navigation with page-size selector.">
        <Paginator page={page} pageSize={2} total={240} onChange={setPage} pageSizeOptions={[2, 10, 20]} showTotal />
      </Demo>

      <Demo title="OrderList" description="koi-ui/dnd · drag to reorder.">
        <OrderList value={order} onChange={setOrder} dataKey="id" header="Reorder cities" itemTemplate={(c) => c.name} />
      </Demo>

      <Demo title="PickList" description="koi-ui/dnd · transfer between two lists.">
        <PickList source={pick.source} target={pick.target} onChange={setPick} dataKey="id" itemTemplate={(f) => f.name} />
      </Demo>
    </Page>
  )
}
