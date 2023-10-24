import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { useAppWalletContext } from '~context/wallet-context'
import { Menu } from './Menu'
import { MenuItem } from './Menu/Menu'

const routesMap: Record<string, { activeId: string; activeIdx?: number }> = {
  '/profile/[server_id]': { activeId: 'overview' },
  '/profile/[server_id]/ads': { activeId: 'ads' },
  '/profile/[server_id]/quests': { activeId: 'quests' },
  '/profile/[server_id]/quests/recurrence': {
    activeId: 'quests',
    activeIdx: 0,
  },
  '/profile/[server_id]/quests/one-time': {
    activeId: 'quests',
    activeIdx: 1,
  },
  '/profile/[server_id]/quests/event': { activeId: 'quests', activeIdx: 2 },
  '/profile/[server_id]/dao': { activeId: 'dao' },
  '/profile/[server_id]/members': { activeId: 'members' },
}

const getDefaultItems = (query: ParsedUrlQuery): [string, MenuItem[]][] => [
  [
    'server settings',
    [
      {
        id: 'overview',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Overview',
        url: `/profile/${query.server_id}`,
      },
      {
        id: 'ads',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Ads',
        url: `/profile/${query.server_id}/ads`,
      },
      {
        id: 'quests',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Quests',
        subItems: [
          {
            text: 'Recurrence',
            url: `/profile/${query.server_id}/quests/recurrence`,
          },
          {
            text: 'One-time',
            url: `/profile/${query.server_id}/quests/one-time`,
          },
          {
            text: 'Event',
            url: `/profile/${query.server_id}/quests/event`,
          },
        ],
        url: `/profile/${query.server_id}/quests`,
      },
      {
        id: 'dao',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'DAO',
        url: `/profile/${query.server_id}/dao`,
      },
      {
        id: 'members',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Members',
        url: `/profile/${query.server_id}/members`,
      },
    ],
  ],
]

const getSettingItems = (): [string, MenuItem[]][] => [
  [
    'account settings',
    [
      {
        id: 'settings-account',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Account',
        url: `/profile/settings/account`,
      },
      {
        id: 'settings-notification',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Notifications',
        url: `/profile/settings/notifications`,
      },
      {
        id: 'settings-reminders',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Reminders',
        url: `/profile/settings/reminders`,
      },
      {
        id: 'settings-integrations',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Integrations',
        url: `/profile/settings/integrations`,
      },
      {
        id: 'settings-currency',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Currency',
        url: `/profile/settings/currency`,
      },
    ],
  ],
  [
    'activities',
    [
      {
        id: 'settings-quests',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Quests',
        url: `/profile/settings/quests`,
      },
      {
        id: 'settings-activities',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Activities',
        url: `/profile/settings/activities`,
      },
      {
        id: 'settings-game-overlay',
        icon: <Icon icon="mingcute:copy-2-fill" className="w-5 h-5" />,
        text: 'Game Overlay',
        url: `/profile/settings/game-overlay`,
      },
    ],
  ],
]

const settingRoutesMap: Record<
  string,
  { activeId: string; activeIdx?: number }
> = {
  '/profile/settings/account': { activeId: 'settings-account' },
  '/profile/settings/activities': { activeId: 'settings-activities' },
}

export default function Sidebar() {
  const { pathname, query } = useRouter()
  const { disconnect } = useAppWalletContext()

  if (pathname.startsWith('/profile/settings')) {
    return (
      <Menu
        {...settingRoutesMap[pathname]}
        items={getSettingItems().concat([
          [
            '',
            [
              {
                id: 'logout',
                icon: <Icon icon="majesticons:logout" className="w-5 h-5" />,
                text: 'Logout',
                url: '/profile',
                onClick: () => disconnect(),
              },
            ],
          ],
        ])}
      />
    )
  }

  return <Menu {...routesMap[pathname]} items={getDefaultItems(query)} />
}
