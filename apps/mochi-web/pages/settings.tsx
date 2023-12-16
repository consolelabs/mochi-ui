import {
  PageHeader,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
} from '@mochi-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { ROUTES } from '~constants/routes'
import { DashboardBody } from '~cpn/DashboardBody'
import { GeneralPage } from '~cpn/settings/general/GeneralPage'
import { NotificationPage } from '~cpn/settings/notification/NotificationPage'

const TAB_VALUES = ['general', 'notification']

const SettingsPage = () => {
  const {
    query: { tab },
    replace,
  } = useRouter()
  const defaultTabValue =
    typeof tab === 'string' && TAB_VALUES.includes(tab) ? tab : 'general'

  return (
    <>
      <PageHeader title="Settings" />
      <Tabs
        className="grow overflow-hidden flex-col flex"
        defaultValue={defaultTabValue}
        onValueChange={(value: any) => {
          const tab = value as Parameters<typeof ROUTES.SETTINGS>[0]
          replace(ROUTES.SETTINGS(tab))
        }}
      >
        <TabList className="px-4 sm:px-6">
          <TabTrigger value="general">General</TabTrigger>
          <TabTrigger value="notification">Notification</TabTrigger>
        </TabList>
        <DashboardBody>
          <TabContent value="general">
            <GeneralPage />
          </TabContent>
          <TabContent className="static" value="notification">
            <NotificationPage />
          </TabContent>
        </DashboardBody>
      </Tabs>
    </>
  )
}

export default SettingsPage
