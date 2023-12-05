import { Meta, StoryObj } from '@storybook/react'
import { Button } from '@mochi-ui/button'
import { Toast, ToastProps } from '../src'
import { useToast } from '../src/hook/use-toast/use-toast'
import { Toaster } from '../src/toaster'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
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
  'Lorem ipsum dolor sit amet, qui minim labore adipisicing',
]

export default meta

export const Default: StoryObj<typeof Toast> = {
  render: function Render(props) {
    const { toast } = useToast()
    return (
      <div className="w-[800px] min-h-[500px] max-h-[700px] overflow-y-auto flex items-center justify-center">
        <div className="fixed top-0 right-0 max-w-[500px] mx-auto">
          <Toaster />
        </div>
        <Button
          onClick={() => {
            toast({
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
        <div className="fixed top-0 w-[600px] m-auto">
          <Toaster />
        </div>
        <Button
          onClick={() => {
            toast({
              layout: 'stack',
              title: texts[Math.floor(Math.random() * 3)],
              description: texts[Math.floor(Math.random() * 3)],
              confirm: {
                label: 'confirm',
                altText: 'Confirm',
              },
              cancel: {
                label: 'Cancel',
                altText: 'Cancel',
              },
              duration: 10000,
            })
          }}
        >
          Toast
        </Button>
      </div>
    )
  },
}

export const InlineToast: StoryObj<typeof Toast> = {
  render: function Render() {
    const { toast } = useToast()
    return (
      <div className="w-[800px] min-h-[500px] max-h-[700px] overflow-y-auto flex items-center justify-center">
        <div className="fixed w-full bottom-0 p-10 pointer-events-none">
          <Toaster />
        </div>
        <Button
          onClick={() =>
            toast({
              layout: 'inline',
              title: texts[Math.floor(Math.random() * 3)],
              description: texts[Math.floor(Math.random() * 3)],
            })
          }
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
        <div className="fixed w-full bottom-0 p-10 pointer-events-none">
          <Toaster />
        </div>
        <Button
          onClick={() =>
            toast({
              layout: 'inline',
              title: texts[Math.floor(Math.random() * 3)],
              description: texts[Math.floor(Math.random() * 3)],
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

export const Actions: StoryObj<typeof Toast> = {
  render: function Render() {
    const { toast } = useToast()
    return (
      <div className="w-[800px] min-h-[500px] max-h-[700px] overflow-y-auto flex items-center justify-center">
        <div className="fixed w-full bottom-0 p-10 pointer-events-none">
          <Toaster />
        </div>
        <Button
          onClick={() =>
            toast({
              layout: 'inline',
              title: texts[Math.floor(Math.random() * 3)],
              description: texts[Math.floor(Math.random() * 3)],
              scheme: colors[Math.floor(Math.random() * 6)],
              confirm: {
                label: 'Save changes',
                altText: 'Save changes',
              },
              cancel: {
                label: 'Reset',
                altText: 'Reset',
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

export const ActionWithResponse: StoryObj<typeof Toast> = {
  render: function Render() {
    const { toast } = useToast()
    return (
      <div className="w-[800px] min-h-[500px] max-h-[700px] overflow-y-auto flex items-center justify-center">
        <div className="fixed w-full bottom-0 p-10 pointer-events-none">
          <Toaster />
        </div>
        <Button
          onClick={() => {
            const { update, dismiss } = toast({
              duration: Infinity,
              layout: 'inline',
              title: texts[Math.floor(Math.random() * 3)],
              description: texts[Math.floor(Math.random() * 3)],
              scheme: colors[Math.floor(Math.random() * 6)],
              confirm: {
                label: 'Save changes',
                altText: 'Save changes',
                onClick: (e) => {
                  e.preventDefault()
                  update({
                    confirm: {
                      label: '_',
                      altText: '_',
                      loading: true,
                    },
                  })
                  setTimeout(() => {
                    update({
                      confirm: {
                        label: 'Saved changes',
                        altText: 'Saved changes',
                        loading: false,
                      },
                    })
                    setTimeout(() => {
                      dismiss()
                    }, 1000)
                  }, 2000)
                },
              },
              cancel: {
                label: 'Reset',
                altText: 'Reset',
              },
            })
          }}
        >
          Toast
        </Button>
      </div>
    )
  },
}
