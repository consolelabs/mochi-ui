import { List } from '@mochi-ui/core'
import { ChainItem } from './ChainItem'
import { EmptyList } from './EmptyList'

interface Props {
  data: any[]
  onSelect?: (item: any) => void
}

export const ChainList = (props: Props) => {
  const { data, onSelect } = props
  return (
    <List
      data={data}
      renderItem={(item) => (
        <ChainItem
          key={`chain-list-${item.id}`}
          item={item}
          onSelect={onSelect}
        />
      )}
      ListEmpty={<EmptyList />}
      rootClassName="w-full h-full"
    />
  )
}
