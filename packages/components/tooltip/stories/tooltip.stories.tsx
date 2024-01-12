import type { Meta, StoryObj } from '@storybook/react'
import Tooltip, { ARROW_OPTIONS } from '../src/tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Overlay/Tooltip',
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
    children: 'Hover me',
    content: 'This is a tooltip',
  },
}

export const Dark: Story = {
  render: () => {
    return (
      <Tooltip className="dark" content="This is a tooltip" arrow="bottom-end">
        Hoverme
      </Tooltip>
    )
  },
}
