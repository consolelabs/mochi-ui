import type { Meta, StoryObj } from '@storybook/react'
import Alert, { AlertProps } from '../src/alert'
import { AlertTitle } from '../src/alert-title'
import { AlertIcon } from '../src'

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
            <AlertTitle>
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </AlertTitle>
          </Alert>
        ))}
      </div>
    )
  },
}
