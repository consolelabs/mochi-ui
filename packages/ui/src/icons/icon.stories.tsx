import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from '../tooltip'
import * as icons from '.'

const meta: Meta = {
  title: 'ui/Icon',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-10 gap-3 auto-row-auto">
        {Object.entries(icons)
          .sort((a, b) => {
            if (a[0] > b[0]) return 1
            if (a[0] < b[0]) return -1
            return 0
          })
          .map((e) => {
            const [name, Icon] = e
            return (
              <Tooltip
                arrow="top-center"
                content={name}
                key={name}
                theme="dark"
              >
                <Icon className="w-10 h-10 text-gray-700" />
              </Tooltip>
            )
          })}
      </div>
    )
  },
}
