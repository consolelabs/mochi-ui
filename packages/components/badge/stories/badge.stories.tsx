import type { Meta, StoryObj } from '@storybook/react'
import {
  SolidDotSolid,
  CloseLine,
  ArrowDownLine,
  TwinkleSolid,
  PlusLine,
} from '@mochi-ui/icons'
import { Badge, BadgeIcon, BadgeProps } from '../src/badge'

const args = [
  {
    label: 'Label',
  },
  {
    icon: <SolidDotSolid />,
    label: 'Label',
  },
  {
    label: 'Label',
    icon: <CloseLine />,
    iconPosition: 'right',
  },
  {
    label: 'Label',
    icon: <ArrowDownLine />,
    iconPosition: 'right',
  },
  {
    label: 'Label',
    icon: <TwinkleSolid />,
  },
  {
    icon: <PlusLine />,
  },
]

const renderByAppearance = (appearance: BadgeProps['appearance']) => (
  <div className="flex gap-3">
    {args.map(({ icon, label, iconPosition = 'left' }, i) =>
      iconPosition === 'left' ? (
        <Badge appearance={appearance} key={`badge-${appearance}-${i}`}>
          {icon ? <BadgeIcon>{icon}</BadgeIcon> : null}
          {label}
        </Badge>
      ) : (
        <Badge appearance={appearance} key={`badge-${appearance}-${i}`}>
          {label}
          {icon ? <BadgeIcon>{icon}</BadgeIcon> : null}
        </Badge>
      ),
    )}
  </div>
)

const meta: Meta<typeof Badge> = {
  title: 'Data display/Badge',
  component: Badge,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: () => (
    <Badge>
      <BadgeIcon>
        <PlusLine />
      </BadgeIcon>
      Label
    </Badge>
  ),
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

export const TruncateText: Story = {
  render: () => (
    <Badge>
      <span className="w-32 truncate">
        The quick brown fox jumps over the lazy dog
      </span>
    </Badge>
  ),
}
