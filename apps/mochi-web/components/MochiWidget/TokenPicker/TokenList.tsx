import { useShallow } from 'zustand/react/shallow'
import { List } from '@consolelabs/core'
import { Balance, useWalletStore } from '~store'
import { TokenItem } from './TokenItem'
import { EmptyList } from './EmptyList'
import Skeleton from './Skeleton'

interface Props {
  data: Balance[]
  onSelect?: (item: Balance) => void
}

export const TokenList = (props: Props) => {
  const { data, onSelect } = props
  const isFetchingWallets = useWalletStore(useShallow((s) => s.isFetching))

  return (
    <List
      data={data}
      renderItem={(item, i) =>
        isFetchingWallets ? (
          <Skeleton />
        ) : (
          <TokenItem
            key={`token-list-${item.id ?? i}`}
            item={item}
            onSelect={onSelect}
          />
        )
      }
      ListEmpty={isFetchingWallets ? <Skeleton /> : <EmptyList />}
      rootClassName="w-full h-full"
    />
  )
}
