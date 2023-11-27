import type { Meta, StoryObj } from '@storybook/react'
import Alert, { AlertProps } from '../src/alert'
import { AlertTitle } from '../src/alert-title'
import { AlertIcon } from '../src'
import { AlertDescription } from '../src/alert-description'
import { AlertCloseIcon } from '../src/alert-close'

const schemes = [
  'primary',
  'secondary',
  'warning',
  'success',
  'danger',
  'neutral',
] as NonNullable<AlertProps['scheme']>[]

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      type: 'string',
      control: 'text',
    },
    scheme: {
      control: 'select',
      options: schemes,
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    status: {
      control: 'select',
      options: ['info', 'danger', 'success', 'warning'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render(props) {
    return (
      <Alert {...props}>
        <AlertIcon />
        <AlertTitle>
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat.
        </AlertTitle>
        <AlertDescription>
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat.
        </AlertDescription>
        <AlertCloseIcon />
      </Alert>
    )
  },
}

export const Colors: Story = {
  render() {
    return (
      <div className="flex flex-col gap-3">
        {schemes.map((s) => (
          <Alert scheme={s}>
            <AlertIcon />
            <AlertTitle>Lorem ipsum</AlertTitle>
            <AlertDescription>
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit
              amet, qui minim labore adipisicing minim sint cillum sint
              consectetur cupidatat.
            </AlertDescription>
            <AlertCloseIcon />
          </Alert>
        ))}
      </div>
    )
  },
}
