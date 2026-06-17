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
import { Page, Demo, ApiSection, ApiBlock } from '../docs/Example'

const cities = [
  { label: 'Beijing', value: 'bj' },
  { label: 'Shanghai', value: 'sh' },
  { label: 'Shenzhen', value: 'sz' },
  { label: 'Hangzhou', value: 'hz', disabled: true },
]

const formCode = `import { Form, FormItem, useForm, Input, Select, Checkbox, Button, toast } from 'koi-ui'

function MyForm() {
  const form = useForm()
  const [submitting, setSubmitting] = useState(false)
  return (
    <Form
      form={form}
      layout="horizontal"
      labelWidth={120}
      initialValues={{ city: 'sh' }}
      // native submit (type="submit" below) triggers validation -> onFinish
      onFinish={(v) => {
        setSubmitting(true)
        setTimeout(() => {
          setSubmitting(false)
          toast.success(JSON.stringify(v))
        }, 800)
      }}
    >
      <FormItem name="username" label="Username" rules={[{ required: true, message: 'Username is required' }]}>
        <Input placeholder="Enter username" />
      </FormItem>
      <FormItem name="city" label="City" rules={[{ required: true }]}>
        <Select options={cities} placeholder="Pick a city" />
      </FormItem>
      <FormItem name="agree" label="Agreement" valuePropName="checked" rules={[{ required: true }]}>
        <Checkbox label="I accept the terms" />
      </FormItem>
      <FormItem label="">
        <Button label="Submit" type="submit" loading={submitting} />
        <Button label="Reset" severity="secondary" text onClick={() => form.resetFields()} />
      </FormItem>
    </Form>
  )
}`

const inputCode = `import { Input } from 'koi-ui'
import { Search } from 'lucide-react'

<Input placeholder="Outlined" />
<Input variant="filled" iconLeft={Search} placeholder="Filled w/ icon" />`

const inputNumberCode = `import { InputNumber } from 'koi-ui'

const [num, setNum] = useState<number | null>(5)

<InputNumber value={num} onChange={setNum} min={0} max={100} showButtons />`

const passwordCode = `import { Password } from 'koi-ui'

const [pw, setPw] = useState('')

<Password value={pw} onChange={(e) => setPw(e.target.value)} feedback placeholder="Password" />`

const textareaCode = `import { Textarea } from 'koi-ui'

<Textarea placeholder="Auto-resizing textarea" autoResize />`

const selectCode = `import { Select } from 'koi-ui'

const [city, setCity] = useState<string>()
const cities = [{ label: 'Beijing', value: 'bj' }, { label: 'Shanghai', value: 'sh' }]

<Select options={cities} value={city} onChange={setCity} placeholder="Pick a city" />`

const multiSelectCode = `import { MultiSelect } from 'koi-ui'

const [multi, setMulti] = useState<string[]>(['sh'])

<MultiSelect options={cities} value={multi} onChange={setMulti} filter display="chip" />`

const commandCode = `import { Command } from 'koi-ui'

<Command
  groups={[{ heading: 'Cities', items: cities.map((c) => ({ value: c.value, label: c.label })) }]}
/>`

const listboxCode = `import { Listbox } from 'koi-ui'

const [sel, setSel] = useState('bj')

<Listbox options={cities} value={sel} onChange={setSel} filter />`

const checkboxCode = `import { Checkbox } from 'koi-ui'

const [checked, setChecked] = useState(true)

<Checkbox label="Checkbox" checked={checked} onChange={setChecked} />
<Checkbox label="Indeterminate" indeterminate />`

const radioGroupCode = `import { RadioGroup } from 'koi-ui'

const [radio, setRadio] = useState('a')

<RadioGroup
  orientation="horizontal"
  value={radio}
  onChange={setRadio}
  options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }, { label: 'C', value: 'c', disabled: true }]}
/>`

const switchCode = `import { Switch } from 'koi-ui'

const [on, setOn] = useState(true)

<Switch label="Switch" checked={on} onChange={setOn} />`

