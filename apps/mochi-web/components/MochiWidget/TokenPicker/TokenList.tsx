import { TokenAsset } from './type'
import { List } from '@consolelabs/ui-components'
import { TokenItem } from './TokenItem'
import { EmptyList } from './EmptyList'

interface Props {
  data: TokenAsset[]
  onSelect?: (item: TokenAsset) => void
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
