import { Combobox } from '@headlessui/react'
import { List } from '@mochi-ui/core'
import { Profile } from '@consolelabs/mochi-rest'
import { RecipientItem } from './RecipientItem'
import { EmptyList } from './EmptyList'
import Skeleton from '../Tip/Skeleton'

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

export const RecipientList = (props: Props) => {
  const { data, selectedRecipients = [] } = props
  return (
    <List
      listClassName="max-h-[350px]"
      loading={props.loading}
      rootClassName="w-full"
      data={data}
      ListEmpty={<EmptyList />}
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
      renderLoader={() => <Skeleton />}
    />
  )
}
