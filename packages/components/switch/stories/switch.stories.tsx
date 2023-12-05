import type { Meta, StoryObj } from '@storybook/react'
import Switch, { SwitchProps } from '../src/Switch'

const meta: Meta<typeof Switch> = {
  title: 'Form/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      type: 'boolean',
    },
    size: {
      type: 'string',
      control: 'select',
      options: ['sm', 'md'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: (props) => <Switch defaultChecked {...props} />,
}

export const Size: Story = {
  render: (props) => (
    <div className="flex gap-5">
      <Switch size="sm" defaultChecked {...props} />
      <Switch size="md" defaultChecked {...props} />
    </div>
  ),
}

export const WithLabel: Story = {
  render: (props) => (
    <div className="flex items-center gap-2">
      <label htmlFor="switch">Turn alarm on</label>
      <Switch id="switch" defaultChecked {...props} />
    </div>
  ),
}

export const Colors: Story = {
  render: (props) => {
    const colors: SwitchProps['color'][] = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'neutral',
    ]

    return (
      <div className="flex flex-col gap-4 items-center">
        {colors.map((color) => (
          <Switch key={color} color={color} defaultChecked {...props} />
        ))}
      </div>
    )
  },
}
