import type { Meta, StoryObj } from '@storybook/react'
import { IconConnectWallets } from '../icons'
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
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    children: <IconConnectWallets height={20} width={20} />,
  },
}
