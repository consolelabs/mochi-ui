import type { Meta, StoryObj } from '@storybook/react'
import Button from './button'

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'gray',
        'mochi',
        'text',
        'pill',
      ],
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'icon', 'icon-sm'],
      defaultValue: 'base',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Button',
    appearance: 'primary',
  },
}
export const Secondary: Story = {
  args: {
    children: 'Button',
    appearance: 'secondary',
  },
}
export const Tertiary: Story = {
  args: {
    children: 'Button',
    appearance: 'tertiary',
  },
}
export const Gray: Story = {
  args: {
    children: 'Button',
    appearance: 'gray',
  },
}
export const Text: Story = {
  args: {
    children: 'Button',
    appearance: 'text',
  },
}
export const Mochi: Story = {
  args: {
    children: 'Button',
    appearance: 'mochi',
  },
}
export const Pill: Story = {
  args: {
    children: 'Button',
    appearance: 'pill',
  },
}
export const All: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-3 gap-5 place-items-center grid-rows-7">
        {[
          'primary',
          'secondary',
          'tertiary',
          'gray',
          'text',
          'mochi',
          'pill',
        ].map((variant) => {
          return ['base', 'sm', 'xs'].map((size) => {
            return (
              <Button
                key={`${variant}-${size}`}
                appearance={variant as any}
                size={size as any}
              >
                Button
              </Button>
            )
          })
        })}
      </div>
    )
  },
}
