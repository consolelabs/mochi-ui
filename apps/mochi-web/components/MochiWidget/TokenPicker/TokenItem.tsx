import { Heading } from '@consolelabs/ui-components'
import { Balance } from '~store'
import { utils } from '@consolelabs/mochi-ui'

interface ItemProps {
  item: Balance
  onSelect?: (item: Balance) => void
}

export const TokenItem: React.FC<ItemProps> = ({ item, onSelect }) => (
  <li
    className="flex flex-row items-center w-full p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
    key={item.id}
    role="presentation"
    onClick={() => onSelect?.(item)}
  >
    <img
      alt={`${item.token?.name} icon`}
      className="w-6 h-6 rounded-full object-contain"
      src={item.token?.icon || '/logo.png'}
    />
    <div className="flex flex-col flex-1">
      <Heading as="h3" className="text-sm font-medium">
        {item.token?.symbol}
      </Heading>
      <span className="text-xs text-[#848281] font-medium">
        {utils.formatTokenDigit(item.asset_balance ?? 0)}
      </span>
    </div>
    <span className="text-sm">
      {utils.formatUsdDigit(item.usd_balance ?? 0)}
    </span>
  </li>
)
