import { formatNumber } from "~utils/number"
import { SourceType } from "./type"
import { Heading } from '@consolelabs/ui-components'

interface ItemProps {
  item: SourceType
  onSelect?: (item: SourceType) => void
}

export const SourceItem: React.FC<ItemProps> = ({ item, onSelect }) => (
  <li
    className="flex flex-row items-center w-full min-w-[226px] p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
    key={item.id}
    onClick={() => onSelect?.(item)}
  >
    <img
      alt={`${item.source} icon`}
      className="w-6 h-6 rounded-full object-contain"
      src={item.source_icon}
    />
    <div className="flex flex-col flex-1">
      <Heading as="h3" className="text-sm">
        {item.profile_id}
      </Heading>
      <span className="text-xs text-[#848281]">
        ${formatNumber(item.total_amount)}
        {item.chain ? ` (${item.token_amount} ${item.chain.short_name})` : ''}
      </span>
    </div>
  </li>
)
