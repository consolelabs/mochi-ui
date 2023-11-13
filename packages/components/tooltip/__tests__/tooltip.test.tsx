import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip } from '../src'

describe('Tooltip', () => {
  it('renders the tooltip with the correct content', async () => {
    const content = 'This is a tooltip'
    const { getByText, queryByText, queryAllByText } = render(
      <Tooltip content={content}>Hover me</Tooltip>,
    )
    const trigger = getByText('Hover me')
    expect(queryByText(content)).not.toBeInTheDocument()
    userEvent.hover(trigger)
    await waitFor(() => {
      expect(queryAllByText(content)[0]).toBeInTheDocument()
    })
  })
})
