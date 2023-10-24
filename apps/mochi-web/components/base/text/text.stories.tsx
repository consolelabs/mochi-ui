import type { Meta, StoryObj } from '@storybook/react'
import Text from './text'

const meta: Meta<typeof Text> = {
  title: 'Example/Text',
  component: Text,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['primary'],
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg'],
      defaultValue: 'base',
    },
  },
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-y-2">
        <Text size="xs"> The quick brown fox jumps over the lazy dog </Text>
        <Text size="sm"> The quick brown fox jumps over the lazy dog </Text>
        <Text size="base"> The quick brown fox jumps over the lazy dog </Text>
        <Text size="lg"> The quick brown fox jumps over the lazy dog </Text>
      </div>
    )
  },
}
