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

export const RecipientList = (props: Props) => {
  const { data, selectedRecipients = [] } = props
  return (
    <List
      loading={props.loading}
      rootClassName="w-full"
      data={data}
      ListEmpty={<EmptyList />}
      renderItem={(item) => (
        <Combobox.Option key={item.id} value={item}>
          {({ active }) => (
            <RecipientItem
              active={active}
              avatar={item.avatar}
              platform={item.associated_accounts?.[0]?.platform}
              profileName={
                item.associated_accounts?.[0]?.platform_metadata.username
              }
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
