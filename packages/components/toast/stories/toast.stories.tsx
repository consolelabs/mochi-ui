import { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, ToastTitle } from '@radix-ui/react-toast'
import { Toast, ToastViewPort } from '../src'

const meta: Meta<typeof Toast> = {
  title: 'Components/toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['foreground', 'background'],
    },
    duration: {
      control: 'number',
    },
    open: {
      control: 'boolean',
    },
    forceMount: {
      control: 'boolean',
    },
  },
}

export default meta

export const Default: StoryObj<typeof Toast> = {
  render(props) {
    return (
      <ToastProvider>
        <Toast {...props}>
          <ToastTitle>Loresum</ToastTitle>
        </Toast>
        <ToastViewPort />
      </ToastProvider>
    )
  },
}
