import type { Meta, StoryObj } from '@storybook/react'
import ProfileBadge from './profile-badge'

const meta: Meta<typeof ProfileBadge> = {
  title: 'ui/ProfileBadge',
  component: ProfileBadge,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof ProfileBadge>

export const Default: Story = {
  args: {
    avatar: 'https://mochi.gg/logo.png',
    platform:
      'https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png',
    name: 'vincent.console',
  },
}

export const Fallback: Story = {
  args: {
    avatar: 'https://mochi.gg/notfound.png',
    platform:
      'https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png',
    name: 'vincent.console',
  },
}

export const TooShort: Story = {
  args: {
    avatar: 'https://mochi.gg/logo.png',
    platform:
      'https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png',
    name: 'hnh',
  },
}

export const TooLong: Story = {
  args: {
    avatar: 'https://mochi.gg/logo.png',
    platform:
      'https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png',
    name: 'vincent.consolelabs.podtown.mochi',
  },
}
