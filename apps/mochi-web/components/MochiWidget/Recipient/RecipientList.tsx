import { List } from '@consolelabs/ui-components'
import { ViewAssociatedAccount, ViewProfile } from '~types/mochi-profile-schema'
import { RecipientItem } from './RecipientItem'
import { EmptyList } from './EmptyList'

interface Props {
  data: ViewProfile[]
  onSelect?: (account: ViewProfile) => void
}

const AccountPlaceholder: ViewAssociatedAccount = {
  id: 'unknown',
  platform: 'Mochi',
  platform_identifier: '0x00000000000000000000000000000000000000000',
  platform_metadata: {
    username: 'unknown',
  },
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
          account={item.associated_accounts?.[0] || AccountPlaceholder}
          avatar={item.avatar}
          onSelect={onSelect}
        />
      )}
    />
  )
}
