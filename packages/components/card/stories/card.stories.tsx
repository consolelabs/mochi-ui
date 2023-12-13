import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Typography } from '@mochi-ui/typography'
import { Card, CardProps } from '../src'

const meta: Meta<typeof Card> = {
  title: 'Data display/Card',
  component: Card,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Card>

const Template = (args: CardProps) => (
  <div className="grid gap-4 sm:grid-cols-2">
    <Card {...args}>
      <Typography level="h5">Optimized performance</Typography>
      <Typography color="textSecondary">
        By optimizing component performance, developers can create smooth and
        engaging user experiences.
      </Typography>
    </Card>
    <Card {...args} as="a">
      <Typography level="h5">Cross-platform</Typography>
      <Typography color="textSecondary">
        Save time and enhance interoperability effortlessly by reusing code
        while keeping the consistency across platforms.
      </Typography>
    </Card>
  </div>
)

export const Default: Story = {
  render: Template,
  args: {},
}
