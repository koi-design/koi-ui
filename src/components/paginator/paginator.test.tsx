import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Paginator } from './paginator'

describe('Paginator', () => {
  it('shows an empty total range', () => {
    render(<Paginator page={1} pageSize={10} total={0} showTotal />)

    expect(screen.getByText('0–0 of 0')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
  })

  it('clamps an out-of-range current page for display and navigation', () => {
    render(<Paginator page={99} pageSize={10} total={25} showTotal />)

    expect(screen.getByText('21–25 of 25')).toBeInTheDocument()
    expect(screen.getByRole('button', { current: 'page' })).toHaveTextContent('3')
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
  })

  it('emits the selected page when navigating', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Paginator page={2} pageSize={10} total={35} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Next page' }))
    expect(onChange).toHaveBeenLastCalledWith(3)

    await user.click(screen.getByRole('button', { name: '1' }))
    expect(onChange).toHaveBeenLastCalledWith(1)
  })
})
