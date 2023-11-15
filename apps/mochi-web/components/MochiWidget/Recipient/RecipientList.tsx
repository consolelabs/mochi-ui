import { List } from '@consolelabs/core'
import { Profile } from '@consolelabs/mochi-rest'
import { RecipientItem } from './RecipientItem'
import { EmptyList } from './EmptyList'

interface Props {
  data: Profile[]
  onSelect?: (account: Profile) => void
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
  const { data, onSelect } = props
  return (
    <List
      rootClassName="w-full"
      data={data}
      ListEmpty={<EmptyList />}
      renderItem={(item) => (
        <RecipientItem
          key={`recipient-list-${item.id}`}
          profile={item || ProfilePlaceholder}
          onSelect={onSelect}
        />
      )}
    />
  )
}
