import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from './form'
import { FormItem } from './form-item'
import { runRules, useForm } from './use-form'
import { Input } from '../input/input'

describe('runRules', () => {
  it('returns the first required error for empty values', async () => {
    await expect(runRules('', [{ required: true, message: 'Email is required' }])).resolves.toBe(
      'Email is required',
    )
    await expect(runRules([], [{ required: true }])).resolves.toBe('This field is required')
  })

  it('validates length, numeric range, pattern, and custom validators', async () => {
    await expect(runRules('ab', [{ min: 3 }])).resolves.toBe('Min length 3')
    await expect(runRules(11, [{ max: 10 }])).resolves.toBe('Max 10')
    await expect(runRules('nope', [{ pattern: /^ok$/ }])).resolves.toBe('Invalid format')
    await expect(
      runRules('taken', [{ validator: async (value) => (value === 'taken' ? 'Already taken' : undefined) }]),
    ).resolves.toBe('Already taken')
    await expect(runRules('ok', [{ required: true }, { pattern: /^ok$/ }])).resolves.toBeUndefined()
  })
})

describe('Form integration', () => {
  it('submits values and reports validation failures', async () => {
    const user = userEvent.setup()
    const onFinish = vi.fn()
    const onFinishFailed = vi.fn()

    function Harness() {
      const form = useForm<{ email: string }>()
      return (
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <FormItem name="email" label="Email" rules={[{ required: true, message: 'Required' }]}>
            <Input aria-label="Email" />
          </FormItem>
          <button type="submit">Submit</button>
        </Form>
      )
    }

    render(<Harness />)

    await user.click(screen.getByRole('button', { name: 'Submit' }))
    await waitFor(() => expect(onFinishFailed).toHaveBeenCalledWith({ email: { status: 'error', message: 'Required' } }))
    expect(onFinish).not.toHaveBeenCalled()

    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'hello@example.com')
    await user.click(screen.getByRole('button', { name: 'Submit' }))
    await waitFor(() => expect(onFinish).toHaveBeenCalledWith({ email: 'hello@example.com' }))
  })

  it('validates the latest value on blur-only fields', async () => {
    const user = userEvent.setup()

    render(
      <Form validateTrigger="onBlur">
        <FormItem name="name" label="Name" rules={[{ min: 2, message: 'Too short' }]}>
          <Input aria-label="Name" />
        </FormItem>
      </Form>,
    )

    const input = screen.getByRole('textbox', { name: 'Name' })
    await user.type(input, 'ab')
    await user.tab()

    await waitFor(() => expect(screen.queryByText('Too short')).not.toBeInTheDocument())
  })
})
