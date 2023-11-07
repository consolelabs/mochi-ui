import type { Meta, StoryObj } from '@storybook/react'
import Avatar from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'ui/Avatar',
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
        <Avatar size="xs" src="https://mochi.gg/logo.png" />
        <Avatar size="sm" src="https://mochi.gg/logo.png" />
        <Avatar src="https://mochi.gg/logo.png" />
        <Avatar size="lg" src="https://mochi.gg/logo.png" />
        <Avatar size="xl" src="https://mochi.gg/logo.png" />
      </div>
    )
  },
}

export const Fallback: Story = {
  render: () => {
    return (
      <div className="gap-3 flex">
        <Avatar size="lg" src="https://mochi.gg/notfound.png" />
      </div>
    )
  },
}

export const Cutout: Story = {
  render: () => {
    return (
      <div className="gap-3 flex">
        <Avatar
          size="xs"
          smallSrc="https://cdn.discordapp.com/emojis/1093923016691421205.png?size=240&quality=lossless"
          src="https://mochi.gg/logo.png"
        />
        <Avatar
          size="sm"
          smallSrc="https://cdn.discordapp.com/emojis/1093923016691421205.png?size=240&quality=lossless"
          src="https://mochi.gg/logo.png"
        />
        <Avatar
          smallSrc="https://cdn.discordapp.com/emojis/1093923016691421205.png?size=240&quality=lossless"
          src="https://mochi.gg/logo.png"
        />
        <Avatar
          size="lg"
          smallSrc="https://cdn.discordapp.com/emojis/1093923016691421205.png?size=240&quality=lossless"
          src="https://mochi.gg/logo.png"
        />
        <Avatar
          size="xl"
          smallSrc="https://cdn.discordapp.com/emojis/1093923016691421205.png?size=240&quality=lossless"
          src="https://mochi.gg/logo.png"
        />
      </div>
    )
  },
}
