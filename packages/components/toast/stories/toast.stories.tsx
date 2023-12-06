import { Meta, StoryObj } from '@storybook/react'
import { Button } from '@mochi-ui/button'
import { Toast, ToastProps } from '../src'
import { useToast } from '../src/hook/use-toast/use-toast'
import { Toaster } from '../src/toaster'

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
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

const texts = [
  'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
  'Lorem ipsum dolor sit amet',
  'Lorem ipsum dolor sit amet',
  'Lorem ipsum dolor sit amet',
  'Lorem ipsum dolor sit amet, qui minim labore adipisicing',
]

export default meta

export const Default: StoryObj<typeof Toast> = {
  render: function Render(props) {
    const { toast } = useToast()
    return (
      <div className="w-[800px] min-h-[500px] max-h-[700px] overflow-y-auto flex items-center justify-center">
        <div className="fixed top-3 right-3 max-w-[500px] pointer-events-none mx-auto">
          <Toaster />
        </div>
        <Button
          onClick={() => {
            toast({
              duration: 3000,
              title: texts[Math.floor(Math.random() * 3)],
              description: texts[Math.floor(Math.random() * 3)],
              ...props,
            })
          }}
        >
          Toast
        </Button>
      </div>
    )
  },
}

export const StackToast: StoryObj<typeof Toast> = {
  render: function Render() {
    const { toast } = useToast()

    return (
      <div className="w-[800px] min-h-[500px] max-h-[700px] overflow-y-auto flex items-center justify-center">
        <div className="fixed top-3 right-3 max-w-[500px] pointer-events-none mx-auto">
          <Toaster align="right" />
        </div>
        <Button
          onClick={() => {
            toast({
              duration: 3000,
              title: texts[Math.floor(Math.random() * 3)],
              description: texts[Math.floor(Math.random() * 5)],
            })
          }}
        >
          Toast
        </Button>
      </div>
    )
  },
}

const colors = [
  'primary',
  'secondary',
  'neutral',
  'success',
  'danger',
  'warning',
] as ToastProps['scheme'][]

export const Colors: StoryObj<typeof Toast> = {
  render: function Render() {
    const { toast } = useToast()
    return (
      <div className="w-[800px] min-h-[500px] max-h-[700px] overflow-y-auto flex items-center justify-center">
        <div className="fixed top-3 right-3 max-w-[500px] pointer-events-none">
          <Toaster />
        </div>
        <Button
          onClick={() =>
            toast({
              duration: 3000,
              title: texts[Math.floor(Math.random() * 5)],
              description: texts[Math.floor(Math.random() * 5)],
              scheme: colors[Math.floor(Math.random() * 6)],
            })
          }
        >
          Toast
        </Button>
      </div>
    )
  },
}
