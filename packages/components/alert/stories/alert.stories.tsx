import type { Meta, StoryObj } from '@storybook/react'
import Alert, { AlertProps } from '../src/alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      type: 'string',
      control: 'text',
    },
    children: {
      type: 'string',
      control: 'text',
    },
    appearance: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'warning',
        'success',
        'danger',
        'neutral',
      ],
    },
  },
}

const appearanceVariants: AlertProps['appearance'][] = [
  'primary',
  'secondary',
  'warning',
  'success',
  'danger',
  'neutral',
]

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    title: 'Alert title',
    children:
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
  },
}

export const Colors: Story = {
  render: () => (
    <div className="flex gap-5 flex-col">
      {appearanceVariants.map((appearance) => (
        <Alert key={appearance} appearance={appearance} title="Alert title">
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat.
        </Alert>
      ))}
    </div>
  ),
}
