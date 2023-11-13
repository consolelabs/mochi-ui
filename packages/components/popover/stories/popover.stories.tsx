import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '@consolelabs/avatar'
import { IconCheckCircled } from '@consolelabs/icons'
import { Popover, PopoverContent, PopoverTrigger } from '../src/popover'

const meta: Meta<typeof Popover> = {
  title: 'components/Popover',
  component: Popover,
  tags: ['autodocs'],
  args: {
    modal: false,
  },
}

export default meta

type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render(_) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button type="button">Open</button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-1">
            {Array(5)
              .fill(null)
              .map((__, index) => (
                <div
                  className="flex gap-3 text-sm items-center p-2 hover:bg-neutral-150 rounded-md font-medium text-neutral-800"
                  key={index}
                >
                  <span className="p-0.5 w-9 h-9">
                    <Avatar src="https://mochi.gg/logo.png" />
                  </span>
                  <div className="flex flex-1 flex-col min-w-[150px]">
                    <p>Console Labs</p>
                    <p className="text-xs text-[#848281]">Lvl 430</p>
                  </div>
                  <IconCheckCircled />
                </div>
              ))}
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}
