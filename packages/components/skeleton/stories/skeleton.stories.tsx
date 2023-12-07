import { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from '../src'

const meta: Meta<typeof Skeleton> = {
  title: 'Data display/Skeleton',
  component: Skeleton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: (props) => {
    return (
      <Skeleton className="rounded-lg" {...props}>
        Hello world
      </Skeleton>
    )
  },
}

export const Standalone: Story = {
  render: () => {
    return (
      <div className="flex items-center gap-3 w-80">
        <div>
          <Skeleton className="flex w-12 h-12 rounded-full" />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Skeleton className="w-3/5 h-3 rounded-lg" />
          <Skeleton className="w-4/5 h-3 rounded-lg" />
        </div>
      </div>
    )
  },
}
