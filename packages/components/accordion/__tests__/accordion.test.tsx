import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../src/accordion'

const mockedData = [
  {
    value: '1',
    triggerLabel: 'Item 1',
    contentLabel: 'Content 1',
  },
  {
    value: '2',
    triggerLabel: 'Item 2',
    contentLabel: 'Content 2',
  },
]

describe('Accordion', () => {
  it('expands and collapses the accordion item when clicked', async () => {
    const { getByTestId } = render(
      <Accordion type="single">
        {mockedData.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger data-testid={item.triggerLabel}>
              {item.triggerLabel}
            </AccordionTrigger>
            <AccordionContent>{item.contentLabel}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>,
    )

    const item1Trigger = getByTestId('Item 1')
    const item2Trigger = getByTestId('Item 2')

    expect(item1Trigger).toHaveAttribute('aria-expanded', 'false')
    expect(item2Trigger).toHaveAttribute('aria-expanded', 'false')

    expect(item1Trigger).toBeInTheDocument()
    expect(item2Trigger).toBeInTheDocument()

    userEvent.click(item1Trigger)
    await waitFor(() => {
      expect(item1Trigger).toHaveAttribute('aria-expanded', 'true')
    })

    userEvent.click(item2Trigger)
    await waitFor(() => {
      expect(item2Trigger).toHaveAttribute('aria-expanded', 'true')
    })

    userEvent.click(item2Trigger)
    await waitFor(() => {
      expect(item1Trigger).toHaveAttribute('aria-expanded', 'false')
    })
  })
})
