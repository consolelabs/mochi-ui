import { List } from '@consolelabs/core'
import { Balance } from '~store'
import { TokenItem } from './TokenItem'
import { EmptyList } from './EmptyList'

interface Props {
  data: Balance[]
  onSelect?: (item: Balance) => void
}

export const TokenList = (props: Props) => {
  const { data, onSelect } = props
  return (
    <List
      data={data}
      renderItem={(item) => <TokenItem item={item} onSelect={onSelect} />}
      ListEmpty={<EmptyList />}
      rootClassName="w-full h-full"
    />
  )
}
