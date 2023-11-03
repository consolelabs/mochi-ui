import { formatNumber } from '~utils/number'
import { Heading } from '@consolelabs/ui-components'
import { ModelInAppWallet } from '~types/mochi-pay-schema'
import { truncateWallet } from '~utils/string'

interface ItemProps {
  item: ModelInAppWallet
  onSelect?: (item: ModelInAppWallet) => void
}

export const WalletItem: React.FC<ItemProps> = ({ item, onSelect }) => (
  <li
    className="flex flex-row items-center w-full min-w-[226px] p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
    key={item.wallet_address}
    onClick={() => onSelect?.(item)}
  >
    <img
      alt={`${item.chain?.name} icon`}
      className="w-6 h-6 rounded-full object-contain"
      src={item.chain?.icon || '/logo.png'}
    />
    <div className="flex flex-col flex-1">
      <Heading as="h3" className="text-sm text-ellipsis">
        {truncateWallet(item.wallet_address || '')}
      </Heading>
      <span className="text-xs text-[#848281]">
        ${formatNumber(item.total_amount || 0)}
        {item.chain ? ` (${item.total_amount} ${item.chain.symbol})` : ''}
      </span>
    </div>
  </li>
)
