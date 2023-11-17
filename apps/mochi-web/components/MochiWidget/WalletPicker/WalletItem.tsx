import { truncate } from '@dwarvesf/react-utils'
import { Heading } from '@consolelabs/core'
import { MochiWalletBase, Wallet } from '~store'
import { utils } from '@consolelabs/mochi-ui'
import { WalletChainIcon } from './WalletChainIcon'

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
    <WalletChainIcon platform={item.wallet.platform ?? ''} />
    <div className="flex flex-col flex-1">
      <Heading as="h3" className="text-sm font-medium text-ellipsis">
        {truncate(item.wallet.platform_identifier || '', 10, true)}
        {item.wallet.id === MochiWalletBase.wallet.id && (
          <span className="text-[#979CA3]"> ({item.wallet.platform})</span>
        )}
      </Heading>
      <span className="text-xs text-[#848281] font-medium">
        {utils.formatUsdDigit(item.total || 0)}
        {item.chain?.symbol ? ` (${item.total} ${item.chain?.symbol})` : ''}
      </span>
    </div>
  </li>
)
