import type { Meta, StoryObj } from '@storybook/react'
import { IconArrowDown } from '@consolelabs/icons'
import IconButton from './icon-button'

const meta: Meta<typeof IconButton> = {
  title: 'ui/IconButton',
  component: IconButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'link', 'ghost'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    children: <IconArrowDown height={20} width={20} />,
  },
}