const toggleButtonCode = `import { ToggleButton } from 'koi-ui'
import { Star } from 'lucide-react'

const [toggle, setToggle] = useState(false)

<ToggleButton checked={toggle} onChange={setToggle} onLabel="On" offLabel="Off" onIcon={Star} offIcon={Star} />`

const selectButtonCode = `import { SelectButton } from 'koi-ui'

const [segment, setSegment] = useState('list')

<SelectButton
  value={segment}
  onChange={setSegment}
  options={[{ label: 'List', value: 'list' }, { label: 'Grid', value: 'grid' }, { label: 'Table', value: 'table' }]}
/>`

const sliderCode = `import { Slider } from 'koi-ui'

const [slider, setSlider] = useState(40)

<Slider value={slider} onChange={setSlider} />`

const ratingCode = `import { Rating } from 'koi-ui'

const [rate, setRate] = useState(3)

<Rating value={rate} onChange={setRate} allowHalf />`

const knobCode = `import { Knob } from 'koi-ui'

const [knob, setKnob] = useState(60)

<Knob value={knob} onChange={setKnob} />`

const colorPickerCode = `import { ColorPicker } from 'koi-ui'

const [color, setColor] = useState('#6366F1')

<ColorPicker value={color} onChange={setColor} />`

const datePickerCode = `import { DatePicker } from 'koi-ui'

const [date, setDate] = useState<Date>()

<DatePicker value={date} onChange={setDate} />`

const chipsInputCode = `import { ChipsInput } from 'koi-ui'

const [tags, setTags] = useState<string[]>(['react', 'ui'])

<ChipsInput value={tags} onChange={setTags} placeholder="Add tag…" />`

const floatLabelCode = `import { FloatLabel, Input } from 'koi-ui'

const [name, setName] = useState('')

<FloatLabel label="Username">
  <Input value={name} onChange={(e) => setName(e.target.value)} />
</FloatLabel>`

const inputGroupCode = `import { InputGroup, Input } from 'koi-ui'

<InputGroup addonBefore="https://">
  <Input placeholder="your-site" />
</InputGroup>`

