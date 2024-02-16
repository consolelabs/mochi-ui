import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '@mochi-ui/avatar'
import { WebSolid } from '@mochi-ui/icons'
import { AvatarGroup, AvatarGroupProps } from '../src'

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
        <Avatar size="xxs" src="https://mochi.gg/logo.png" />
        <Avatar size="xs" src="https://mochi.gg/logo.png" />
        <Avatar size="sm" src="https://mochi.gg/logo.png" />
        <Avatar src="https://mochi.gg/logo.png" />
        <Avatar size="lg" src="https://mochi.gg/logo.png" />
        <Avatar size="xl" src="https://mochi.gg/logo.png" />
        <Avatar size="2xl" src="https://mochi.gg/logo.png" />
        <Avatar size="3xl" src="https://mochi.gg/logo.png" />
      </div>
    )
  },
}

export const Fallback: Story = {
  render: () => {
    return (
      <div className="gap-3 flex">
        <Avatar size="xl" src="https://mochi.gg/notfound.png" />
      </div>
    )
  },
}

export const Cutout: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-3">
        <div className="gap-3 flex">
          {(['xxs', 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'] as const).map(
            (size) => (
              <Avatar
                size={size}
                smallSrc="https://cdn.discordapp.com/emojis/1093923016691421205.png?size=240&quality=lossless"
                src="https://mochi.gg/logo.png"
              />
            ),
          )}
        </div>
        <div className="gap-3 flex">
          {(['xxs', 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'] as const).map(
            (size) => (
              <Avatar
                size={size}
                smallSrc={WebSolid}
                src="https://mochi.gg/logo.png"
              />
            ),
          )}
        </div>
      </div>
    )
  },
}

export const Group: Story = {
  render: () => {
    return (
      <div className="space-y-3">
        {['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].map((size) => (
          <div className="gap-3 flex flex-wrap" key={size}>
            <AvatarGroup size={size as AvatarGroupProps['size']}>
              {Array(2).fill(<Avatar src="https://mochi.gg/logo.png" />)}
            </AvatarGroup>

            <AvatarGroup size={size as AvatarGroupProps['size']}>
              {Array(3).fill(<Avatar src="https://mochi.gg/logo.png" />)}
            </AvatarGroup>

            <AvatarGroup size={size as AvatarGroupProps['size']}>
              {Array(4).fill(<Avatar src="https://mochi.gg/logo.png" />)}
            </AvatarGroup>

            <AvatarGroup size={size as AvatarGroupProps['size']}>
              {Array(20).fill(<Avatar src="https://mochi.gg/logo.png" />)}
            </AvatarGroup>
          </div>
        ))}
      </div>
    )
  },
}
Group.name = 'Avatar Group'
