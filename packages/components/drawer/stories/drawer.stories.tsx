import {
  EyeShowSolid,
  GearSolid,
  UserSolid,
  ShieldDoneSolid,
} from '@mochi-ui/icons'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@mochi-ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
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
    icon: <UserSolid className="text-xl text-text-secondary" />,
    label: 'Profile',
  },
  {
    icon: <EyeShowSolid className="text-xl text-text-secondary" />,
    label: 'View Options',
  },
  {
    icon: <GearSolid className="text-xl text-text-secondary" />,
    label: 'Setting',
  },
  {
    icon: <ShieldDoneSolid className="text-xl text-text-secondary" />,
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
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent className="p-6 text-center w-[280px]" showCloseBtn>
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
        </DrawerPortal>
      </Drawer>
    )
  },
}

export const Anchor: Story = {
  render() {
    return (
      <div className="flex flex-wrap gap-2">
        {['left', 'right', 'top', 'bottom'].map((anchor) => (
          <Drawer anchor={anchor as DrawerProps['anchor']} key={anchor}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="capitalize">
                {anchor}
              </Button>
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerOverlay />
              <DrawerContent
                className={
                  ['left', 'right'].includes(anchor)
                    ? 'text-center w-[280px] p-6'
                    : 'text-center h-max p-6'
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
            </DrawerPortal>
          </Drawer>
        ))}
      </div>
    )
  },
}
