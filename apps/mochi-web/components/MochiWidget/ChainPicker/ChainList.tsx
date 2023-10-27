import { Chain } from './type'
import { List } from '@consolelabs/ui-components'
import { ChainItem } from './ChainItem'
import { EmptyList } from './EmptyList'

interface Props {
  data: Chain[]
  onSelect?: (item: Chain) => void
}

export const ChainList = (props: Props) => {
  const { data, onSelect } = props
  return (
    <List
      data={data}
      renderItem={(item) => <ChainItem item={item} onSelect={onSelect} />}
      ListEmpty={<EmptyList />}
      rootClassName="w-full h-full"
    />
  )
}
