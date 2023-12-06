import type { Meta, StoryObj } from '@storybook/react'
import { ActionBar } from '../src'

const meta: Meta<typeof ActionBar> = {
  title: 'Feedback/ActionBar',
  component: ActionBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      type: 'string',
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    paddingSize: {
      control: 'select',
      options: ['large', 'default'],
    },
  },
}

export default meta

type Story = StoryObj<typeof ActionBar>

export const Default: Story = {
  render() {
    return <div>asdas</div>
  },
}
