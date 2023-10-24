import type { Meta, StoryObj } from '@storybook/react'
import { boringAvatar } from '~utils/string'
import Avatar from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Example/Avatar',
  component: Avatar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    src: {
      type: 'string',
      control: 'text',
    },
    cutoutSrc: {
      type: 'string',
      control: 'text',
    },
    srcFallbackText: {
      type: 'string',
      description:
        'The text to use for displaying incase the `src` image cannot be shown (we use boringavatar as fallback)',
    },
    srcFallbackVariant: {
      control: 'select',
      options: ['beam', 'ring'],
      description: 'Type of avatar to show (we use boringavatar)',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', 'parent'],
      defaultValue: 'base',
      description:
        'The size, "parent" means the avatar will take up the size of its parent',
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    src: boringAvatar('vincent'),
  },
}

export const Cutout: Story = {
  args: {
    src: boringAvatar('vincent'),
    cutoutSrc: boringAvatar('console.labs'),
  },
}

export const Size: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Avatar
          src={boringAvatar('vincent')}
          cutoutSrc={boringAvatar('consolelabs')}
          size="xs"
        />
        <Avatar
          src={boringAvatar('vincent')}
          cutoutSrc={boringAvatar('consolelabs')}
          size="sm"
        />
        <Avatar
          src={boringAvatar('vincent')}
          cutoutSrc={boringAvatar('consolelabs')}
          size="base"
        />
        <Avatar
          src={boringAvatar('vincent')}
          cutoutSrc={boringAvatar('consolelabs')}
          size="lg"
        />
        <Avatar
          src={boringAvatar('vincent')}
          cutoutSrc={boringAvatar('consolelabs')}
          size="xl"
        />
      </div>
    )
  },
}
