import type { Meta, StoryObj } from '@storybook/react'
import Input, { InputRoot } from '../src/input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input />
      <Input size="lg" />
    </div>
  )
}

export function Disabled() {
  return <Input disabled placeholder="Placeholder" />
}

export function Error() {
  return <Input error placeholder="Placeholder" />
}

export function Custom() {
  return (
    <InputRoot>
      <div className="shrink-0 w-5 h-5 bg-red-300" />
      <Input className="" error placeholder="Hello world" />
    </InputRoot>
  )
}
