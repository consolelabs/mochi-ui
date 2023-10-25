import { SourceType } from './type'
import { List } from '@consolelabs/ui-components'
import { SourceItem } from './SourceItem'

interface SelectorProps {
  data: SourceType[]
  onSelect?: (item: SourceType) => void
}

export const SourceList = (props: SelectorProps) => {
  const { data, onSelect } = props
  return (
    <div className="flex gap-x-1 items-center py-3 px-3 bg-white rounded-lg shadow-md">
      <List
        data={data}
        renderItem={(item) => <SourceItem item={item} onSelect={onSelect} />}
      />
    </div>
  )
}
