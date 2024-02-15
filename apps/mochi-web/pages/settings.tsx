import {
  PageHeader,
  PageHeaderTitle,
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
} from '@mochi-ui/core'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { SEO } from '~app/layout/seo'
import { ROUTES } from '~constants/routes'
import { DashboardBody } from '~cpn/DashboardBody'
import { GeneralPage } from '~cpn/settings/general/GeneralPage'
import { NotificationPage } from '~cpn/settings/notification/NotificationPage'
import { useUnsavedChanges } from '~store'

const TAB_VALUES = ['general', 'notification']

const SettingsPage = () => {
  const { unsavedChanges, toggleWarning } = useUnsavedChanges()
  const {
    query: { tab },
    replace,
  } = useRouter()
  const defaultTabValue =
    typeof tab === 'string' && TAB_VALUES.includes(tab) ? tab : 'general'
  const [tabValue, setTabValue] = useState(defaultTabValue)

  return (
    <>
      <SEO title="Settings" tailTitle />

      <PageHeader>
        <PageHeaderTitle>Settings</PageHeaderTitle>
      </PageHeader>

      <Tabs
        className="grow overflow-hidden flex-col flex"
        value={tabValue}
        onValueChange={(value) => {
          if (unsavedChanges) {
            return toggleWarning()
          }
          setTabValue(value)
          const tab = value as Parameters<typeof ROUTES.SETTINGS>[0]
          replace(ROUTES.SETTINGS(tab))
        }}
      >
        <TabList className="px-4 md:px-8 -ml-3">
          <TabTrigger value="general">General</TabTrigger>
          <TabTrigger value="notification">Notification</TabTrigger>
        </TabList>
        <DashboardBody containerClassName="h-full">
          <TabContent className="h-full" value="general">
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
