import userEvent from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/react'
import { Button } from '@mochi-ui/button'
import {
  PageHeader,
  PageHeaderBackButton,
  PageHeaderTitle,
  PageHeaderTitleExtra,
  PageHeaderActions,
} from '../src'

describe('Page Header', () => {
  it('renders the title correctly', () => {
    const { container } = render(
      <PageHeader>
        <PageHeaderTitle>
          Page Title
          <PageHeaderTitleExtra>(2,951 members)</PageHeaderTitleExtra>
        </PageHeaderTitle>
      </PageHeader>,
    )

    const title = container.querySelector('h5')
    expect(title?.innerHTML || '').toBe('Page Title')
  })

  it('renders the title extra correctly', () => {
    const titleExtraValue = '(2,951 members)'

    const { container } = render(
      <PageHeader>
        <PageHeaderTitle>
          Page Title
          <PageHeaderTitleExtra>{titleExtraValue}</PageHeaderTitleExtra>
        </PageHeaderTitle>
      </PageHeader>,
    )
    const titleExtra = container.querySelector('span')

    expect(titleExtra?.innerHTML || '').toBe(titleExtraValue)
  })

  it('applies the onClick function correctly', async () => {
    const mockFunction = jest.fn()

    const { container } = render(
      <PageHeader>
        <PageHeaderBackButton onClick={mockFunction} />
        <PageHeaderTitle>Page Title</PageHeaderTitle>
      </PageHeader>,
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
      <PageHeader>
        <PageHeaderTitle>Page Title</PageHeaderTitle>
        <PageHeaderActions>
          <Button>Button one</Button> <Button>Button two</Button>
        </PageHeaderActions>
      </PageHeader>,
    )

    const buttons = container.querySelectorAll('button')
    expect(Array.from(buttons).length).toBe(2)
  })
})
