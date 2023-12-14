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
import AuthenticatedLayout from '~cpn/auth-layout'
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
    <Tabs
      defaultValue={defaultTabValue}
      onValueChange={(value) => {
        const tab = value as Parameters<typeof ROUTES.SETTINGS>[0]
        replace(ROUTES.SETTINGS(tab))
      }}
    >
      <AuthenticatedLayout
        pageHeader={
          <>
            <PageHeader title="Settings" />
            <TabList className="px-4 sm:px-6">
              <TabTrigger value="general">General</TabTrigger>
              <TabTrigger value="notification">Notification</TabTrigger>
            </TabList>
          </>
        }
      >
        <TabContent value="general">
          <GeneralPage />
        </TabContent>
        <TabContent value="notification">
          <NotificationPage />
        </TabContent>
      </AuthenticatedLayout>
    </Tabs>
  )
}

export default SettingsPage
