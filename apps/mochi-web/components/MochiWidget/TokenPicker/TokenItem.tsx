import { formatNumber } from '~utils/number'
import { TokenAsset } from './type'
import { Heading } from '@consolelabs/ui-components'

interface ItemProps {
  item: TokenAsset
  onSelect?: (item: TokenAsset) => void
}

export const TokenItem: React.FC<ItemProps> = ({ item, onSelect }) => (
  <li
    className="flex flex-row items-center w-full p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
    key={item.id}
    onClick={() => onSelect?.(item)}
  >
    <img
      alt={`${item.token.name} icon`}
      className="w-6 h-6 rounded-full object-contain"
      src={item.icon}
    />
    <div className="flex flex-col flex-1">
      <Heading as="h3" className="text-sm">
        {item.token.name}
      </Heading>
      <span className="text-xs text-[#848281]">
        {formatNumber(item.token_amount)}
      </span>
    </div>
    <span className="text-sm">${formatNumber(item.total_amount)}</span>
  </li>
)
