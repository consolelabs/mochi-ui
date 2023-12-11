import { Balance } from '~store'
import { utils } from '@consolelabs/mochi-ui'
import Image from 'next/image'

interface ItemProps {
  item: Balance
  onSelect?: (item: Balance) => void
}

export const TokenItem: React.FC<ItemProps> = ({ item, onSelect }) => {
  return (
    <li
      className="flex flex-row items-center w-full p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
      role="presentation"
      onClick={() => onSelect?.(item)}
    >
      <Image
        width={22}
        height={22}
        alt={`${item.token.name} icon`}
        className="object-contain rounded-full"
        src={item.token.icon || '/logo.png'}
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-sm font-medium">{item.token?.symbol}</h3>
        <span className="text-xs text-[#848281] font-medium">
          {utils.formatTokenDigit(item.asset_balance)}
        </span>
      </div>
      <span className="text-sm">{utils.formatUsdDigit(item.usd_balance)}</span>
    </li>
  )
}
