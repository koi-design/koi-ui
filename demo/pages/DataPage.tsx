import { useState } from 'react'
import { Plus, Settings, Home, Star } from 'lucide-react'
import { DataTable, type ColumnType, TreeTable, DataView, Tree, Timeline, Paginator, Tag } from '@/index'
import { OrderList, PickList } from '@/dnd'
import { Page, Demo, ApiSection, ApiBlock } from '../docs/Example'

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

const dataTableCode = `import { DataTable, type ColumnType, Tag } from 'koi-ui'

const columns: ColumnType<Row>[] = [
  { title: 'Name', dataIndex: 'name', sorter: true },
  {
    title: 'Role',
    dataIndex: 'role',
    filters: [
      { text: 'Admin', value: 'Admin' },
      { text: 'Editor', value: 'Editor' },
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

<DataTable
  rowKey="id"
  columns={columns}
  dataSource={users}
  bordered
  rowSelection={{ selectedRowKeys: sel, onChange: setSel }}
  expandable={{ expandedRowRender: (r) => <span>Details for {r.name}</span> }}
  pagination={{ current: page, pageSize: 2, total: users.length, onChange: setPage, pageSizeOptions: [2, 5, 10] }}
/>`

const treeTableCode = `import { TreeTable, type ColumnType } from 'koi-ui'

const columns: ColumnType<TreeRow>[] = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Size', dataIndex: 'size', align: 'right' },
]

<TreeTable rowKey="key" columns={columns} dataSource={files} defaultExpandedKeys={['1']} bordered />`

const dataViewCode = `import { DataView } from 'koi-ui'

<DataView
  value={[
    { name: 'Phone', price: '$699' },
    { name: 'Laptop', price: '$1299' },
  ]}
  showLayoutSwitcher
  header={<span className="font-medium">Products</span>}
  itemTemplate={(p, layout) => (
    <div className={layout === 'grid' ? 'rounded-md border p-4' : 'flex justify-between p-3'}>
      <span>{p.name}</span>
      <span>{p.price}</span>
    </div>
  )}
/>`

const treeCode = `import { Tree } from 'koi-ui'
import { Star } from 'lucide-react'

<Tree
  selectionMode="checkbox"
  defaultExpandedKeys={['docs']}
  value={[
    { key: 'docs', label: 'Documents', children: [{ key: 'work', label: 'Work' }, { key: 'home', label: 'Home' }] },
    { key: 'pics', label: 'Pictures', icon: Star },
  ]}
/>`

const timelineCode = `import { Timeline } from 'koi-ui'
import { Plus, Settings, Home } from 'lucide-react'

<Timeline
  value={[
    { opposite: '09:00', content: 'Order placed', icon: Plus },
    { opposite: '10:30', content: 'Processing', icon: Settings },
    { opposite: '14:00', content: 'Delivered', icon: Home },
  ]}
/>`

const paginatorCode = `import { Paginator } from 'koi-ui'

<Paginator page={page} pageSize={2} total={240} onChange={setPage} pageSizeOptions={[2, 10, 20]} showTotal />`

const orderListCode = `import { OrderList } from 'koi-ui/dnd'

<OrderList value={order} onChange={setOrder} dataKey="id" header="Reorder cities" itemTemplate={(c) => c.name} />`

