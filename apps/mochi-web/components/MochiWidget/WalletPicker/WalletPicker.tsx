import { useDisclosure } from '@dwarvesf/react-hooks'
import { useShallow } from 'zustand/react/shallow'
import { IconChevronDown } from '@consolelabs/icons'
import clsx from 'clsx'
import { truncate } from '@dwarvesf/react-utils'
import { useEffect, useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@consolelabs/core'
import { Wallet, useAuthStore, useWalletStore } from '~store'
import { utils } from '@consolelabs/mochi-ui'
import { WalletList } from './WalletList'
import { WalletChainIcon } from './WalletChainIcon'

const DefaultWallet: Wallet = {
  wallet: {
    platform: 'Mochi Wallet',
    platform_identifier: 'Not connected',
  },
  chain: {
    icon: '/logo.png',
    name: 'Mochi Wallet',
  },
}

interface Props {
  onLoginRequest?: () => void
  onSelect?: (item: Wallet) => void
}

export const WalletPicker: React.FC<Props> = ({ onLoginRequest, onSelect }) => {
  const {
    isOpen: isOpenSelector,
    onClose: hideSelector,
    onToggle: toggleSelector,
  } = useDisclosure()
  const accessToken = useAuthStore(useShallow((s) => s.token))
  const [selectedWallet, setSelectedWallet] = useState<Wallet>(DefaultWallet)
  const { wallets } = useWalletStore()

  useEffect(() => {
    if (!accessToken) {
      handleWalletSelect(DefaultWallet)
    } else if (wallets.length > 0) {
      handleWalletSelect(wallets[0])
    }
  }, [accessToken, wallets])

  function handleWalletSelect(wallet: Wallet) {
    setSelectedWallet(wallet)
    hideSelector()
    onSelect?.(wallet)
  }

  function handleTriggerClick() {
    if (!accessToken) {
      onLoginRequest?.()
    }
  }

  const isAddress =
    selectedWallet.wallet.id && selectedWallet.wallet.id !== 'mochi'

  const title = isAddress
    ? truncate(selectedWallet.wallet?.platform_identifier ?? '', 10, true)
    : selectedWallet.wallet.platform
  const subtitle = isAddress
    ? selectedWallet.wallet.platform?.replace('-chain', '')
    : selectedWallet.wallet.platform_identifier

  return (
    <Popover open={isOpenSelector} onOpenChange={toggleSelector}>
      <PopoverTrigger
        className="flex gap-x-3 items-center py-2.5 px-4 bg-[#017AFF] bg-opacity-10 rounded-lg text-left"
        onClick={handleTriggerClick}
      >
        <WalletChainIcon platform={selectedWallet.wallet.platform ?? ''} />
        <div className="flex flex-col flex-1 justify-between">
          <span className="text-sm font-medium text-blue-700">{title}</span>
          <span className={clsx('text-xs text-blue-500')}>{subtitle}</span>
        </div>
        {accessToken && (
          <>
            <span className="flex-shrink-0 text-sm font-medium text-blue-700">
              {utils.formatUsdDigit(selectedWallet.total || '0')}
            </span>
            <IconChevronDown className="w-4 h-4 text-blue-700" />
          </>
        )}
      </PopoverTrigger>
      {accessToken && (
        <PopoverContent
          align="start"
          className="flex gap-x-1 items-center py-3 px-3 rounded-lg shadow-md focus-visible:outline-none w-[414px] bg-white-pure"
        >
          <WalletList data={wallets} onSelect={handleWalletSelect} />
        </PopoverContent>
      )}
    </Popover>
  )
}
