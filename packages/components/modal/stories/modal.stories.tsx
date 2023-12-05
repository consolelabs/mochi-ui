import type { Meta, StoryObj } from '@storybook/react'
import { CheckCircleOutlined } from '@mochi-ui/icons'
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalTitle,
  ModalTrigger,
} from '../src/modal'

const meta: Meta<typeof Modal> = {
  title: 'Overlay/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    modal: true,
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render({ modal }) {
    return (
      <Modal modal={modal}>
        <ModalTrigger asChild>
          <button type="button">Open modal</button>
        </ModalTrigger>
        <ModalContent className="space-y-2">
          <ModalTitle>Hello</ModalTitle>
          <ModalDescription>
            This is a modal description. This is a modal description. This is a
            modal description. This is a modal description.
          </ModalDescription>
        </ModalContent>
      </Modal>
    )
  },
}

export const WithCloseButton: Story = {
  render({ modal }) {
    return (
      <Modal modal={modal}>
        <ModalTrigger asChild>
          <button type="button">Open modal</button>
        </ModalTrigger>
        <ModalContent className="space-y-2 max-w-sm" showCloseBtn>
          <ModalTitle>Hello</ModalTitle>
          <ModalDescription>
            This is a modal description. This is a modal description. This is a
            modal description. This is a modal description.
          </ModalDescription>
        </ModalContent>
      </Modal>
    )
  },
}

export const WithConfirm: Story = {
  render({ modal }) {
    return (
      <Modal modal={modal}>
        <ModalTrigger asChild>
          <button type="button">Open modal</button>
        </ModalTrigger>
        <ModalContent className="space-y-2 text-center max-w-sm">
          <div className="mb-8 flex flex-col gap-5 items-center">
            <CheckCircleOutlined className="text-4xl" />
            <div>
              <ModalTitle className="mb-2">Network Confirmation</ModalTitle>
              <ModalDescription>
                ETH selected as the transfer network. Few platforms support the
                ETH network. Please confirm that the receiving platform supports
                this network.
              </ModalDescription>
            </div>
          </div>
          <div className="flex gap-3">
            <ModalTrigger asChild>
              <button
                className="flex-1 border border-neutral-300 py-3 px-6 rounded-lg"
                type="button"
              >
                Cancel
              </button>
            </ModalTrigger>
            <ModalTrigger asChild>
              <button
                className="flex-1 bg-primary-700 py-3 px-6 text-white rounded-lg"
                // eslint-disable-next-line no-alert -- for demo
                onClick={() => alert('Confirmed')}
                type="button"
              >
                Confirm
              </button>
            </ModalTrigger>
          </div>
        </ModalContent>
      </Modal>
    )
  },
}
