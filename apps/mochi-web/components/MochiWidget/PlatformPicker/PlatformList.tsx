import { Platform } from './type'
import { List } from '@consolelabs/ui-components'
import { PlatformItem } from './PlatformItem'

interface Props {
  data: Platform[]
  onSelect?: (item: Platform) => void
}

export const PlatformList = (props: Props) => {
  const { data, onSelect } = props
  return (
    <List
      data={data}
      renderItem={(item) => <PlatformItem item={item} onSelect={onSelect} />}
    />
  )
}
