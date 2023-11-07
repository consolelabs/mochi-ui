import type { Meta, StoryObj } from '@storybook/react'
import Input from '../src/input'

const meta: Meta<typeof Input> = {
  title: 'ui/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['base', 'large'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {},
}

export function Size() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Input />
      <Input size="large" />
    </div>
  )
}

export function Disabled() {
  return <Input disabled placeholder="Placeholder" />
}

export function Error() {
  return <Input error placeholder="Placeholder" />
}
