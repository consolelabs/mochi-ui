import { List } from '@consolelabs/core'
import { Balance } from '~store'
import { TokenItem } from './TokenItem'
import { EmptyList } from './EmptyList'
import Skeleton from '../Tip/Skeleton'

interface Props {
  loading: boolean
  data: Balance[]
  onSelect?: (item: Balance) => void
}

export const TokenList = (props: Props) => {
  const { data, onSelect, loading } = props

  return (
    <List
      listClassName="max-h-full"
      data={data}
      loading={loading}
      renderItem={(item) => (
        <TokenItem
          key={`token-list-${item.token.symbol}-${item.token.chain?.name}`}
          item={item}
          onSelect={onSelect}
        />
      )}
      renderLoader={() => <Skeleton />}
      ListEmpty={<EmptyList />}
      rootClassName="w-full h-full"
    />
  )
}
