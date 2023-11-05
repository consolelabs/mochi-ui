import { List } from '@consolelabs/ui-components'
import { SourceType } from './type'
import { SourceItem } from './SourceItem'

interface Props {
  data: SourceType[]
}

export const SourceList = (props: Props) => {
  const { data } = props
  return (
    <List
      rootClassName="w-full"
      data={data}
      renderItem={(item: SourceType) => <SourceItem item={item} />}
    />
  )
}
