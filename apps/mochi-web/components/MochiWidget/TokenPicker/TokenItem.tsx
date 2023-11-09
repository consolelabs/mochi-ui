import { formatNumber } from '~utils/number'
import { Heading } from '@consolelabs/ui-components'
import { ModelBalance } from '~types/mochi-pay-schema'
import Image from 'next/image'

interface ItemProps {
  item: ModelBalance
  onSelect?: (item: ModelBalance) => void
}

export const TokenItem: React.FC<ItemProps> = ({ item, onSelect }) => (
  <li
    className="flex flex-row items-center w-full p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
    key={item.id}
    onClick={() => onSelect?.(item)}
  >
    <Image
      alt={`${item.token?.name} icon`}
      className="w-6 h-6 rounded-full object-contain"
      src={item.token?.icon || '/logo.png'}
      width={24}
      height={24}
    />
    <div className="flex flex-col flex-1">
      <Heading as="h3" className="text-sm">
        {item.token?.name}
      </Heading>
      <span className="text-xs text-[#848281]">
        {formatNumber(item.amount ?? '0')}
      </span>
    </div>
    <span className="text-sm">${formatNumber(item.amount ?? '0')}</span>
  </li>
)
