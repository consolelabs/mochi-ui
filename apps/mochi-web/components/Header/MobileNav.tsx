import {
  Button,
  IconDiscordColored,
  IconMonitor,
  IconSlackColored,
  IconTelegram,
  List,
  ModalTrigger,
  Modal,
  ModalContent,
} from '@consolelabs/ui-components'

import Link from 'next/link'
import { Fragment, useMemo } from 'react'
import { AuthPanel } from '~cpn/AuthWidget'
import { useAuthStore, useProfileStore } from '~store'
import { MobileNavAccordionItem } from './MobileNavAccordionItem'
import { NavItem } from './type'

interface MobileLoginPanelProps {
  open: boolean
  onOpenChange: (_: boolean) => void
  isLogging: boolean
}

const MobileLoginPanel = (props: MobileLoginPanelProps) => {
  const { open, onOpenChange, isLogging } = props

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalTrigger asChild>
        <div className="w-full">
          <Button className="w-full justify-center">
            {isLogging ? 'Logging in' : 'Login'}
          </Button>
        </div>
      </ModalTrigger>
      <ModalContent>
        <AuthPanel />
      </ModalContent>
    </Modal>
  )
}

interface MobileNavProps {
  setOpenLoginPanel: (_: boolean) => void
  isOpenLoginPanel: boolean
}

const Header = () => {
  return (
    <button className="p-4 w-full relative text-left flex h-20">
      <div className="absolute z-10 inset-0">
        <img
          className="object-cover w-full h-full"
          alt="Header"
          src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
        />
      </div>
    </button>
  )
}

export const MobileNav = (props: MobileNavProps) => {
  const { setOpenLoginPanel, isOpenLoginPanel } = props
  const { isLogging } = useAuthStore()
  const { me } = useProfileStore()

  const mobileNavItems: NavItem[] = useMemo(
    (): NavItem[] => [
      {
        label: 'Features',
        href: '#',
      },
      {
        label: 'Develops',
        onClick: () => {},
      },
      {
        label: 'Apps',
        component: (
          <MobileNavAccordionItem
            label="Apps"
            items={[
              {
                title: '',
                data: [
                  {
                    label: 'Web Dashboard',
                    iconLeft: <IconMonitor />,
                    href: '#',
                  },
                  {
                    label: 'Discord',
                    iconLeft: <IconDiscordColored />,
                    href: '#',
                  },
                  {
                    label: 'Telegram',
                    iconLeft: <IconTelegram />,
                    href: '#',
                  },
                ],
              },
              {
                title: 'Soon available on',
                data: [
                  {
                    label: <span className="text-neutral-500">Discord</span>,
                    iconLeft: <IconSlackColored className="opacity-50" />,
                    href: '#',
                  },
                  {
                    label: <span className="text-neutral-500">iOS</span>,
                    iconLeft: <IconDiscordColored className="opacity-50" />,
                    href: '#',
                  },
                ],
              },
            ]}
          />
        ),
      },
      ...(!(isLogging && me)
        ? [
            {
              label: 'Login',
              component: (
                <MobileLoginPanel
                  isLogging={isLogging}
                  open={isOpenLoginPanel}
                  onOpenChange={setOpenLoginPanel}
                />
              ),
            },
          ]
        : []),
    ],
    [isLogging, isOpenLoginPanel, me, setOpenLoginPanel],
  )

  const itemRenderer = (item: NavItem) => {
    if (item.component) return item.component
    const wrapperClassName =
      'flex w-full text-left !text-base px-2 py-3 bg-white-pure !text-neutral-800 !font-normal hover:!text-black'

    const LinkWrapper = item.href ? Link : Fragment

    return (
      <Button
        variant="link"
        color="info"
        className={wrapperClassName}
        onClick={item.onClick}
      >
        <LinkWrapper className="block flex-1" href={item.href as any}>
          {item.iconLeft && <span className="text-xl">{item.iconLeft}</span>}
          {item.label}
        </LinkWrapper>
      </Button>
    )
  }

  return (
    <div className="flex flex-col">
      {/* {isLogging && me && <Header />} */}
      <Header />
      <List
        rootClassName="flex-1 py-6 px-4 gap-4 w-full h-full h-full max-h-full"
        data={mobileNavItems}
        renderItem={itemRenderer}
        listClassName="space-y-4"
      />
    </div>
  )
}
