import type { Meta, StoryObj } from '@storybook/react'
// import Avatar from '../avatar/avatar'
import Badge from './badge'
import type { BadgeProps } from './badge'
import {
  IconSolidDot,
  IconClose,
  IconArrow,
  IconTwinkle,
  IconPlus,
} from '@consolelabs/icons'

const args: BadgeProps[] = [
  {
    label: 'Label',
  },
  {
    label: 'Label',
    icon: <IconSolidDot />,
  },
//   {
//     label: 'Label',
//     icon: <Avatar src="https://mochi.gg/logo.png" />,
//     isAvatarIcon: true,
//   },
  {
    label: 'Label',
    icon: <IconClose />,
    iconPosition: 'right',
  },
  {
    label: 'Label',
    icon: <IconArrow />,
    iconPosition: 'right',
  },
  {
    label: 'Label',
    icon: <IconTwinkle />,
  },
  {
    icon: <IconPlus />,
  },
]

const renderByAppearance = (appearance: BadgeProps['appearance']) => (
  <div className="flex gap-3">
    {args.map((props, i) => (
      <Badge
        {...props}
        appearance={appearance}
        key={`badge-${appearance}-${i}`}
      />
    ))}
  </div>
)

const meta: Meta<typeof Badge> = {
  title: 'ui/Badge',
  component: Badge,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    label: {
      type: 'string',
      control: 'text',
    },
    icon: {
      control: 'select',
      options: ['avatar', 'icon-arrow', 'icon-dot'],
    //   mapping: {
    //     avatar: <Avatar src="https://mochi.gg/logo.png" />,
    //     'icon-dot': <IconSolidDot />,
    //     'icon-arrow': <IconArrow />,
    //   },
    },
    appearance: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'black',
        'white',
      ],
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
    isAvatarIcon: {
      control: 'select',
      options: [true, false],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    label: 'Label',
    icon: <IconPlus />,
  },
}

export const Primary: Story = {
  render: () => renderByAppearance('primary'),
}

export const Secondary: Story = {
  render: () => renderByAppearance('secondary'),
}

export const Success: Story = {
  render: () => renderByAppearance('success'),
}

export const Danger: Story = {
  render: () => renderByAppearance('danger'),
}

export const Warning: Story = {
  render: () => renderByAppearance('warning'),
}

export const Black: Story = {
  render: () => renderByAppearance('black'),
}

export const White: Story = {
  render: () => renderByAppearance('white'),
}
