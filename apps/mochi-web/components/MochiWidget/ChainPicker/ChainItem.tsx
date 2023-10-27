import { Chain } from './type'
import { Heading } from '@consolelabs/ui-components'

interface ItemProps {
  item: Chain
  onSelect?: (item: Chain) => void
}

export const ChainItem: React.FC<ItemProps> = ({ item, onSelect }) => (
  <li
    className="flex flex-row items-center w-full p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
    key={item.id}
    onClick={() => onSelect?.(item)}
  >
    <img
      alt={`${item.name} icon`}
      className="w-6 h-6 rounded-full object-contain"
      src={item.icon}
    />
    <div className="flex flex-col flex-1">
      <Heading as="h3" className="text-sm">
        {item.name}
      </Heading>
    </div>
  </li>
)
