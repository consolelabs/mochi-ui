import {
  IconDiscordColored,
  IconTelegramColored,
  IconMonitor,
  IconSlackColored,
  IconChevronRight,
  IconAppleColored,
} from '@consolelabs/icons'
import { List, Button, Modal, ModalContent, Avatar } from '@consolelabs/core'
import Link from 'next/link'
import { Fragment, useMemo, useState } from 'react'
import { AuthPanel } from '~cpn/AuthWidget'
import { useAuthStore, useProfileStore } from '~store'
import { ROUTES } from '~constants/routes'
import clsx from 'clsx'
import useLockScreenScroll from '~hooks/useLockScreenScroll'
import { MobileNavAccordionItem } from './MobileNavAccordionItem'
import { NavItem } from './type'

const MobileLoginPanel = () => {
  const [isOpenLoginPanel, setOpenLoginPanel] = useState(false)
  const [hideLoginPanel, setHideLoginPanel] = useState(false)
  const { isLogging } = useAuthStore()

  return (
    <Modal open={isOpenLoginPanel} onOpenChange={setOpenLoginPanel}>
      <Button
        className="justify-center w-full sm:hidden"
        size="lg"
        onClick={() => setOpenLoginPanel(true)}
        loading={isLogging}
      >
        Login
      </Button>
      <ModalContent
        className={clsx('w-full !p-0', { hidden: hideLoginPanel })}
        style={{
          width: 'calc(100% - 32px)',
        }}
      >
        <AuthPanel
          onOpenConnectWalletChange={(open) => setHideLoginPanel(open)}
        />
      </ModalContent>
    </Modal>
  )
}

const Header = ({ onClose }: { onClose: () => void }) => {
  const { me } = useProfileStore()
  return (
    <button className="" onClick={onClose}>
      <Link href={ROUTES.PROFILE} className="relative block w-full h-20 group">
        <div className="absolute inset-0 bg-transparent">
          <img
            className="object-cover w-full h-full"
            alt="Header"
            src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
          />
        </div>
        <div className="relative z-10 flex items-center w-full h-full gap-4 p-4 text-white">
          <Avatar
            fallback={me?.profile_name}
            smallSrc={me?.platformIcon}
            src={me?.avatar as string}
          />
          <div className="flex items-center flex-1 font-medium">
            <span className="inline-block w-40 truncate  whitespace-nowrap">
              {me?.profile_name}
            </span>
          </div>
          <IconChevronRight className="text-lg transition group-hover:translate-x-1" />
        </div>
      </Link>
    </button>
  )
}

export const MobileNav = (props: { onClose: () => void }) => {
  const { isLoggedIn } = useAuthStore()
  const { onClose } = props
  const { me } = useProfileStore()

  useLockScreenScroll()

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
                    iconLeft: <IconTelegramColored />,
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
                    iconLeft: <IconAppleColored className="opacity-50" />,
                    href: '#',
                  },
                ],
              },
            ]}
          />
        ),
      },
      ...(!(isLoggedIn && me)
        ? [
            {
              label: 'Login',
              component: <MobileLoginPanel />,
            },
          ]
        : []),
    ],
    [isLoggedIn, me],
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
        onClick={() => {
          onClose()
          item.onClick?.()
        }}
      >
        <LinkWrapper
          className="flex items-center flex-1 gap-3"
          href={item.href as any}
        >
          {item.iconLeft && <span className="text-xl">{item.iconLeft}</span>}
          {item.label}
        </LinkWrapper>
      </Button>
    )
  }

  return (
    <div className="flex flex-col">
      {isLoggedIn && me && <Header onClose={onClose} />}
      <List
        rootClassName="flex-1 py-6 px-4 gap-4 w-full"
        data={mobileNavItems}
        renderItem={itemRenderer}
        listClassName="space-y-4 h-fit"
        viewportClassName="h-fit"
      />
    </div>
  )
}
