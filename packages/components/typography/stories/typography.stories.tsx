import type { Meta, StoryObj } from '@storybook/react'
import Typography, { TypographyProps } from '../src/typography'

const meta: Meta<typeof Typography> = {
  title: 'Typography/Typography',
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
        'h5',
        'h6',
        'h7',
        'h8',
        'h9',
        'p1',
        'p2',
        'p3',
        'p4',
        'p5',
        'p6',
        'p7',
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
        'textDisabled',
      ],
    },
    fontWeight: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
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
    className: 'text-primary-500',
  },
}

const levelVariants: TypographyProps['level'][] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'h7',
  'h8',
  'h9',
  'p1',
  'p2',
  'p3',
  'p4',
  'p5',
  'p6',
  'p7',
  'inherit',
]

export const Levels: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {levelVariants.map((level) => (
        <Typography key={level} level={level}>
          Lorem ipsum ({level})
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
  'textDisabled',
]

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {colorVariants.map((color) => (
        <Typography key={color} color={color}>
          Lorem ipsum ({color})
        </Typography>
      ))}
    </div>
  ),
}
