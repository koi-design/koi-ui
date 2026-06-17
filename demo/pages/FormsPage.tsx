import { useState } from 'react'
import { Search, Star } from 'lucide-react'
import {
  Form,
  FormItem,
  useForm,
  Input,
  InputNumber,
  Password,
  Textarea,
  Select,
  MultiSelect,
  Command,
  Listbox,
  Checkbox,
  RadioGroup,
  Switch,
  ToggleButton,
  SelectButton,
  Slider,
  Rating,
  Knob,
  ColorPicker,
  DatePicker,
  ChipsInput,
  FloatLabel,
  InputGroup,
  Button,
  toast,
} from '@/index'
import { Page, Demo } from '../docs/Example'

const cities = [
  { label: 'Beijing', value: 'bj' },
  { label: 'Shanghai', value: 'sh' },
  { label: 'Shenzhen', value: 'sz' },
  { label: 'Hangzhou', value: 'hz', disabled: true },
]

export function FormsPage() {
  const form = useForm()
  const [num, setNum] = useState<number | null>(5)
  const [pw, setPw] = useState('')
  const [city, setCity] = useState<string>()
  const [multi, setMulti] = useState<string[]>(['sh'])
  const [listSel, setListSel] = useState('bj')
  const [checked, setChecked] = useState(true)
  const [radio, setRadio] = useState('a')
  const [on, setOn] = useState(true)
  const [toggle, setToggle] = useState(false)
  const [segment, setSegment] = useState('list')
  const [slider, setSlider] = useState(40)
  const [rate, setRate] = useState(3)
  const [knob, setKnob] = useState(60)
  const [color, setColor] = useState('#6366F1')
  const [date, setDate] = useState<Date>()
  const [tags, setTags] = useState<string[]>(['react', 'ui'])
  const [fname, setFname] = useState('')

  return (
    <Page title="Forms" intro="22 input components plus a Form system with validation rules.">
      <Demo title="Form & Validation" description="useForm + FormItem rules; layout, labels, required, errors.">
        <Form
          form={form}
          layout="horizontal"
          labelWidth={120}
          initialValues={{ city: 'sh' }}
          onFinish={(v) => toast.success(`Submitted: ${JSON.stringify(v)}`)}
          className="max-w-lg"
        >
          <FormItem name="username" label="Username" rules={[{ required: true, message: 'Username is required' }]}>
            <Input placeholder="Enter username" />
          </FormItem>
          <FormItem
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Email is required' },
              { pattern: /^[^@]+@[^@]+\.[^@]+$/, message: 'Invalid email' },
            ]}
          >
            <Input placeholder="you@example.com" />
          </FormItem>
          <FormItem name="city" label="City" rules={[{ required: true }]}>
            <Select options={cities} placeholder="Pick a city" />
          </FormItem>
          <FormItem name="agree" label="Agreement" valuePropName="checked" rules={[{ required: true, message: 'Please accept' }]}>
            <Checkbox label="I accept the terms" />
          </FormItem>
          <FormItem label="">
            <div className="flex gap-2">
              <Button label="Submit" onClick={() => form.submit()} />
              <Button label="Reset" severity="secondary" text onClick={() => form.resetFields()} />
            </div>
          </FormItem>
        </Form>
      </Demo>

      <Demo title="Input"><Input placeholder="Outlined" /><span className="mx-2" /><Input variant="filled" iconLeft={Search} placeholder="Filled w/ icon" /></Demo>
      <Demo title="InputNumber"><InputNumber value={num} onChange={setNum} min={0} max={100} showButtons /></Demo>
      <Demo title="Password"><Password value={pw} onChange={(e) => setPw(e.target.value)} feedback placeholder="Password" /></Demo>
      <Demo title="Textarea"><Textarea placeholder="Auto-resizing textarea" autoResize /></Demo>
      <Demo title="Select"><Select options={cities} value={city} onChange={setCity} placeholder="Pick a city" /></Demo>
      <Demo title="MultiSelect"><MultiSelect options={cities} value={multi} onChange={setMulti} filter display="chip" /></Demo>
      <Demo title="AutoComplete" description="Searchable command palette (cmdk).">
        <Command
          className="max-w-md"
          groups={[{ heading: 'Cities', items: cities.map((c) => ({ value: c.value, label: c.label })) }]}
        />
      </Demo>
      <Demo title="Listbox"><Listbox options={cities} value={listSel} onChange={setListSel} filter className="max-w-xs" /></Demo>
      <Demo title="Checkbox"><Checkbox label="Checkbox" checked={checked} onChange={setChecked} /><span className="mx-3" /><Checkbox label="Indeterminate" indeterminate /></Demo>
      <Demo title="RadioGroup">
        <RadioGroup orientation="horizontal" value={radio} onChange={setRadio} options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }, { label: 'C', value: 'c', disabled: true }]} />
      </Demo>
      <Demo title="Switch"><Switch label="Switch" checked={on} onChange={setOn} /></Demo>
      <Demo title="ToggleButton"><ToggleButton checked={toggle} onChange={setToggle} onLabel="On" offLabel="Off" onIcon={Star} offIcon={Star} /></Demo>
      <Demo title="SelectButton">
        <SelectButton value={segment} onChange={setSegment} options={[{ label: 'List', value: 'list' }, { label: 'Grid', value: 'grid' }, { label: 'Table', value: 'table' }]} />
      </Demo>
      <Demo title="Slider"><Slider value={slider} onChange={setSlider} className="max-w-xs" /></Demo>
      <Demo title="Rating"><Rating value={rate} onChange={setRate} allowHalf /></Demo>
      <Demo title="Knob"><Knob value={knob} onChange={setKnob} /></Demo>
      <Demo title="ColorPicker"><ColorPicker value={color} onChange={setColor} /></Demo>
      <Demo title="DatePicker"><DatePicker value={date} onChange={setDate} /></Demo>
      <Demo title="ChipsInput"><ChipsInput value={tags} onChange={setTags} placeholder="Add tag…" /></Demo>
      <Demo title="FloatLabel"><FloatLabel label="Username"><Input value={fname} onChange={(e) => setFname(e.target.value)} /></FloatLabel></Demo>
      <Demo title="InputGroup"><InputGroup addonBefore="https://"><Input placeholder="your-site" /></InputGroup></Demo>
    </Page>
  )
}
