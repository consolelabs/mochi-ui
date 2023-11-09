import { Tabs, TabList, TabTrigger, TabContent } from '.'

export default {
  title: 'ui/Tabs',
}

export function Default() {
  return (
    <div className="w-full max-w-md p-2 border rounded shadow">
      <Tabs defaultValue="account">
        <TabList className="flex justify-between py-2">
          <TabTrigger value="account">Account</TabTrigger>
          <TabTrigger value="documents" variant="solid">
            Documents
          </TabTrigger>
          <TabTrigger disabled value="settings">
            Settings
          </TabTrigger>
        </TabList>

        <div className="my-2 border-b border-b-neutral-200" />

        <div>
          <TabContent value="account">Make changes to your account.</TabContent>
          <TabContent value="documents">
            Access and update your documents.
          </TabContent>
          <TabContent value="settings">
            Edit your profile or update contact information.
          </TabContent>
        </div>
      </Tabs>
    </div>
  )
}

Default.story = {
  name: 'default',
}
