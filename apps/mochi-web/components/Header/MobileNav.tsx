import {
  Button,
  IconDiscordColored,
  IconMonitor,
  IconSlackColored,
  IconTelegram,
  List,
} from '@consolelabs/ui-components'

import Link from 'next/link'
import { Fragment, useMemo } from 'react'
import { MobileNavAccordionItem } from './MobileNavAccordionItem'
import { NavItem } from './type'

export const MobileNav = () => {
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
      {
        label: 'Login',
        component: (
          <Button
            className="w-full justify-center"
            size="lg"
            onClick={() => alert('asda')}
          >
            Login
          </Button>
        ),
      },
    ],
    [],
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
    <List
      rootClassName="py-6 px-4 gap-4 w-full h-full h-full max-h-full"
      data={mobileNavItems}
      renderItem={itemRenderer}
      listClassName="space-y-4"
    />
  )
}
