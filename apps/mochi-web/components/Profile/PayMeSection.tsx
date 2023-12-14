import {
  TabContent,
  TabList,
  TabTrigger,
  Tabs,
  Typography,
} from '@mochi-ui/core'
import { PaymeRequestsTable } from './PaymeRequestsTable'
import { PaymeLinksTable } from './PaymeLinksTable'

const tabs = [
  { label: 'Requests', key: 'requests', content: PaymeRequestsTable },
  { label: 'Links', key: 'links', content: PaymeLinksTable },
]

export const PaymeSection = () => {
  return (
    <div className="space-y-2">
      <div className="py-2">
        <Typography level="h7">Pay Me</Typography>
      </div>
      <Tabs
        defaultValue={tabs[0].key}
        className="overflow-hidden rounded-lg shadow-input"
      >
        <TabList className="border-b bg-neutral-outline border-b-neutral-outline-active">
          {tabs.map((tab) => (
            <TabTrigger
              key={tab.key}
              value={tab.key}
              wrapperClassName="pl-0 pr-0"
              className="py-2.5 px-4 data-[state=active]:bg-background-popup rounded-t-lg data-[state=active]:border-b-0 data-[state=active]:border border-neutral-outline-active"
            >
              <Typography level="h9">{tab.label}</Typography>
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
