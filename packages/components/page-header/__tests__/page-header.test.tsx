import userEvent from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/react'
import { Button } from '@mochi-ui/button'
import { PageHeader } from '../src'

describe('Page Header', () => {
  it('renders the title correctly', () => {
    const { container } = render(
      <PageHeader title="Page Title" titleExtra="(2,951 members)" />,
    )

    const title = container.querySelector('h5')
    expect(title?.innerHTML || '').toBe('Page Title')
  })

  it('renders the title extra correctly', () => {
    const titleExtraValue = '(2,951 members)'

    const { container } = render(
      <PageHeader title="Page Title" titleExtra={titleExtraValue} />,
    )
    const titleExtra = container.querySelector('span')

    expect(titleExtra?.innerHTML || '').toBe(titleExtraValue)
  })

  it('applies the onBack function correctly', async () => {
    const mockFunction = jest.fn()

    const { container } = render(
      <PageHeader onBack={mockFunction} title="Page Title" />,
    )

    const backButton = container.querySelector('button')
    if (backButton) {
      userEvent.click(backButton)
    }

    await waitFor(() => {
      expect(mockFunction).toHaveBeenCalledTimes(1)
    })
  })

  it('renders the actions correctly', () => {
    const { container } = render(
      <PageHeader
        title="Page Title"
        actions={[<Button>Button one</Button>, <Button>Button two</Button>]}
      />,
    )

    const buttons = container.querySelectorAll('button')
    expect(Array.from(buttons).length).toBe(2)
  })
})
