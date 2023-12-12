import { Combobox } from '@headlessui/react'
import { SectionList } from '@mochi-ui/core'
import { Profile } from '@consolelabs/mochi-rest'
import useSWR from 'swr'
import { RecipientItem } from './RecipientItem'
import { EmptyList } from './EmptyList'
import Skeleton from '../Tip/Skeleton'
import { sectionFormatter } from '../TokenPicker/utils'

interface Props {
  loading: boolean
  data: Profile[]
  selectedRecipients?: Profile[]
}

const ProfilePlaceholder: Profile = {
  id: 'unknown',
  avatar: '/logo.png',
  associated_accounts: [
    {
      id: 'unknown',
      // @ts-ignore
      platform: '',
      platform_identifier: '0x00000000000000000000000000000000000000000',
      platform_metadata: {
        username: 'unknown',
      },
    },
  ],
}

export const ContactList = (props: Props) => {
  const { data, selectedRecipients = [] } = props
  const { data: contacts = [], isLoading } = useSWR(
    ['contact-list'],
    async () => {
      return data.map((d) => ({ ...d, group: 'recipient' }))
    },
  )

  return (
    <SectionList
      loading={props.loading || isLoading}
      rootClassName="w-full"
      sections={sectionFormatter(
        data.map((d) => ({ ...d, group: 'recent' })).concat(contacts),
        'group',
      )}
      SectionEmpty={<EmptyList />}
      renderItem={(item) => (
        <Combobox.Option key={item.id} value={item}>
          {({ active }) => (
            <RecipientItem
              active={active}
              profile={item || ProfilePlaceholder}
              isSelected={selectedRecipients.some(
                (recipient) =>
                  recipient.associated_accounts?.[0].id ===
                  item?.associated_accounts?.[0].id,
              )}
            />
          )}
        </Combobox.Option>
      )}
      renderSectionHeader={(section) => (
        <label
          htmlFor="recipients"
          className="font-bold uppercase text-[0.625rem] text-neutral-500"
        >
          {section.title}
        </label>
      )}
      renderLoader={() => <Skeleton />}
    />
  )
}