const pickListCode = `import { PickList } from 'koi-ui/dnd'

<PickList source={pick.source} target={pick.target} onChange={setPick} dataKey="id" itemTemplate={(f) => f.name} />`

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
      <Demo title="DataTable" description="columns + sorter / filters / rowSelection / expandable / pagination." code={dataTableCode}>
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

      <Demo title="TreeTable" description="Table with nested children (tree data)." code={treeTableCode}>
        <TreeTable rowKey="key" columns={treeCols} dataSource={files} defaultExpandedKeys={['1']} bordered />
      </Demo>

      <Demo title="DataView" description="List / grid presentation with a layout switcher." code={dataViewCode}>
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

      <Demo title="Tree" description="Hierarchical node list with expand and selection." code={treeCode}>
        <Tree
          selectionMode="checkbox"
          defaultExpandedKeys={['docs']}
          value={[
            { key: 'docs', label: 'Documents', children: [{ key: 'work', label: 'Work' }, { key: 'home', label: 'Home' }] },
            { key: 'pics', label: 'Pictures', icon: Star },
          ]}
        />
      </Demo>

      <Demo title="Timeline" description="Vertical sequence of events." code={timelineCode}>
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

      <Demo title="Paginator" description="Page navigation with page-size selector." code={paginatorCode}>
        <Paginator page={page} pageSize={2} total={240} onChange={setPage} pageSizeOptions={[2, 10, 20]} showTotal />
      </Demo>

      <Demo title="OrderList" description="koi-ui/dnd · drag to reorder." code={orderListCode}>
        <OrderList value={order} onChange={setOrder} dataKey="id" header="Reorder cities" itemTemplate={(c) => c.name} />
      </Demo>

      <Demo title="PickList" description="koi-ui/dnd · transfer between two lists." code={pickListCode}>
        <PickList source={pick.source} target={pick.target} onChange={setPick} dataKey="id" itemTemplate={(f) => f.name} />
      </Demo>

      <ApiSection>
        <ApiBlock
          name="DataTable"
          rows={[
            { name: 'columns', type: 'ColumnType<T>[]', description: 'Column config. Each column: { title, dataIndex?, key?, render?(value, record, index), sorter?: boolean | ((a, b) => number), filters?: { text, value }[], onFilter?(value, record), width?, align?: \'left\' | \'center\' | \'right\', className? }.' },
            { name: 'dataSource', type: 'T[]', description: 'Array of row records to display.' },
            { name: 'rowKey', type: "keyof T | ((record: T) => string | number)", description: 'Field name or function returning a unique key per row.' },
            { name: 'rowSelection', type: '{ selectedRowKeys; onChange(keys, rows); type?: \'checkbox\' | \'radio\' }', description: 'Controlled row selection with checkboxes (default) or radios.' },
            { name: 'pagination', type: '{ current; pageSize; total?; pageSizeOptions?; onChange(page, pageSize) } | false', description: 'Pagination config rendered below the table, or false to disable.' },
            { name: 'expandable', type: '{ expandedRowRender(record, index); rowExpandable?(record) }', description: 'Adds an expand column; renders extra content per row.' },
            { name: 'loading', type: 'boolean', description: 'Shows a loading spinner overlay.' },
            { name: 'bordered', type: 'boolean', description: 'Draws vertical cell borders.' },
            { name: 'size', type: "'small' | 'middle' | 'large'", default: "'middle'", description: 'Cell padding density.' },
            { name: 'emptyText', type: 'ReactNode', default: "'No data'", description: 'Content shown when there are no rows.' },
            { name: 'className', type: 'string', description: 'Class applied to the table wrapper.' },
          ]}
        />
        <ApiBlock
          name="TreeTable"
          rows={[
            { name: 'columns', type: 'ColumnType<T>[]', description: 'Column config (same shape as DataTable; first column shows the expand toggle and indentation). Each: { title, dataIndex?, key?, render?, width?, align?, className? }.' },
            { name: 'dataSource', type: 'T[] (T extends { children?: T[] })', description: 'Tree data — records may contain a nested children array.' },
            { name: 'rowKey', type: "keyof T | ((record: T) => string | number)", description: 'Field name or function returning a unique key per row.' },
            { name: 'defaultExpandedKeys', type: '(string | number)[]', default: '[]', description: 'Keys of rows expanded on first render.' },
            { name: 'indentSize', type: 'number', default: '16', description: 'Pixels of indentation per nesting level.' },
            { name: 'size', type: "'small' | 'middle' | 'large'", default: "'middle'", description: 'Cell padding density.' },
            { name: 'bordered', type: 'boolean', description: 'Draws vertical cell borders.' },
            { name: 'emptyText', type: 'ReactNode', default: "'No data'", description: 'Content shown when there are no rows.' },
            { name: 'className', type: 'string', description: 'Class applied to the table wrapper.' },
          ]}
        />
        <ApiBlock
          name="DataView"
          rows={[
            { name: 'value', type: 'T[]', description: 'Items to render.' },
            { name: 'itemTemplate', type: "(item: T, layout: 'list' | 'grid') => ReactNode", description: 'Renders a single item for the current layout.' },
            { name: 'layout', type: "'list' | 'grid'", description: 'Controlled layout value.' },
            { name: 'defaultLayout', type: "'list' | 'grid'", default: "'list'", description: 'Initial layout when uncontrolled.' },
            { name: 'onLayoutChange', type: "(layout: 'list' | 'grid') => void", description: 'Fired when the layout changes.' },
            { name: 'showLayoutSwitcher', type: 'boolean', description: 'Shows the built-in list/grid switcher in the header.' },
            { name: 'header', type: 'ReactNode', description: 'Header content rendered above the items.' },
            { name: 'gridCols', type: '2 | 3 | 4', default: '3', description: 'Number of columns in grid layout.' },
            { name: 'emptyText', type: 'ReactNode', default: "'No records found'", description: 'Content shown when value is empty.' },
            { name: 'className', type: 'string', description: 'Class applied to the wrapper.' },
          ]}
        />
        <ApiBlock
          name="Tree"
          rows={[
            { name: 'value', type: 'TreeNode[]', description: 'Nodes to render. Each node: { key, label, icon?: LucideIcon, children?: TreeNode[], disabled? }.' },
            { name: 'selectionMode', type: "'single' | 'multiple' | 'checkbox'", description: 'Enables selection and its style; omit to disable selection.' },
            { name: 'selectedKeys', type: 'string[]', default: '[]', description: 'Controlled set of selected node keys.' },
            { name: 'onSelectionChange', type: '(keys: string[]) => void', description: 'Fired when selection changes.' },
            { name: 'expandedKeys', type: 'string[]', description: 'Controlled set of expanded node keys.' },
            { name: 'defaultExpandedKeys', type: 'string[]', default: '[]', description: 'Keys expanded on first render when uncontrolled.' },
            { name: 'onToggle', type: '(keys: string[]) => void', description: 'Fired when a node is expanded or collapsed.' },
            { name: 'className', type: 'string', description: 'Class applied to the wrapper.' },
          ]}
        />
        <ApiBlock
          name="Timeline"
          rows={[
            { name: 'value', type: 'TimelineEvent[]', description: 'Events to render. Each event: { content?, opposite?, icon?: LucideIcon, markerClassName? }.' },
            { name: 'align', type: "'left' | 'right' | 'alternate'", default: "'left'", description: 'Side the content sits on (alternate flips each row).' },
            { name: 'className', type: 'string', description: 'Class applied to the wrapper.' },
          ]}
        />
        <ApiBlock
          name="Paginator"
          rows={[
            { name: 'page', type: 'number', description: '1-based current page.' },
            { name: 'pageSize', type: 'number', description: 'Number of items per page.' },
            { name: 'total', type: 'number', description: 'Total number of records.' },
            { name: 'onChange', type: '(page: number) => void', description: 'Fired when the page changes.' },
            { name: 'pageSizeOptions', type: 'number[]', description: 'Enables a page-size selector with these options.' },
            { name: 'onPageSizeChange', type: '(pageSize: number) => void', description: 'Fired when the page size changes.' },
            { name: 'showTotal', type: 'boolean', description: 'Shows the "x–y of n" summary.' },
            { name: 'className', type: 'string', description: 'Class applied to the wrapper.' },
          ]}
        />
        <ApiBlock
          name="OrderList"
          rows={[
            { name: 'value', type: 'T[]', description: 'Ordered items.' },
            { name: 'onChange', type: '(value: T[]) => void', description: 'Fired with the reordered array after a drag.' },
            { name: 'dataKey', type: 'keyof T', description: 'Field used as a stable id per item.' },
            { name: 'itemTemplate', type: '(item: T) => ReactNode', description: 'Renders a single item.' },
            { name: 'header', type: 'ReactNode', description: 'Optional header content.' },
            { name: 'className', type: 'string', description: 'Class applied to the wrapper.' },
          ]}
        />
        <ApiBlock
          name="PickList"
          rows={[
            { name: 'source', type: 'T[]', description: 'Items in the left (available) list.' },
            { name: 'target', type: 'T[]', description: 'Items in the right (selected) list.' },
            { name: 'onChange', type: '(next: { source: T[]; target: T[] }) => void', description: 'Fired with both lists after a transfer or reorder.' },
            { name: 'dataKey', type: 'keyof T', description: 'Field used as a stable id per item.' },
            { name: 'itemTemplate', type: '(item: T) => ReactNode', description: 'Renders a single item.' },
            { name: 'sourceHeader', type: 'ReactNode', default: "'Available'", description: 'Header for the source list.' },
            { name: 'targetHeader', type: 'ReactNode', default: "'Selected'", description: 'Header for the target list.' },
            { name: 'className', type: 'string', description: 'Class applied to the wrapper.' },
          ]}
        />
      </ApiSection>
    </Page>
  )
}
