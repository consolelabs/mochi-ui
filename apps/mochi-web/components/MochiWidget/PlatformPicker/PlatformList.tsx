import { Platform } from './type'
import { List } from '@consolelabs/ui-components'
import { PlatformItem } from './PlatformItem'

interface SelectorProps {
  data: Platform[]
  onSelect?: (item: Platform) => void
}

export const PlatformList = (props: SelectorProps) => {
  const { data, onSelect } = props
  return (
    <div className="flex gap-x-1 items-center py-3 px-3 bg-white rounded-lg shadow-md">
      <List
        data={data}
        renderItem={(item) => <PlatformItem item={item} onSelect={onSelect} />}
      />
    </div>
  )
}
