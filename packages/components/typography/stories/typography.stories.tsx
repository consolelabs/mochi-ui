import type { Meta, StoryObj } from '@storybook/react'
import Typography, { TypographyProps } from '../src/typography'

const meta: Meta<typeof Typography> = {
  title: 'components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'title-lg',
        'title-md',
        'title-sm',
        'body-lg',
        'body-md',
        'body-sm',
        'body-xs',
        'inherit',
      ],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'neutral',
        'textPrimary',
        'textSecondary',
        'textTertiary',
      ],
    },
    noWrap: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Typography>

export const Default: Story = {
  args: {
    children: 'Lorem ipsum',
  },
}

const levelVariants: TypographyProps['level'][] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'title-lg',
  'title-md',
  'title-sm',
  'body-lg',
  'body-md',
  'body-sm',
  'body-xs',
  'inherit',
]

export const Levels: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {levelVariants.map((level) => (
        <Typography key={level} level={level}>
          Lorem ipsum
        </Typography>
      ))}
    </div>
  ),
}

const colorVariants: TypographyProps['color'][] = [
  'primary',
  'secondary',
  'danger',
  'success',

  'warning',
  'neutral',
  'textPrimary',
  'textSecondary',
  'textTertiary',
]

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {colorVariants.map((color) => (
        <Typography key={color} color={color}>
          Lorem ipsum
        </Typography>
      ))}
    </div>
  ),
}
