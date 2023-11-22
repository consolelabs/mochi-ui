import Image from 'next/image'
import { Heading } from '@consolelabs/core'
import { Chain } from './type'

interface ItemProps {
  item: Chain
  onSelect?: (item: Chain) => void
}

export const ChainItem: React.FC<ItemProps> = ({ item, onSelect }) => (
  <li key={item.id}>
    <button
      className="outline-none flex flex-row items-center w-full p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
      onClick={() => onSelect?.(item)}
    >
      <Image
        width={24}
        height={24}
        alt={`${item.name} icon`}
        className="object-contain rounded-full"
        src={item.icon}
      />
      <div className="flex flex-col flex-1 items-start">
        <Heading as="h3" className="text-sm">
          {item.name}
        </Heading>
      </div>
    </button>
  </li>
)
