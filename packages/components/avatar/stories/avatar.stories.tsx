import type { Meta, StoryObj } from '@storybook/react'
import Avatar, { AvatarSmallImage, AvatarStatus } from '../src/avatar'
import { DiscordColored } from '@mochi-ui/icons'

const meta: Meta<typeof Avatar> = {
  title: 'Media & Icons/Avatar',
  component: Avatar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: () => {
    return (
      <div className="gap-3 flex">
        <Avatar src="https://mochi.gg/logo.png" />
      </div>
    )
  },
}

export const SmallSrc: Story = {
  render: () => {
    return (
      <div className="gap-3 flex">
        {(['xs', 'sm', 'base', 'lg', 'xl'] as const).map((size) => (
          <Avatar size={size} src="https://mochi.gg/logo.png">
            <AvatarSmallImage src="https://cdn.discordapp.com/emojis/1093923016691421205.png?size=240&quality=lossless" />
          </Avatar>
        ))}
      </div>
    )
  },
}

export const Fallback: Story = {
  render: () => {
    return (
      <div className="gap-3 flex">
        <Avatar src="https://mochi.gg/notfound.png" />
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => {
    return (
      <div className="gap-3 flex">
        {(['xs', 'sm', 'base', 'lg', 'xl'] as const).map((size) => (
          <Avatar size={size} src="https://mochi.gg/logo.png"></Avatar>
        ))}
      </div>
    )
  },
}

export const Status: Story = {
  render: () => {
    return (
      <div className="gap-3 flex">
        {(
          [
            'primary',
            'secondary',
            'success',
            'warning',
            'danger',
            'neutral',
          ] as const
        ).map((color) => (
          <Avatar size="lg" src="https://mochi.gg/logo.png">
            <AvatarStatus color={color} />
          </Avatar>
        ))}
      </div>
    )
  },
}

export const StatusPosition: Story = {
  render: () => {
    return (
      <div className="gap-3 flex">
        {(
          ['bottom-left', 'bottom-right', 'top-left', 'top-right'] as const
        ).map((pos) => (
          <Avatar size="lg" src="https://mochi.gg/logo.png">
            <AvatarStatus position={pos} color="success" />
          </Avatar>
        ))}
      </div>
    )
  },
}

export const CustomStatusIcon: Story = {
  render: () => {
    return (
      <div>
        <Avatar src="https://mochi.gg/logo.png">
          <AvatarStatus position="bottom-right">
            <DiscordColored />
          </AvatarStatus>
        </Avatar>
      </div>
    )
  },
}
