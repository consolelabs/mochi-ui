import { List } from '@consolelabs/core'
import { ViewProfile } from '~types/mochi-profile-schema'
import { RecipientItem } from './RecipientItem'
import { EmptyList } from './EmptyList'

interface Props {
  data: ViewProfile[]
  onSelect?: (account: ViewProfile) => void
}

const ProfilePlaceholder: ViewProfile = {
  id: 'unknown',
  avatar: '/logo.png',
  associated_accounts: [
    {
      id: 'unknown',
      platform: 'Mochi',
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
