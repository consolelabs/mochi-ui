import { Meta, StoryObj } from '@storybook/react'
import { Toast } from '../src'
import { useToast } from '../src/hook/use-toast'
import { Toaster } from '../src/toaster'

const meta: Meta<typeof Toast> = {
  title: 'Components/toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
  render: function Render() {
    const { toast } = useToast()
    return (
      <div>
        <Toaster />
        <button
          onClick={() =>
            toast({
              title: 'labore adipisicing minim sint',
              description:
                'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
            })
          }
        >
          Toast
        </button>
      </div>
    )
  },
}
