import { List } from '@consolelabs/core'
import { Profile } from '@consolelabs/mochi-rest'
import { RecipientItem } from './RecipientItem'
import { EmptyList } from './EmptyList'

interface Props {
  data: Profile[]
  selectedRecipients?: Profile[]
  onSelect?: (account: Profile) => void
  onRemove?: (account: Profile) => void
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
  const { data, selectedRecipients = [], onSelect, onRemove } = props
  return (
    <List
      rootClassName="w-full"
      data={data}
      ListEmpty={<EmptyList />}
      renderItem={(item) => (
        <RecipientItem
          profile={item || ProfilePlaceholder}
          isSelected={selectedRecipients.some(
            (recipient) =>
              recipient.associated_accounts?.[0].id ===
              item?.associated_accounts?.[0].id,
          )}
          onSelect={onSelect}
          onRemove={onRemove}
        />
      )}
    />
  )
}
