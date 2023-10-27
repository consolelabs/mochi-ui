import type { Meta, StoryObj } from "@storybook/react";
import { Modal, ModalContent, ModalDescription, ModalTitle, ModalTrigger } from "./modal";

const meta: Meta<typeof Modal> = {
    title: 'ui/Modal',
    component: Modal,
    tags: ['autodocs'],
    args: {
        modal: true
    }
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
    render({modal}) {
        return (
            <Modal modal={modal}>
                <ModalTrigger asChild>
                    <button type="button">
                        Open modal
                    </button>
                </ModalTrigger>
                <ModalContent className="space-y-2" showCloseBtn>
                    <ModalTitle>Hello</ModalTitle>
                    <ModalDescription>
                        This is a modal description. 
                        This is a modal description.
                        This is a modal description.
                        This is a modal description.
                    </ModalDescription>
                </ModalContent>
            </Modal>
        )
    }
}
