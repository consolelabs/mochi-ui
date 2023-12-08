import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { ConnectWalletWidget, ConnectWalletWidgetProps } from '../src'

const meta: Meta<typeof ConnectWalletWidget> = {
  title: 'web3/ConnectWalletWidget',
  component: ConnectWalletWidget,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ConnectWalletWidget>

const Template = (args: ConnectWalletWidgetProps) => (
  <ConnectWalletWidget {...args} />
)

export const Default: Story = {
  render: Template,
  args: {},
}
