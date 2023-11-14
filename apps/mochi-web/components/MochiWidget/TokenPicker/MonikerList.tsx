import { SectionList } from '@consolelabs/core'
import { MonikerAsset, SectionBase } from './type'
import { MonikerItem } from './MonikerItem'
import { EmptyList } from './EmptyList'

interface Props {
  data: SectionBase<MonikerAsset>[]
  onSelect?: (item: MonikerAsset) => void
}

export const MonikerList = (props: Props) => {
  const { data, onSelect } = props
  return (
    <SectionList
      sections={data}
      renderItem={(item) => <MonikerItem item={item} onSelect={onSelect} />}
      renderSectionHeader={(section) => (
        <label className="font-bold text-[0.625rem] uppercase text-[#ADACAA]">
          {section.title}
        </label>
      )}
      SectionEmpty={<EmptyList />}
      rootClassName="w-full h-full"
    />
  )
}
