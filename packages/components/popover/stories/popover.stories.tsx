import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '@consolelabs/avatar'
import { Button } from '@consolelabs/button'
import { IconCheckCircled } from '@consolelabs/icons'
import { Popover, PopoverContent, PopoverTrigger } from '../src/popover'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
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
                  className="flex gap-3 items-center p-2 text-sm font-medium rounded-md text-neutral-800 hover:bg-neutral-150"
                  key={index}
                >
                  <span className="p-0.5 w-9 h-9">
                    <Avatar src="https://mochi.gg/logo.png" />
                  </span>
                  <div className="flex flex-col flex-1 min-w-[150px]">
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

export const WithButton: Story = {
  render(_) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-1">
            {Array(5)
              .fill(null)
              .map((__, index) => (
                <div
                  className="flex gap-3 items-center p-2 text-sm font-medium rounded-md text-neutral-800 hover:bg-neutral-150"
                  key={index}
                >
                  <span className="p-0.5 w-9 h-9">
                    <Avatar src="https://mochi.gg/logo.png" />
                  </span>
                  <div className="flex flex-col flex-1 min-w-[150px]">
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
