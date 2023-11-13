import type { Meta, StoryObj } from '@storybook/react'
import Typography from '../src/typography'

const meta: Meta<typeof Typography> = {
  title: 'components/Typography',
  component: Typography,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
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
        'success',
        'warning',
        'danger',
        'neutral',
        undefined,
      ],
    },
    variant: {
      control: 'select',
      options: ['plain', 'outlined', 'soft', 'solid', undefined],
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
    children:
      'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
  },
}
