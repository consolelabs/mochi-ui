import { Button } from '@mochi-ui/core'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { ChevronDownLine } from '@mochi-ui/icons'
import clsx from 'clsx'
import { BottomSheet } from '~cpn/BottomSheet'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Wallet } from '~store'
import { WalletList } from './WalletList'
import { WalletChainIcon } from './WalletChainIcon'
import sortOrder from './sort-order.json'

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
  chainSymbol: 'MOCHI',
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

  const sortedData = useMemo(() => {
    return data.sort((a, b) => {
      const indexA = sortOrder.findIndex((symbol) => symbol === a.chainSymbol)
      const indexB = sortOrder.findIndex((symbol) => symbol === b.chainSymbol)

      if (indexA === -1) return 1
      if (indexB === -1) return -1

      if (indexA > indexB) return 1
      if (indexA < indexB) return -1
      return 0
    })
  }, [data])

  useEffect(() => {
    if (!authorized) return
    const firstWallet = sortedData[0]
    if (firstWallet) {
      handleWalletSelect(firstWallet)
    }
  }, [authorized, sortedData, handleWalletSelect])

  useEffect(() => {
    if (!authorized) {
      setSelectedWallet(defaultState)
      return
    }
    onClose()
  }, [authorized, onClose])

  return (
    <>
      <div
        role="button"
        tabIndex={-1}
        onClickCapture={onOpen}
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
        {authorized ? (
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
        ) : (
          <Button type="button" size="sm">
            Connect
          </Button>
        )}
      </div>
      <BottomSheet
        isOpen={isOpen}
        onClose={onClose}
        title={authorized ? 'Choose wallet' : ''}
        dynamic={!authorized}
      >
        {authorized ? (
          <WalletList
            loading={loading}
            data={sortedData}
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
