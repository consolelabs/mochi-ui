import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import * as icons from '../../../icons/src/components'
import { Tooltip } from '../../tooltip/src'
import { InputField } from '../../input-field/src'

const meta: Meta = {
  title: 'Icons/List',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

function Icons() {
  const [search, setSearch] = useState('')

  return (
    <div className="flex flex-col gap-y-10">
      <InputField
        value={search}
        onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
        placeholder="Search icons..."
      />
      <div className="grid grid-cols-7 gap-3 md:grid-cols-10 auto-row-auto">
        {Object.entries(icons)
          .filter((i) => i[0].toLowerCase().includes(search))
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
    </div>
  )
}

export const Default: Story = {
  render: Icons,
}
