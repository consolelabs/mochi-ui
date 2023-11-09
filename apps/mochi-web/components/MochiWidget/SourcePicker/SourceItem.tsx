import { formatNumber } from '~utils/number'
import { SelectItem } from '@consolelabs/ui-components'
import { SourceType } from './type'

interface ItemProps {
  item: SourceType
  onSelect?: (item: SourceType) => void
}

export const SourceItem: React.FC<ItemProps> = ({ item }) => (
  <SelectItem
    value={item.id}
    key={item.id}
    leftIcon={
      <img
        alt={`${item.source} icon`}
        className="w-6 h-6 rounded-full object-contain"
        src={item.source_icon}
      />
    }
    subTitle={
      <>
        ${formatNumber(item.total_amount)}
        {item.chain ? ` (${item.token_amount} ${item.chain.short_name})` : ''}
      </>
    }
  >
    {item.profile_id}
  </SelectItem>
)
