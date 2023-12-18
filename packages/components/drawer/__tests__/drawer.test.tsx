import userEvent from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '../src/drawer'

const Component = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button type="button">Open drawer</button>
      </DrawerTrigger>
      <DrawerContent className="space-y-2">
        <DrawerTitle>Hello</DrawerTitle>
        <DrawerDescription>This is a drawer description.</DrawerDescription>
      </DrawerContent>
    </Drawer>
  )
}

const RightAnchorComponent = () => {
  return (
    <Drawer anchor="right">
      <DrawerTrigger asChild>
        <button type="button">Open drawer</button>
      </DrawerTrigger>
      <DrawerContent className="space-y-2">
        <DrawerTitle>Hello</DrawerTitle>
        <DrawerDescription>This is a drawer description.</DrawerDescription>
      </DrawerContent>
    </Drawer>
  )
}

describe('Drawer', () => {
  it('renders the drawer with the correct class names', async () => {
    const { getByRole, getByText } = render(<Component />)
    const button = getByText('Open drawer')
    userEvent.click(button)

    await waitFor(() => {
      const content = getByRole('dialog')
      expect(content).toHaveClass('fixed')
      expect(content).toHaveAttribute('data-state', 'open')
    })
  })

  it('renders the drawer with the correct anchor', async () => {
    const { getByRole, getByText } = render(<RightAnchorComponent />)
    const button = getByText('Open drawer')
    userEvent.click(button)

    await waitFor(() => {
      const content = getByRole('dialog')
      expect(content).toHaveClass('h-screen top-0 right-0')
    })
  })
})
