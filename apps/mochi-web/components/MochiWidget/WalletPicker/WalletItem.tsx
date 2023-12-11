import { Wallet } from '~store'
import { WalletChainIcon } from './WalletChainIcon'

interface ItemProps {
  item: Wallet
  onSelect?: (item: Wallet) => void
}

export const WalletItem: React.FC<ItemProps> = ({ item, onSelect }) => {
  return (
    <li
      className="flex flex-row items-center w-full min-w-[226px] p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
      role="presentation"
      onClick={() => onSelect?.(item)}
    >
      <WalletChainIcon platform={item.icon} />
      <div className="flex flex-col flex-1">
        <h3 className="text-ellipsis text-sm font-medium">
          {item.title}
          {item.type === 'offchain' && (
            <span className="text-[#979CA3]"> (Mochi Wallet)</span>
          )}
        </h3>
        <span className="text-xs text-[#848281] font-medium">
          {item.usd_amount}
        </span>
      </div>
    </li>
  )
}