export function FormsPage() {
  const form = useForm()
  const [submitting, setSubmitting] = useState(false)
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
      <Demo title="Form & Validation" description="useForm + FormItem rules; layout, labels, required, errors." code={formCode}>
        <Form
          form={form}
          layout="horizontal"
          labelWidth={120}
          initialValues={{ city: 'sh' }}
          onFinish={(v) => {
            setSubmitting(true)
            setTimeout(() => {
              setSubmitting(false)
              toast.success(`Submitted: ${JSON.stringify(v)}`)
            }, 800)
          }}
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
              <Button label="Submit" type="submit" loading={submitting} />
              <Button label="Reset" severity="secondary" text onClick={() => form.resetFields()} />
            </div>
          </FormItem>
        </Form>
      </Demo>

      <Demo title="Input" code={inputCode}>
        <div className="grid max-w-sm gap-3">
          <Input placeholder="Outlined" />
          <Input variant="filled" iconLeft={Search} placeholder="Filled w/ icon" />
        </div>
      </Demo>
      <Demo title="InputNumber" code={inputNumberCode}><InputNumber value={num} onChange={setNum} min={0} max={100} showButtons /></Demo>
      <Demo title="Password" code={passwordCode}><Password value={pw} onChange={(e) => setPw(e.target.value)} feedback placeholder="Password" /></Demo>
      <Demo title="Textarea" code={textareaCode}><Textarea placeholder="Auto-resizing textarea" autoResize /></Demo>
      <Demo title="Select" code={selectCode}><Select options={cities} value={city} onChange={setCity} placeholder="Pick a city" /></Demo>
      <Demo title="MultiSelect" code={multiSelectCode}><MultiSelect options={cities} value={multi} onChange={setMulti} filter display="chip" /></Demo>
      <Demo title="AutoComplete" description="Searchable command palette (cmdk)." code={commandCode}>
        <Command
          className="max-w-md"
          groups={[{ heading: 'Cities', items: cities.map((c) => ({ value: c.value, label: c.label })) }]}
        />
      </Demo>
      <Demo title="Listbox" code={listboxCode}><Listbox options={cities} value={listSel} onChange={setListSel} filter className="max-w-xs" /></Demo>
      <Demo title="Checkbox" code={checkboxCode}><Checkbox label="Checkbox" checked={checked} onChange={setChecked} /><span className="mx-3" /><Checkbox label="Indeterminate" indeterminate /></Demo>
      <Demo title="RadioGroup" code={radioGroupCode}>
        <RadioGroup orientation="horizontal" value={radio} onChange={setRadio} options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }, { label: 'C', value: 'c', disabled: true }]} />
      </Demo>
      <Demo title="Switch" code={switchCode}><Switch label="Switch" checked={on} onChange={setOn} /></Demo>
      <Demo title="ToggleButton" code={toggleButtonCode}><ToggleButton checked={toggle} onChange={setToggle} onLabel="On" offLabel="Off" onIcon={Star} offIcon={Star} /></Demo>
      <Demo title="SelectButton" code={selectButtonCode}>
        <SelectButton value={segment} onChange={setSegment} options={[{ label: 'List', value: 'list' }, { label: 'Grid', value: 'grid' }, { label: 'Table', value: 'table' }]} />
      </Demo>
      <Demo title="Slider" code={sliderCode}><Slider value={slider} onChange={setSlider} className="max-w-xs" /></Demo>
      <Demo title="Rating" code={ratingCode}><Rating value={rate} onChange={setRate} allowHalf /></Demo>
      <Demo title="Knob" code={knobCode}><Knob value={knob} onChange={setKnob} /></Demo>
      <Demo title="ColorPicker" code={colorPickerCode}><ColorPicker value={color} onChange={setColor} /></Demo>
      <Demo title="DatePicker" code={datePickerCode}><DatePicker value={date} onChange={setDate} /></Demo>
      <Demo title="ChipsInput" code={chipsInputCode}><ChipsInput value={tags} onChange={setTags} placeholder="Add tag…" /></Demo>
      <Demo title="FloatLabel" code={floatLabelCode}><FloatLabel label="Username"><Input value={fname} onChange={(e) => setFname(e.target.value)} /></FloatLabel></Demo>
      <Demo title="InputGroup" code={inputGroupCode}><InputGroup addonBefore="https://"><Input placeholder="your-site" /></InputGroup></Demo>

      <ApiSection>
        <ApiBlock
          name="Form"
          rows={[
            { name: 'form', type: 'FormInstance<T>', description: 'Form instance from useForm().' },
            { name: 'layout', type: "'vertical' | 'horizontal' | 'inline'", default: "'vertical'", description: 'Field layout.' },
            { name: 'size', type: "'small' | 'normal' | 'large'", description: 'Control size applied to all fields via context.' },
            { name: 'initialValues', type: 'Partial<T>', description: 'Initial field values.' },
            { name: 'colon', type: 'boolean', default: 'false', description: 'Append a colon after labels.' },
            { name: 'requiredMark', type: 'boolean', default: 'true', description: 'Show the required-field marker.' },
            { name: 'labelWidth', type: 'number | string', description: 'Label width in horizontal layout.' },
            { name: 'validateTrigger', type: "'onChange' | 'onBlur' | Array<...>", default: "['onChange','onBlur']", description: 'When fields validate (form-wide default).' },
            { name: 'onFinish', type: '(values: T) => void', description: 'Called on successful submit.' },
            { name: 'onFinishFailed', type: '(errors: Record<string, FieldError>) => void', description: 'Called when validation fails.' },
            { name: '...props', type: 'FormHTMLAttributes', description: 'Native form attributes (minus onSubmit).' },
          ]}
        />
        <ApiBlock
          name="FormItem"
          rows={[
            { name: 'name', type: 'string', description: 'Field name; binds the child control to the store.' },
            { name: 'label', type: 'ReactNode', description: 'Field label.' },
            { name: 'required', type: 'boolean', description: 'Force the required marker.' },
            { name: 'rules', type: 'Rule[]', description: 'Validation rules.' },
            { name: 'help', type: 'ReactNode', description: 'Helper text; replaced by the error message when invalid.' },
            { name: 'extra', type: 'ReactNode', description: 'Extra hint shown below help.' },
            { name: 'validateStatus', type: 'ValidateStatus', description: 'Force a validation status.' },
            { name: 'valuePropName', type: 'string', default: "'value'", description: 'Prop name the child uses for its value.' },
            { name: 'trigger', type: 'string', default: "'onChange'", description: 'Event name that reports changes.' },
            { name: 'validateTrigger', type: "'onChange' | 'onBlur' | Array<...>", description: "Override the form's validateTrigger for this field." },
            { name: 'getValueFromEvent', type: '(arg: unknown) => unknown', description: "Extract the value from the trigger's argument." },
            { name: 'children', type: 'ReactElement', description: 'The wrapped control.' },
          ]}
        />
        <ApiBlock
          name="Input"
          rows={[
            { name: 'inputSize', type: "'small' | 'normal' | 'large'", default: "'normal'", description: 'Control height/size.' },
            { name: 'variant', type: "'outlined' | 'filled'", default: "'outlined'", description: 'Visual style.' },
            { name: 'invalid', type: 'boolean', default: 'false', description: 'Error styling state.' },
            { name: 'iconLeft', type: 'LucideIcon', description: 'Icon inside the field on the left.' },
            { name: 'iconRight', type: 'LucideIcon', description: 'Icon inside the field on the right.' },
            { name: '...props', type: 'InputHTMLAttributes', description: 'Native input attributes (minus size).' },
          ]}
        />
        <ApiBlock
          name="InputNumber"
          rows={[
            { name: 'value', type: 'number | null', description: 'Controlled numeric value (null when empty).' },
            { name: 'onChange', type: '(value: number | null) => void', description: 'Change handler.' },
            { name: 'min', type: 'number', description: 'Minimum value.' },
            { name: 'max', type: 'number', description: 'Maximum value.' },
            { name: 'step', type: 'number', default: '1', description: 'Step increment.' },
            { name: 'fractionDigits', type: 'number', description: 'Number of fraction digits to display.' },
            { name: 'mode', type: "'decimal' | 'currency'", default: "'decimal'", description: 'Formatting mode.' },
            { name: 'currency', type: 'string', default: "'USD'", description: 'Currency code when mode is currency.' },
            { name: 'locale', type: 'string', description: 'Locale for number formatting.' },
            { name: 'prefix', type: 'string', description: 'Text prepended to the display.' },
            { name: 'suffix', type: 'string', description: 'Text appended to the display.' },
            { name: 'showButtons', type: 'boolean', description: 'Show increment/decrement buttons.' },
            { name: 'buttonLayout', type: "'stacked' | 'horizontal'", default: "'stacked'", description: 'Stepper button arrangement.' },
            { name: 'size', type: "'small' | 'normal' | 'large'", default: "'normal'", description: 'Control size.' },
            { name: 'invalid', type: 'boolean', description: 'Error styling state.' },
          ]}
        />
        <ApiBlock
          name="Password"
          rows={[
            { name: 'inputSize', type: "'small' | 'normal' | 'large'", description: 'Control size.' },
            { name: 'variant', type: "'outlined' | 'filled'", description: 'Visual style.' },
            { name: 'invalid', type: 'boolean', description: 'Error styling state.' },
            { name: 'toggleMask', type: 'boolean', default: 'true', description: 'Show the visibility toggle icon.' },
            { name: 'feedback', type: 'boolean', description: 'Show a strength meter below the field.' },
            { name: '...props', type: 'InputHTMLAttributes', description: 'Native input attributes (minus size, type).' },
          ]}
        />
        <ApiBlock
          name="Textarea"
          rows={[
            { name: 'variant', type: "'outlined' | 'filled'", default: "'outlined'", description: 'Visual style.' },
            { name: 'invalid', type: 'boolean', default: 'false', description: 'Error styling state.' },
            { name: 'autoResize', type: 'boolean', description: 'Grow with content instead of fixed rows.' },
            { name: 'rows', type: 'number', default: '3', description: 'Initial number of rows.' },
            { name: '...props', type: 'TextareaHTMLAttributes', description: 'Native textarea attributes (minus children).' },
          ]}
        />
        <ApiBlock
          name="Select"
          rows={[
            { name: 'options', type: 'SelectOption[]', description: 'Options to choose from.' },
            { name: 'value', type: 'string', description: 'Controlled selected value.' },
            { name: 'onChange', type: '(value: string) => void', description: 'Fires with the selected value.' },
            { name: 'placeholder', type: 'string', default: "'Select'", description: 'Placeholder shown when nothing is selected.' },
            { name: 'disabled', type: 'boolean', description: 'Disable the control.' },
            { name: 'invalid', type: 'boolean', description: 'Apply the error style.' },
            { name: 'size', type: "'small' | 'normal' | 'large'", default: "'normal'", description: 'Trigger size.' },
            { name: 'contentClassName', type: 'string', description: 'Width/class of the popover content.' },
            { name: 'name', type: 'string', description: 'Form field name.' },
          ]}
        />
        <ApiBlock
          name="MultiSelect"
          rows={[
            { name: 'options', type: 'MultiSelectOption[]', description: 'Options to choose from.' },
            { name: 'value', type: 'string[]', default: '[]', description: 'Controlled selected values.' },
            { name: 'onChange', type: '(value: string[]) => void', description: 'Fires with the next selected values.' },
            { name: 'placeholder', type: 'string', default: "'Select'", description: 'Placeholder shown when nothing is selected.' },
            { name: 'filter', type: 'boolean', description: 'Show a search box in the panel.' },
            { name: 'display', type: "'comma' | 'chip'", default: "'comma'", description: 'How selected items appear in the trigger.' },
            { name: 'maxLabels', type: 'number', default: '3', description: 'Collapse to "n selected" past this count (comma mode).' },
            { name: 'size', type: "'small' | 'normal' | 'large'", default: "'normal'", description: 'Trigger size.' },
            { name: 'disabled', type: 'boolean', description: 'Disable the control.' },
            { name: 'invalid', type: 'boolean', description: 'Apply the error style.' },
          ]}
        />
        <ApiBlock
          name="Command"
          rows={[
            { name: 'groups', type: 'CommandGroup[]', description: 'Grouped command items to render.' },
            { name: 'placeholder', type: 'string', default: "'Type a command or search…'", description: 'Search input placeholder.' },
            { name: 'emptyText', type: 'ReactNode', default: "'No results found.'", description: 'Content shown when no items match.' },
            { name: 'searchable', type: 'boolean', default: 'true', description: 'Hide the search input (static list) when false.' },
            { name: 'className', type: 'string', description: 'Class applied to the root element.' },
          ]}
        />
        <ApiBlock
          name="Listbox"
          rows={[
            { name: 'options', type: 'ListboxOption[]', description: 'Options to render.' },
            { name: 'multiple', type: 'boolean', description: 'Enable multi-selection (changes value/onChange shape).' },
            { name: 'value', type: 'string | string[]', description: 'Controlled selected value(s).' },
            { name: 'onChange', type: '(value: string | string[]) => void', description: 'Fires with the next selection.' },
            { name: 'filter', type: 'boolean', description: 'Show a search box.' },
            { name: 'listClassName', type: 'string', description: 'Max height/class of the scroll area.' },
          ]}
        />
        <ApiBlock
          name="Checkbox"
          rows={[
            { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
            { name: 'indeterminate', type: 'boolean', description: 'Render the indeterminate (mixed) state.' },
            { name: 'onChange', type: '(checked: boolean) => void', description: 'Fires with the next boolean state.' },
            { name: 'label', type: 'ReactNode', description: 'Inline label rendered next to the box.' },
            { name: 'invalid', type: 'boolean', description: 'Apply the error style.' },
            { name: '...props', type: 'CheckboxPrimitive.Root props', description: 'Native/Radix checkbox root attributes (e.g. id, disabled, name).' },
          ]}
        />
        <ApiBlock
          name="RadioGroup"
          rows={[
            { name: 'options', type: 'RadioOption[]', description: 'Options to render.' },
            { name: 'value', type: 'string', description: 'Controlled selected value.' },
            { name: 'onChange', type: '(value: string) => void', description: 'Fires with the newly selected value.' },
            { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'Layout direction of the options.' },
            { name: 'invalid', type: 'boolean', description: 'Apply the error style.' },
            { name: '...props', type: 'RadioGroupPrimitive.Root props', description: 'Native/Radix radio group attributes (e.g. name, disabled, required).' },
          ]}
        />
        <ApiBlock
          name="Switch"
          rows={[
            { name: 'checked', type: 'boolean', description: 'Controlled on/off state.' },
            { name: 'onChange', type: '(checked: boolean) => void', description: 'Fires with the next boolean state.' },
            { name: 'label', type: 'ReactNode', description: 'Inline label rendered next to the switch.' },
            { name: '...props', type: 'SwitchPrimitive.Root props', description: 'Native/Radix switch attributes (minus checked/onCheckedChange/onChange).' },
          ]}
        />
        <ApiBlock
          name="ToggleButton"
          rows={[
            { name: 'checked', type: 'boolean', description: 'Controlled pressed state.' },
            { name: 'onChange', type: '(checked: boolean) => void', description: 'Fires with the next pressed state.' },
            { name: 'onLabel', type: 'string', description: 'Label shown when pressed (falls back to offLabel).' },
            { name: 'offLabel', type: 'string', description: 'Label shown when not pressed.' },
            { name: 'onIcon', type: 'LucideIcon', description: 'Icon shown when pressed (falls back to offIcon).' },
            { name: 'offIcon', type: 'LucideIcon', description: 'Icon shown when not pressed.' },
            { name: 'size', type: "'small' | 'normal' | 'large'", default: "'normal'", description: 'Control size.' },
            { name: '...props', type: 'TogglePrimitive.Root props', description: 'Native/Radix toggle attributes (minus pressed/onPressedChange/onChange).' },
          ]}
        />
        <ApiBlock
          name="SelectButton"
          rows={[
            { name: 'options', type: 'SelectButtonOption[]', description: 'List of choices ({ label?, value, icon?, disabled? }).' },
            { name: 'multiple', type: 'boolean', description: 'Enable multi-selection (changes value/onChange shape).' },
            { name: 'value', type: 'string | string[]', description: 'Selected value(s).' },
            { name: 'onChange', type: '(value: string | string[]) => void', description: 'Fires with the selection.' },
            { name: 'size', type: "'small' | 'normal' | 'large'", default: "'normal'", description: 'Control size.' },
            { name: 'disabled', type: 'boolean', description: 'Disable the whole group.' },
          ]}
        />
        <ApiBlock
          name="Slider"
          rows={[
            { name: 'range', type: 'boolean', description: 'Enable range (two-thumb) mode (changes value/onChange shape).' },
            { name: 'value', type: 'number | [number, number]', description: 'Current value or range.' },
            { name: 'onChange', type: '(value: number | [number, number]) => void', description: 'Fires with the new value/range.' },
            { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Slider orientation.' },
            { name: '...props', type: 'SliderPrimitive.Root props', description: 'Native/Radix slider attributes (e.g. min, max, step, disabled).' },
          ]}
        />
        <ApiBlock
          name="Rating"
          rows={[
            { name: 'value', type: 'number', default: '0', description: 'Current rating.' },
            { name: 'onChange', type: '(value: number) => void', description: 'Fires with the picked value (toggles to 0 if same).' },
            { name: 'count', type: 'number', default: '5', description: 'Number of stars.' },
            { name: 'allowHalf', type: 'boolean', description: 'Allow half-star selection.' },
            { name: 'readOnly', type: 'boolean', description: 'Render non-interactive.' },
            { name: 'disabled', type: 'boolean', description: 'Disable interaction (dims).' },
            { name: 'size', type: 'number', default: '20', description: 'Star size in pixels.' },
          ]}
        />
        <ApiBlock
          name="Knob"
          rows={[
            { name: 'value', type: 'number', default: '0', description: 'Current value.' },
            { name: 'onChange', type: '(value: number) => void', description: 'Fires with the new value.' },
            { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
            { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
            { name: 'step', type: 'number', default: '1', description: 'Step increment.' },
            { name: 'size', type: 'number', default: '100', description: 'Diameter in pixels.' },
            { name: 'strokeWidth', type: 'number', default: '14', description: 'Arc stroke width.' },
            { name: 'showValue', type: 'boolean', default: 'true', description: 'Show centered value text.' },
            { name: 'valueTemplate', type: '(value: number) => string', description: 'Format the centered value text.' },
            { name: 'readOnly', type: 'boolean', description: 'Render non-interactive.' },
            { name: 'disabled', type: 'boolean', description: 'Disable interaction (dims).' },
          ]}
        />
        <ApiBlock
          name="ColorPicker"
          rows={[
            { name: 'value', type: 'string', default: "'#6366F1'", description: 'Hex color string (e.g. "#6366F1").' },
            { name: 'onChange', type: '(value: string) => void', description: 'Called with the new hex color.' },
            { name: 'showInput', type: 'boolean', default: 'true', description: 'Show a hex text input under the picker.' },
            { name: 'disabled', type: 'boolean', description: 'Disable the picker.' },
            { name: 'className', type: 'string', description: 'Extra classes for the trigger.' },
          ]}
        />
        <ApiBlock
          name="DatePicker"
          rows={[
            { name: 'value', type: 'Date', description: 'Selected date.' },
            { name: 'onChange', type: '(date: Date | undefined) => void', description: 'Called when a date is selected.' },
            { name: 'format', type: 'string', default: "'yyyy-MM-dd'", description: 'date-fns format string for the displayed value.' },
            { name: 'placeholder', type: 'string', default: "'Select date'", description: 'Placeholder when no date is selected.' },
            { name: 'size', type: "'small' | 'normal' | 'large'", default: "'normal'", description: 'Trigger size.' },
            { name: 'disabled', type: 'boolean', description: 'Disable the field.' },
            { name: 'invalid', type: 'boolean', description: 'Mark the field as invalid.' },
            { name: 'disabledDays', type: "DayPickerProps['disabled']", description: 'Disable days (passed to react-day-picker).' },
          ]}
        />
        <ApiBlock
          name="ChipsInput"
          rows={[
            { name: 'value', type: 'string[]', default: '[]', description: 'Current chip values.' },
            { name: 'onChange', type: '(value: string[]) => void', description: 'Called with the updated chip array.' },
            { name: 'placeholder', type: 'string', description: 'Placeholder shown when empty.' },
            { name: 'max', type: 'number', description: 'Max number of chips allowed.' },
            { name: 'separators', type: 'string[]', default: "[',']", description: 'Keys that commit the current text (besides Enter).' },
            { name: 'allowDuplicate', type: 'boolean', description: 'Prevent duplicate values when false.' },
            { name: 'disabled', type: 'boolean', description: 'Disable the input.' },
            { name: 'invalid', type: 'boolean', description: 'Mark the field as invalid.' },
          ]}
        />
        <ApiBlock
          name="FloatLabel"
          rows={[
            { name: 'label', type: 'ReactNode', description: 'The floating label text.' },
            { name: 'children', type: 'ReactElement', description: 'A single form control (Input, Select, etc.).' },
            { name: 'className', type: 'string', description: 'Extra classes for the wrapper.' },
          ]}
        />
        <ApiBlock
          name="InputGroup"
          rows={[
            { name: 'children', type: 'ReactNode', description: 'The inner form control.' },
            { name: 'addonBefore', type: 'ReactNode', description: 'Content attached before the field (text or icon).' },
            { name: 'addonAfter', type: 'ReactNode', description: 'Content attached after the field.' },
            { name: 'size', type: "'small' | 'normal' | 'large'", default: "'normal'", description: 'Group height.' },
            { name: 'className', type: 'string', description: 'Extra classes for the group.' },
          ]}
        />
      </ApiSection>
    </Page>
  )
}
