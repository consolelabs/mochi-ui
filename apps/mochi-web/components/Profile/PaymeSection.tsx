import {
  Badge,
  TabContent,
  TabList,
  TabTrigger,
  Tabs,
  Typography,
} from '@mochi-ui/core'
import { useFetchPayRequests } from '~hooks/profile/useFetchPayRequests'
import { useProfileStore } from '~store'
import { PaymeRequestsTable } from './PaymeRequestsTable'
import { PaymeLinksTable } from './PaymeLinksTable'

const tabs = [
  { label: 'Requests', key: 'requests', content: PaymeRequestsTable },
  { label: 'Links', key: 'links', content: PaymeLinksTable },
]

export const PaymeSection = () => {
  const { me } = useProfileStore()
  const { data: requests = [] } = useFetchPayRequests({
    profile_id: me?.id,
    entity: 'sender',
    type: 'payme',
  })

  return (
    <div className="space-y-2">
      <Typography level="h7" className="py-2">
        Pay Me
      </Typography>
      <Tabs
        defaultValue={tabs[0].key}
        className="overflow-hidden rounded-lg shadow-input"
      >
        <TabList className="border-b bg-neutral-outline border-b-divider">
          {tabs.map((tab) => (
            <TabTrigger
              key={tab.key}
              value={tab.key}
              wrapperClassName="pl-0 pr-0"
              className="py-2.5 px-4 data-[state=active]:bg-background-popup rounded-t-lg data-[state=active]:border-b-0 data-[state=active]:border border-divider"
            >
              <Typography level="h9">{tab.label}</Typography>
              {tab.key === 'requests' && (
                <Badge appearance="danger" className="h-5">
                  {requests.length}
                </Badge>
              )}
            </TabTrigger>
          ))}
        </TabList>

        {tabs.map((tab) => (
          <TabContent key={tab.key} value={tab.key}>
            {tab.content()}
          </TabContent>
        ))}
      </Tabs>
    </div>
  )
}
