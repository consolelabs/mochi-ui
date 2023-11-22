import clsx from 'clsx'
import { utils } from '@consolelabs/mochi-ui'
import { Heading } from '@consolelabs/core'
import { Moniker } from './type'
import { MonikerIcons } from './utils'

interface ItemProps {
  item: Moniker
  onSelect?: (item: Moniker) => void
}

export const MonikerItem: React.FC<ItemProps> = ({ item, onSelect }) => (
  <li
    className={clsx('flex', {
      'opacity-30': item.disabled,
    })}
    key={item.id}
  >
    <button
      className={clsx(
        'outline-none flex flex-row items-center w-full p-2 rounded-lg space-x-2',
        {
          'cursor-pointer hover:bg-[#FAF9F7] transition': !item.disabled,
          'cursor-not-allowed': item.disabled,
        },
      )}
      onClick={() => onSelect?.(item)}
      disabled={item.disabled}
    >
      <div className="flex justify-center items-center w-6 h-6 rounded-full border border-[#E5E4E3]">
        <span className="text-sm">{MonikerIcons.get(item.name)}</span>
      </div>
      <div className="flex flex-col flex-1 items-start">
        <Heading as="h3" className="text-sm">
          {item.name}
        </Heading>
        <span className="text-xs text-[#848281]">
          {`${utils.formatTokenDigit(item.token_amount)} ${item.token.symbol}`}
        </span>
      </div>
      <span className="text-sm">
        {utils.formatUsdDigit(item.token_amount * item.token.price)}
      </span>
    </button>
  </li>
)
