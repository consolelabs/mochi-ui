import { Tabs, TabList, TabTrigger, TabContent } from '../src/tabs'

export default {
  title: 'components/Tabs',
  tags: ['autodocs'],
}

const items = [
  {
    label: 'My Account',
    value: 'my-account',
  },
  {
    label: 'Profile',
    value: 'profile',
  },
  {
    label: 'Safety & Privacy',
    value: 'safety-privacy',
  },
  {
    label: 'Devices',
    value: 'devices',
  },
  {
    label: 'Friend Requests',
    value: 'friend-requests',
  },
  {
    label: 'Subscriptions',
    value: 'subscriptions',
  },
]

export function Default() {
  return (
    <div className="w-full max-w-4xl">
      <Tabs defaultValue="my-account">
        <TabList className="flex justify-between py-1.5">
          {items.map((item) => (
            <TabTrigger value={item.value}>{item.label}</TabTrigger>
          ))}
        </TabList>

        <div className="border-b" />

        <div className="p-4">
          {items.map((item) => (
            <TabContent value={item.value}>{item.label}</TabContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}

export function Variant() {
  return (
    <div className="space-y-4">
      <div className="w-full max-w-sm border rounded">
        <Tabs defaultValue="account">
          <TabList className="flex justify-between py-1.5">
            <TabTrigger value="account">Account</TabTrigger>
            <TabTrigger value="documents">Documents</TabTrigger>
            <TabTrigger disabled value="settings">
              Settings
            </TabTrigger>
          </TabList>

          <div className="border-b" />

          <div className="p-4">
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

      <div className="w-full max-w-sm border rounded">
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

          <div className="p-4">
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
