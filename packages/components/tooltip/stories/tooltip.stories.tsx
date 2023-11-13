import type { Meta, StoryObj } from '@storybook/react'
import { ARROW_OPTIONS } from '@consolelabs/theme'
import Tooltip from '../src/tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'components/Tooltip',
  component: Tooltip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    children: {
      type: 'string',
      control: 'text',
    },
    content: {
      type: 'string',
      control: 'text',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
    arrow: {
      control: 'select',
      options: ARROW_OPTIONS,
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Light: Story = {
  args: {
    theme: 'light',
    children: 'Hover me',
    content: 'This is a tooltip',
  },
}

export const Dark: Story = {
  args: {
    theme: 'dark',
    children: 'Hover me',
    content: 'This is a tooltip',
  },
}
