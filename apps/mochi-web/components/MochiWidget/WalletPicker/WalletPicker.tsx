import { useDisclosure } from '@dwarvesf/react-hooks'
import { IconChevronDown } from '@consolelabs/icons'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@consolelabs/core'
import { Wallet } from '~store'
import { WalletList } from './WalletList'
import { WalletChainIcon } from './WalletChainIcon'

interface Props {
  authorized: boolean
  unauthorizedContent?: React.ReactNode
  data: Wallet[]
  onSelect?: (item: Wallet) => void
  loading?: boolean
}

export const WalletPicker: React.FC<Props> = ({
  data,
  loading = true,
  authorized,
  unauthorizedContent,
  onSelect,
}) => {
  const {
    isOpen: isOpenSelector,
    onClose: hideSelector,
    onToggle: toggleSelector,
  } = useDisclosure()
  const [selectedWallet, setSelectedWallet] = useState<Wallet>({
    id: 'mochi',
    type: 'offchain',
    balances: [],
    usd_amount: '$0',
    subtitle: '',
    title: 'Mochi Wallet',
    icon: '',
  })

  const handleWalletSelect = useCallback(
    (wallet: Wallet) => {
      setSelectedWallet(wallet)
      onSelect?.(wallet)
    },
    [onSelect],
  )

  useEffect(() => {
    const mochiWallet = data[0]
    if (mochiWallet?.type === 'offchain') {
      handleWalletSelect(mochiWallet)
    }
  }, [data, handleWalletSelect])

  return (
    <Popover open={isOpenSelector} onOpenChange={toggleSelector}>
      <PopoverTrigger className="flex gap-x-3 items-center py-2.5 px-4 bg-[#017AFF] bg-opacity-10 rounded-lg text-left">
        <WalletChainIcon platform={selectedWallet.icon} />
        <div className="flex flex-col flex-1 justify-between">
          <span className="text-sm font-medium text-blue-700">
            {selectedWallet.title}
          </span>
          <span className={clsx('text-xs text-blue-500')}>
            {selectedWallet.subtitle || <>&#8203;</>}
          </span>
        </div>
        {authorized && (
          <>
            <span className="flex-shrink-0 text-sm font-medium text-blue-700">
              {selectedWallet.usd_amount}
            </span>
            <IconChevronDown
              className={clsx('w-4 h-4 text-blue-700 transition', {
                'rotate-180': isOpenSelector,
              })}
            />
          </>
        )}
      </PopoverTrigger>
      {authorized ? (
        <PopoverContent
          align="start"
          avoidCollisions={false}
          className="flex gap-x-1 items-center py-3 px-3 rounded-lg shadow-md focus-visible:outline-none w-[414px] bg-white-pure"
        >
          <WalletList
            loading={loading}
            data={data}
            onSelect={(w) => {
              handleWalletSelect(w)
              hideSelector()
            }}
          />
        </PopoverContent>
      ) : (
        unauthorizedContent
      )}
    </Popover>
  )
}
