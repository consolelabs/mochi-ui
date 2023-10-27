import { MonikerAsset } from './type'
import { Heading } from '@consolelabs/ui-components'

interface ItemProps {
  item: MonikerAsset
  onSelect?: (item: MonikerAsset) => void
}

export const MonikerItem: React.FC<ItemProps> = ({ item, onSelect }) => (
  <li
    className="flex flex-row items-center w-full p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
    key={item.id}
    onClick={() => onSelect?.(item)}
  >
    <div className="flex justify-center items-center w-6 h-6 rounded-full border border-[#E5E4E3]">
      <span className="text-sm">{item.moniker.icon}</span>
    </div>
    <div className="flex flex-col flex-1">
      <Heading as="h3" className="text-sm">
        {item.moniker.name}
      </Heading>
      <span className="text-xs text-[#848281]">
        {`${parseFloat(item.token_amount).toLocaleString('en-US')} ${
          item.token_unit
        }`}
      </span>
    </div>
    <span className="text-sm">
      ${parseFloat(item.total_amount).toLocaleString('en-US')}
    </span>
  </li>
)
