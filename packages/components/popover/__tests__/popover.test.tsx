import { fireEvent, render } from '@testing-library/react'
import { IconCheckCircled } from '@consolelabs/icons'
import { Popover, PopoverTrigger, PopoverContent } from '../src/popover'

const Component = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">Open</button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-1">
          {Array(5)
            .fill(null)
            .map((__, index) => (
              <div
                className="flex gap-3 items-center p-2 text-sm font-medium rounded-md text-neutral-800 hover:bg-neutral-150"
                key={index}
                role="listitem"
              >
                <div className="flex flex-col flex-1 min-w-[150px]">
                  <p>Console Labs {index}</p>
                  <p className="text-xs text-[#848281]">Lvl {430 + index}</p>
                </div>
                <IconCheckCircled />
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

describe('Component', () => {
  it('should render a button with the text "Open"', () => {
    const { getByRole } = render(<Component />)
    const button = getByRole('button', { name: 'Open' })
    expect(button).toBeInTheDocument()
  })

  it('should show the popover when the button is clicked', () => {
    const { getByRole } = render(<Component />)
    const button = getByRole('button', { name: 'Open' })
    fireEvent.click(button)
    const popoverContent = getByRole('dialog')
    expect(popoverContent).toBeInTheDocument()
    expect(popoverContent).toHaveAttribute('data-state', 'open')
  })

  it('should show the correct list items', () => {
    const { getByRole, getAllByRole } = render(<Component />)
    const button = getByRole('button', { name: 'Open' })
    fireEvent.click(button)
    const items = getAllByRole('listitem')
    expect(items).toHaveLength(5)
  })
})
