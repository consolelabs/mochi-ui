import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from '../src'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default Meta

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: function render() {
    return (
      <div>
        <DatePicker />
      </div>
    )
  },
}
