import { Meta, StoryObj } from '@storybook/react'
import { Button } from '@consolelabs/button'
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
      <div className="w-[800px] min-h-[500px] max-h-[700px] overflow-y-auto flex items-center justify-center">
        <Toaster />
        <Button
          onClick={() =>
            toast({
              variant: 'action',
              title: {
                children: 'labore adipisicing minim sint',
              },
              description: {
                children:
                  'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
              },
            })
          }
        >
          Toast
        </Button>
      </div>
    )
  },
}
