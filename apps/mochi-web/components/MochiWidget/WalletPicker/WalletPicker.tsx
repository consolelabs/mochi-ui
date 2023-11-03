import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { formatNumber } from '~utils/number'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@consolelabs/ui-components'
import { useProfileStore } from '~store'
import { ModelInAppWallet } from '~types/mochi-pay-schema'
import { truncateWallet } from '~utils/string'
import { WalletList } from './WalletList'

const DefaultWallet: ModelInAppWallet = {
  wallet_address: 'Not connected',
  chain: {
    icon: '/logo.png',
    name: 'Mochi Wallet',
  },
}

interface Props {
  accessToken: string | null
  onLoginRequest?: () => void
  onSelect?: (item: ModelInAppWallet) => void
}

export const WalletPicker: React.FC<Props> = ({
  accessToken,
  onLoginRequest,
  onSelect,
}) => {
  const [isOpenSelector, setIsOpenSelector] = useState(false)
  const [selectedWallet, setSelectedWallet] =
    useState<ModelInAppWallet>(DefaultWallet)
  const { wallets } = useProfileStore()

  useEffect(() => {
    if (!accessToken) {
      setSelectedWallet(DefaultWallet)
    } else if (wallets.length > 0) {
      setSelectedWallet(wallets[0])
    }
  }, [accessToken, wallets])

  function handleWalletSelect(wallet: ModelInAppWallet) {
    setSelectedWallet(wallet)
    setIsOpenSelector(false)
    onSelect?.(wallet)
  }

  function handleTriggerClick() {
    if (!accessToken) {
      onLoginRequest?.()
    }
  }

  return (
    <Popover open={isOpenSelector} onOpenChange={setIsOpenSelector}>
      <PopoverTrigger
        className="flex gap-x-3 items-center py-2.5 px-4 bg-[#017AFF] bg-opacity-10 rounded-lg text-left"
        onClick={handleTriggerClick}
      >
        <img
          className="flex-shrink-0 w-6 h-6"
          src={selectedWallet.chain?.icon || '/logo.png'}
          alt={`${selectedWallet.chain?.name} icon`}
        />
        <div className="flex flex-col flex-1 justify-between">
          <span className="text-sm font-medium text-blue-700">
            {selectedWallet.chain?.name}
          </span>
          <span className="text-xs text-blue-500">
            {truncateWallet(selectedWallet.wallet_address || '')}
          </span>
        </div>
        {accessToken && (
          <>
            <span className="flex-shrink-0 text-sm font-medium text-blue-700">
              ${formatNumber(selectedWallet.total_amount || '0')}
            </span>
            <Icon
              icon="majesticons:chevron-down-line"
              className="w-4 h-4 text-[#ADACAA]"
            />
          </>
        )}
      </PopoverTrigger>
      {accessToken && (
        <PopoverContent
          align="start"
          className="w-[414px] flex gap-x-1 items-center py-3 px-3 bg-white-pure rounded-lg shadow-md focus-visible:outline-none"
        >
          <WalletList data={wallets} onSelect={handleWalletSelect} />
        </PopoverContent>
      )}
    </Popover>
  )
}
