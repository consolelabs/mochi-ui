import { List } from '@consolelabs/ui-components'
import { Balance } from '~store'
import { TokenItem } from './TokenItem'
import { EmptyList } from './EmptyList'

interface Props {
  data: Balance[]
  onSelect?: (item: Balance) => void
}

export const TokenList = (props: Props) => {
  const { data, onSelect } = props
  const sortedData = data.sort((a, b) => {
    return (b.usd_balance ?? 0) - (a.usd_balance ?? 0)
  })
  return (
    <List
      data={sortedData}
      renderItem={(item) => <TokenItem item={item} onSelect={onSelect} />}
      ListEmpty={<EmptyList />}
      rootClassName="w-full h-full"
    />
  )
}
