import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'
import { InputNumber } from './input-number'

function ControlledInputNumber(props: React.ComponentProps<typeof InputNumber>) {
  const [value, setValue] = React.useState(props.value)
  return (
    <InputNumber
      {...props}
      value={value}
      onChange={(next) => {
        setValue(next)
        props.onChange?.(next)
      }}
    />
  )
}

describe('InputNumber', () => {
  it('shows formatted text when blurred and raw text while focused', async () => {
    const user = userEvent.setup()
    render(<ControlledInputNumber value={1234.5} locale="en-US" fractionDigits={2} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('1,234.50')

    await user.click(input)
    expect(input).toHaveValue('1234.5')
  })

  it('commits cleaned values and clamps to min and max', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ControlledInputNumber value={5} min={0} max={10} onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.clear(input)
    await user.type(input, '$12.50')
    await user.tab()

    expect(onChange).toHaveBeenLastCalledWith(10)
    expect(input).toHaveValue('10')
  })

  it('emits null for empty input', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ControlledInputNumber value={5} onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.clear(input)
    await user.tab()

    expect(onChange).toHaveBeenLastCalledWith(null)
    expect(input).toHaveValue('')
  })

  it('steps from the current value and respects bounds', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ControlledInputNumber
        value={9}
        min={0}
        max={10}
        step={2}
        showButtons
        buttonLayout="horizontal"
        onChange={onChange}
      />,
    )

    await user.click(screen.getAllByRole('button')[1])
    expect(onChange).toHaveBeenLastCalledWith(10)
    await waitFor(() => expect(screen.getByRole('textbox')).toHaveValue('10'))

    await user.click(screen.getAllByRole('button')[0])
    expect(onChange).toHaveBeenLastCalledWith(8)
  })
})
