import { IconCoding, IconSetting, IconUser } from '@consolelabs/icons'
import { Tabs, TabList, TabTrigger, TabContent } from '../src/tabs'

export default {
  title: 'components/Tabs',
}

export function Default() {
  return (
    <div className="space-y-4">
      <div className="w-full max-w-md border rounded shadow">
        <Tabs defaultValue="account">
          <TabList className="flex justify-between py-1.5">
            <TabTrigger value="account">
              <IconUser width={16} height={16} />
              Account
            </TabTrigger>
            <TabTrigger value="documents">
              <IconCoding width={16} height={16} />
              Documents
            </TabTrigger>
            <TabTrigger disabled value="settings">
              <IconSetting width={16} height={16} />
              Settings
            </TabTrigger>
          </TabList>

          <div className="border-b" />

          <div>
            <TabContent value="account">
              Make changes to your account.
            </TabContent>
            <TabContent value="documents">
              Access and update your documents.
            </TabContent>
            <TabContent value="settings">
              Edit your profile or update contact information.
            </TabContent>
          </div>
        </Tabs>
      </div>

      <div className="w-full max-w-md border rounded shadow">
        <Tabs defaultValue="account">
          <TabList className="flex justify-between py-1.5">
            <TabTrigger value="account" variant="solid">
              Account
            </TabTrigger>
            <TabTrigger value="documents" variant="solid">
              Documents
            </TabTrigger>
            <TabTrigger disabled value="settings" variant="solid">
              Settings
            </TabTrigger>
          </TabList>

          <div className="border-b" />

          <div>
            <TabContent value="account">
              Make changes to your account.
            </TabContent>
            <TabContent value="documents">
              Access and update your documents.
            </TabContent>
            <TabContent value="settings">
              Edit your profile or update contact information.
            </TabContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

Default.story = {
  name: 'default',
}
