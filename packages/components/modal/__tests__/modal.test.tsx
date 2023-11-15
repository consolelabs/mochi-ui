import userEvent from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/react'
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalTitle,
  ModalTrigger,
} from '../src/modal'

const Component = () => {
  return (
    <Modal modal>
      <ModalTrigger asChild>
        <button type="button">Open modal</button>
      </ModalTrigger>
      <ModalContent className="space-y-2">
        <ModalTitle>Hello</ModalTitle>
        <ModalDescription>This is a modal description.</ModalDescription>
      </ModalContent>
    </Modal>
  )
}

describe('Modal', () => {
  it('renders the modal with the correct class names', async () => {
    const { getByRole, getByText } = render(<Component />)
    const button = getByText('Open modal')
    userEvent.click(button)

    await waitFor(() => {
      const content = getByRole('dialog')
      expect(content).toHaveClass('fixed')
      expect(content).toHaveAttribute('data-state', 'open')
    })
  })
})
