import type { Meta, StoryObj } from "@storybook/react";
import { IconCheckCircled } from "../icons";
import { Avatar } from "../avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const meta: Meta<typeof Popover> = {
    title: 'ui/Popover',
    component: Popover,
    tags: ['autodocs'],
    args: {
        modal: false,
    }
}

export default meta

type Story = StoryObj<typeof Popover>

export const Default: Story = {
    render(_) {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <button type="button">
                        Open
                    </button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="ui-flex ui-flex-col ui-gap-1">
                        {Array(5).fill(null).map((__, index) => (
                            <div className="ui-flex ui-gap-3 ui-text-sm ui-items-center ui-p-2 hover:ui-bg-neutral-150 ui-rounded-md ui-font-medium ui-text-neutral-800" 
                                key={index}
                            >
                                <span className="ui-p-0.5 ui-w-9 ui-h-9">
                                    <Avatar src="https://mochi.gg/logo.png"/>
                                </span>
                                <div className="ui-flex ui-flex-1 ui-flex-col ui-min-w-[150px]">
                                    <p>Console Labs</p>
                                    <p className="ui-text-xs ui-text-[#848281]">Lvl 430</p>
                                </div>
                                <IconCheckCircled/>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        )
    }
}