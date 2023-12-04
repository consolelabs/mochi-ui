import { List } from '@mochi-ui/core'
import { Platform } from './type'
import { PlatformItem } from './PlatformItem'

interface Props {
  data: Platform[]
  onSelect?: (item: Platform) => void
}

export const PlatformList = (props: Props) => {
  const { data, onSelect } = props
  return (
    <List
      rootClassName="w-full"
      data={data}
      renderItem={(item) => (
        <PlatformItem
          key={`platform-list-${item.id}`}
          item={item}
          onSelect={onSelect}
        />
      )}
    />
  )
}
