import { formatNumber } from '~utils/number'
import { Heading } from '@consolelabs/ui-components'
import { truncateWallet } from '~utils/string'
import { MochiWalletBase, Wallet } from '~store'

interface ItemProps {
  item: Wallet
  onSelect?: (item: Wallet) => void
}

export const WalletItem: React.FC<ItemProps> = ({ item, onSelect }) => (
  <li
    className="flex flex-row items-center w-full min-w-[226px] p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
    key={item.wallet.platform}
    role="presentation"
    onClick={() => onSelect?.(item)}
  >
    <img
      alt={`${item.chain?.name} icon`}
      className="w-6 h-6 rounded-full object-contain"
      src={item.chain?.icon || '/logo.png'}
    />
    <div className="flex flex-col flex-1">
      <Heading as="h3" className="text-sm text-ellipsis font-medium">
        {truncateWallet(item.wallet.platform_identifier || '')}
        {item.wallet.id === MochiWalletBase.wallet.id && (
          <span className="text-[#979CA3]"> ({item.wallet.platform})</span>
        )}
      </Heading>
      <span className="text-xs text-[#848281] font-medium">
        ${formatNumber(item.total || 0)}
        {item.chain?.symbol ? ` (${item.total} ${item.chain?.symbol})` : ''}
      </span>
    </div>
  </li>
)
