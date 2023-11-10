import { List } from '@consolelabs/ui-components'
import { ModelBalance } from '~types/mochi-pay-schema'
import { TokenItem } from './TokenItem'
import { EmptyList } from './EmptyList'

interface Props {
  data: ModelBalance[]
  onSelect?: (item: ModelBalance) => void
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
