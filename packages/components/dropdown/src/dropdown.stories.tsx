import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Avatar } from '@consolelabs/avatar'
import {
  IconCoinbaseWallet,
  IconClose,
  IconSolidDot,
  IconArrowDown,
} from '@consolelabs/icons'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from './dropdown'
import type { DropdownItemProps, DropdownRadioItemProps } from './type'

const meta: Meta<typeof DropdownMenu> = {
  title: 'ui/Dropdown',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

const MenuItems: (args: any) => DropdownItemProps[] = () => [
  {
    children: 'Billing',
    leftIcon: <IconCoinbaseWallet />,
  },
  {
    children: 'Keyboard shortcuts',
    rightExtra: '⇧⌘P',
  },
  {
    children: 'Try click',
    // rightExtra: (
    //   <button onClick={(e) => e.stopPropagation()} type="button">
    //     <Switch checked={args.checked} onChange={(c) => args.setSelected(c)} />
    //   </button>
    // ),
    // eslint-disable-next-line no-alert -- for demo
    onClick: () => {
      alert('Clicked')
    },
  },
]

export const Default: Story = {
  render: () => {
    /* eslint-disable -- ignore hook rules */
    const [selected, setSelected] = useState(false)
    const [radioSelected, setRadioSelected] = useState('third')

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="p-2 bg-primary-500 text-white rounded-md"
            type="button"
          >
            Open Dropdown
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel leftIcon={<IconClose />}>
            My Account
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {MenuItems({ checked: selected, setSelected }).map(
              (props, index) => (
                <DropdownMenuItem {...props} key={index} />
              ),
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={radioSelected}
                    onChange={(val) => setRadioSelected(val)}
                  >
                    {(
                      [
                        {
                          children: 'Console Labs',
                          subtitle: (
                            <span className="flex gap-1 items-center">
                              Lvl 450 <IconSolidDot /> 145 Boosts
                            </span>
                          ),
                          leftIcon: <Avatar src="https://mochi.gg/logo.png" />,
                          isLeftIconAvatar: true,
                          value: 'first',
                        },
                        {
                          children: 'Techie Story',
                          subtitle: (
                            <span className="flex gap-1 items-center">
                              Lvl 450 <IconSolidDot /> 145 Boosts
                            </span>
                          ),
                          leftIcon: <Avatar src="https://mochi.gg/logo.png" />,
                          isLeftIconAvatar: true,
                          value: 'second',
                        },
                        {
                          children: 'Dwarves, LLC',
                          subtitle: (
                            <span className="flex gap-1 items-center">
                              Lvl 450 <IconSolidDot /> 145 Boosts
                            </span>
                          ),
                          leftIcon: <Avatar src="https://mochi.gg/logo.png" />,
                          isLeftIconAvatar: true,
                          value: 'third',
                        },
                        {
                          children: 'Superteam Vietnam',
                          subtitle: (
                            <span className="flex gap-1 items-center">
                              Lvl 450 <IconSolidDot /> 145 Boosts
                            </span>
                          ),
                          leftIcon: <Avatar src="https://mochi.gg/logo.png" />,
                          isLeftIconAvatar: true,
                          value: 'forth',
                        },
                      ] as DropdownRadioItemProps[]
                    ).map((props, index) => (
                      <DropdownMenuRadioItem key={index} {...props} />
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {['Github', 'Support', 'API'].map((key) => (
            <DropdownMenuItem key={key}>{key}</DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600"
            leftIcon={<IconArrowDown className="text-red-600" />}
          >
            Logout
          </DropdownMenuItem>
          <DropdownMenuLabel className="text-sm font-normal text-neutral-600">
            <p>Powered by Console Labs</p>
            <p>Version 1.0.0</p>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}
