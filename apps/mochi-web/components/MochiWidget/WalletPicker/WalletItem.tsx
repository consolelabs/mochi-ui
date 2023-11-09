import { formatNumber } from '~utils/number'
import { Heading } from '@consolelabs/ui-components'
import { truncateWallet } from '~utils/string'
import { Wallet } from '~store'
import Image from 'next/image'

interface ItemProps {
  item: Wallet
  onSelect?: (item: Wallet) => void
}

export const WalletItem: React.FC<ItemProps> = ({ item, onSelect }) => (
  <li
    className="flex flex-row items-center w-full min-w-[226px] p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
    key={item.wallet.platform}
    onClick={() => onSelect?.(item)}
  >
    <Image
      alt={`${item.chain?.name} icon`}
      className="w-6 h-6 rounded-full object-contain"
      src={item.chain?.icon || '/logo.png'}
      width={24}
      height={24}
    />
    <div className="flex flex-col flex-1">
      <Heading as="h3" className="text-sm text-ellipsis">
        {truncateWallet(item.wallet.platform_identifier || '')}
      </Heading>
      <span className="text-xs text-[#848281]">
        ${formatNumber(item.total || 0)}
        {item.chain?.symbol ? ` (${item.total} ${item.chain?.symbol})` : ''}
      </span>
    </div>
  </li>
)
