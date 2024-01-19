import { utils } from '@consolelabs/mochi-formatter'
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
  isOnChain: boolean
}

export const RecipientList = (props: Props) => {
  const { data, isOnChain, selectedRecipients = [] } = props

  return (
    <List
      loading={props.loading}
      rootClassName="w-full"
      data={data}
      ListEmpty={<EmptyList />}
      renderItem={(item) => (
        <Combobox.Option key={item.id} value={item}>
          {({ active }) => {
            let profileName =
              item.associated_accounts?.[0]?.platform_metadata.username ||
              item.associated_accounts?.[0]?.platform_identifier

            if (isOnChain && profileName) {
              profileName = utils.string.formatAddressUsername(profileName)
            }

            return (
              <RecipientItem
                active={active}
                avatar={item.avatar}
                platform={item.associated_accounts?.[0]?.platform}
                profileName={profileName}
                isSelected={selectedRecipients.some(
                  (recipient) =>
                    recipient.associated_accounts?.[0].id ===
                    item?.associated_accounts?.[0].id,
                )}
              />
            )
          }}
        </Combobox.Option>
      )}
      renderLoader={() => <Skeleton height={44} avatarHeight={28} />}
    />
  )
}
