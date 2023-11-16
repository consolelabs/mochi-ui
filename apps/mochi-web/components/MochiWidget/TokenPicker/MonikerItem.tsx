import { formatNumber } from '~utils/number'
import { Heading } from '@consolelabs/core'
import { MonikerAsset, MonikerIcons } from './type'

interface ItemProps {
  item: MonikerAsset
  onSelect?: (item: MonikerAsset) => void
}

export const MonikerItem: React.FC<ItemProps> = ({ item, onSelect }) => (
  <li className="flex" key={item.id}>
    <button
      className="flex flex-row items-center w-full p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
      onClick={() => onSelect?.(item)}
    >
      <div className="flex justify-center items-center w-6 h-6 rounded-full border border-[#E5E4E3]">
        <span className="text-sm">
          {MonikerIcons.get(item.moniker.moniker ?? '')}
        </span>
      </div>
      <div className="flex flex-col flex-1 items-start">
        <Heading as="h3" className="text-sm">
          {item.moniker.moniker}
        </Heading>
        <span className="text-xs text-[#848281]">
          {`${formatNumber(item.token_amount)} ${item.token_unit}`}
        </span>
      </div>
      <span className="text-sm">${formatNumber(item.total_amount)}</span>
    </button>
  </li>
)
