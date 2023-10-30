import { SourceType } from './type'
import { List } from '@consolelabs/ui-components'
import { SourceItem } from './SourceItem'

interface Props {
  data: SourceType[]
  onSelect?: (item: SourceType) => void
}

export const SourceList = (props: Props) => {
  const { data, onSelect } = props
  return (
    <List
      rootClassName="w-full"
      data={data}
      renderItem={(item) => <SourceItem item={item} onSelect={onSelect} />}
    />
  )
}
