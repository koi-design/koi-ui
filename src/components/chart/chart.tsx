import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  Legend,
} from 'recharts'

export interface ChartSeries {
  key: string
  name?: string
  color?: string
}

export interface ChartProps {
  type: 'line' | 'bar' | 'area' | 'pie' | 'donut'
  data: Record<string, unknown>[]
  /** Category axis key (cartesian charts). */
  xKey?: string
  /** Series for cartesian charts. */
  series?: ChartSeries[]
  /** Name/value keys for pie/donut. */
  nameKey?: string
  valueKey?: string
  height?: number
  showLegend?: boolean
  showGrid?: boolean
  colors?: string[]
  className?: string
}

const DEFAULT_COLORS = ['#6366F1', '#22C55E', '#F97316', '#EC4899', '#06B6D4', '#A855F7', '#EAB308']

/**
 * Chart — recharts wrapper for line / bar / area / pie / donut.
 *
 * @example
 * import { Chart } from 'koi-ui/chart'
 * <Chart type="line" data={data} xKey="month" series={[{ key: 'sales', color: '#6366F1' }]} />
 * <Chart type="donut" data={data} nameKey="name" valueKey="value" />
 */
export function Chart({
  type,
  data,
  xKey = 'name',
  series = [],
  nameKey = 'name',
  valueKey = 'value',
  height = 300,
  showLegend = true,
  showGrid = true,
  colors = DEFAULT_COLORS,
  className,
}: ChartProps) {
  const axis = { fontSize: 12, stroke: 'hsl(var(--koi-muted-foreground))' }
  const grid = <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--koi-border))" />

  const cartesianAxes = (
    <>
      {showGrid && grid}
      <XAxis dataKey={xKey} tick={axis} tickLine={false} />
      <YAxis tick={axis} tickLine={false} />
      <RTooltip
        contentStyle={{
          background: 'hsl(var(--koi-background))',
          border: '1px solid hsl(var(--koi-border))',
          borderRadius: 6,
          fontSize: 12,
        }}
      />
      {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
    </>
  )

  let chart: React.ReactElement
  if (type === 'line') {
    chart = (
      <LineChart data={data}>
        {cartesianAxes}
        {series.map((s, i) => (
          <Line key={s.key} type="monotone" dataKey={s.key} name={s.name ?? s.key} stroke={s.color ?? colors[i % colors.length]} strokeWidth={2} dot={false} />
        ))}
      </LineChart>
    )
  } else if (type === 'bar') {
    chart = (
      <BarChart data={data}>
        {cartesianAxes}
        {series.map((s, i) => (
          <Bar key={s.key} dataKey={s.key} name={s.name ?? s.key} fill={s.color ?? colors[i % colors.length]} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    )
  } else if (type === 'area') {
    chart = (
      <AreaChart data={data}>
        {cartesianAxes}
        {series.map((s, i) => {
          const c = s.color ?? colors[i % colors.length]
          return <Area key={s.key} type="monotone" dataKey={s.key} name={s.name ?? s.key} stroke={c} fill={c} fillOpacity={0.2} strokeWidth={2} />
        })}
      </AreaChart>
    )
  } else {
    chart = (
      <PieChart>
        <Pie
          data={data}
          dataKey={valueKey}
          nameKey={nameKey}
          innerRadius={type === 'donut' ? '55%' : 0}
          outerRadius="80%"
          paddingAngle={type === 'donut' ? 2 : 0}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <RTooltip
          contentStyle={{
            background: 'hsl(var(--koi-background))',
            border: '1px solid hsl(var(--koi-border))',
            borderRadius: 6,
            fontSize: 12,
          }}
        />
        {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
      </PieChart>
    )
  }

  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        {chart}
      </ResponsiveContainer>
    </div>
  )
}
