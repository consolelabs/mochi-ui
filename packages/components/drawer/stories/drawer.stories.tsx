import {
  EyeShowSolid,
  SettingSolid,
  UserSolid,
  ShieldDoneSolid,
} from '@mochi-ui/icons'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@mochi-ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerProps,
  DrawerTrigger,
} from '../src/drawer'

const meta: Meta<DrawerProps> = {
  title: 'Overlay/Drawer',
  component: Drawer,
  tags: ['autodocs'],
}

const content = [
  {
    icon: <UserSolid className="text-xl text-neutral-800" />,
    label: 'Profile',
  },
  {
    icon: <EyeShowSolid className="text-xl text-neutral-800" />,
    label: 'View Options',
  },
  {
    icon: <SettingSolid className="text-xl text-neutral-800" />,
    label: 'Setting',
  },
  {
    icon: <ShieldDoneSolid className="text-xl text-neutral-800" />,
    label: 'Terms and Policies',
  },
]

export default meta

type Story = StoryObj<DrawerProps>

export const Default: Story = {
  render() {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent className="text-center w-[280px]" showCloseBtn>
          <div className="flex flex-col gap-2 py-2">
            {content.map((c) => (
              <Button
                key={c.label}
                variant="ghost"
                color="neutral"
                className="w-full !justify-start"
              >
                {c.icon} {c.label}
              </Button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    )
  },
}

export const Anchor: Story = {
  render() {
    return (
      <div className="flex gap-2 flex-wrap">
        {['left', 'right', 'top', 'bottom'].map((anchor) => (
          <Drawer anchor={anchor as DrawerProps['anchor']} key={anchor}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="capitalize">
                {anchor}
              </Button>
            </DrawerTrigger>
            <DrawerContent
              className={
                ['left', 'right'].includes(anchor)
                  ? 'text-center w-[280px]'
                  : 'text-center h-max'
              }
              showCloseBtn
            >
              <div className="flex flex-col gap-2 py-2">
                {content.map((c) => (
                  <Button
                    key={c.label}
                    variant="ghost"
                    color="neutral"
                    className="w-full !justify-start"
                  >
                    {c.icon} {c.label}
                  </Button>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    )
  },
}
