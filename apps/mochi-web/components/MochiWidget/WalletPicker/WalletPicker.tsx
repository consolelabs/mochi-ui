import { useDisclosure } from '@dwarvesf/react-hooks'
import { ChevronDownLine } from '@consolelabs/icons'
import clsx from 'clsx'
import { BottomSheet } from '~cpn/BottomSheet'
import { useCallback, useEffect, useState } from 'react'
import { Wallet } from '~store'
import { WalletList } from './WalletList'
import { WalletChainIcon } from './WalletChainIcon'

interface Props {
  authorized: boolean
  unauthorizedContent: React.ReactNode
  data: Wallet[]
  onSelect?: (item: Wallet) => void
  loading?: boolean
}

const defaultState: Wallet = {
  id: 'mochi',
  type: 'offchain',
  balances: [],
  usd_amount: '$0',
  subtitle: '',
  title: 'Mochi Wallet',
  icon: '',
}

export const WalletPicker: React.FC<Props> = ({
  data,
  loading = true,
  authorized,
  unauthorizedContent,
  onSelect,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedWallet, setSelectedWallet] = useState<Wallet>(defaultState)

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

  useEffect(() => {
    if (!authorized) {
      setSelectedWallet(defaultState)
      return
    }
    onClose()
  }, [authorized, onClose])

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="flex gap-x-3 items-center py-2.5 px-4 text-left bg-blue-700 bg-opacity-10 rounded-lg outline-none"
      >
        <WalletChainIcon platform={selectedWallet.icon} />
        <div className="flex flex-col flex-1 justify-between min-w-0">
          <span className="text-sm font-medium text-blue-700">
            {selectedWallet.title}
          </span>
          <span className="text-xs text-blue-500 whitespace-nowrap truncate">
            {selectedWallet.subtitle || <>Not connected</>}
          </span>
        </div>
        {authorized && (
          <>
            <span className="flex-shrink-0 text-sm font-medium text-blue-700">
              {selectedWallet.usd_amount}
            </span>
            <ChevronDownLine
              className={clsx('w-4 h-4 text-blue-700 transition', {
                'rotate-180': isOpen,
              })}
            />
          </>
        )}
      </button>
      <BottomSheet
        isOpen={isOpen}
        onClose={onClose}
        title={authorized ? 'Choose wallet' : ''}
      >
        {authorized ? (
          <WalletList
            loading={loading}
            data={data}
            onSelect={(w) => {
              handleWalletSelect(w)
              onClose()
            }}
          />
        ) : (
          unauthorizedContent
        )}
      </BottomSheet>
    </>
  )
}
