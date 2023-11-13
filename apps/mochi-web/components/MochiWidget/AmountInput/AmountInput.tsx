import { Button } from '@consolelabs/ui-components'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { abbreviateNumber, formatNumber } from '~utils/number'
import { Balance, Wallet } from '~store'
import { TokenPicker } from '../TokenPicker'
import { MonikerAsset } from '../TokenPicker/type'

interface AmountInputProps {
  wallet?: Wallet
  accessToken: string | null
  onLoginRequest?: () => void
  onSelectAsset?: (item: Balance) => void
  onAmountChanged?: (amount: number) => void
}

export const AmountInput: React.FC<AmountInputProps> = ({
  wallet,
  accessToken,
  onLoginRequest,
  onSelectAsset,
  onAmountChanged,
}) => {
  const [selectedAsset, setSelectedAsset] = useState<Balance | MonikerAsset>()
  const [tipAmount, setTipAmount] = useState('')
  const isMonikerAsset = selectedAsset && 'moniker' in selectedAsset
  const balance = isMonikerAsset
    ? formatNumber(selectedAsset?.asset_balance ?? 0)
    : formatNumber(selectedAsset?.asset_balance ?? 0)
  const balanceUnit = isMonikerAsset
    ? (selectedAsset as MonikerAsset)?.moniker.moniker
    : selectedAsset?.token?.symbol
  const unitPrice = selectedAsset?.token?.price ?? 0
  const tipAmountUSD = abbreviateNumber(
    (parseFloat(tipAmount) || 0) * unitPrice,
  )

  useEffect(() => {
    if (!accessToken) {
      setSelectedAsset(undefined)
    }
  }, [accessToken])

  function handleQuickAmount(amount: string) {
    if (!accessToken) {
      onLoginRequest?.()
    } else {
      // Amount is USD -> convert to token amount
      const amountInToken = (parseFloat(amount) / unitPrice).toFixed(
        selectedAsset?.token?.decimal ?? 2,
      )
      setTipAmount(amountInToken)
      onAmountChanged?.(parseFloat(amountInToken))
    }
  }

  function onFocusInput() {
    if (!accessToken) {
      onLoginRequest?.()
    }
  }

  function handleAssetChanged(asset: Balance | MonikerAsset) {
    setSelectedAsset(asset)
    setTipAmount('0')
    onSelectAsset?.(asset)
    onAmountChanged?.(0)
  }

  function handleAmountChanged(event: ChangeEvent<HTMLInputElement>) {
    setTipAmount(event.target.value)
    onAmountChanged?.(parseFloat(event.target.value))
  }

  function handleKeyDown(event: KeyboardEvent) {
    // No negative numbers
    if (event.key === '-') {
      event.preventDefault()
    }
  }

  return (
    <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-3">
      <div className="flex justify-between items-center">
        <TokenPicker
          onSelect={handleAssetChanged}
          balances={wallet?.balances}
        />
      </div>
      <div className="flex flex-col gap-y-2 py-6 px-4 rounded-lg bg-white-pure">
        <div className="flex flex-1 justify-between items-center">
          <input
            className="w-[65%] outline-none text-2xl font-medium text-[#343433] appearance-none h-[34px]"
            placeholder="0"
            type="number"
            min={0}
            onKeyDown={handleKeyDown}
            value={tipAmount}
            onChange={handleAmountChanged}
            onFocus={onFocusInput}
          />
          <span className="text-sm text-[#848281] text-right">
            &#8776; {tipAmountUSD} USD
          </span>
        </div>
        <div className="flex flex-1 justify-between items-center">
          <span className="text-[#848281] text-[13px]">
            Balance: {balance} {balanceUnit}
          </span>
          <div className="flex gap-x-2">
            <Button
              size="sm"
              variant="outline"
              color="info"
              style={{ padding: '0.25rem 0.625rem', borderRadius: '0.5rem' }}
              onClick={() => handleQuickAmount('1')}
            >
              $1
            </Button>
            <Button
              size="sm"
              variant="outline"
              color="info"
              style={{ padding: '0.25rem 0.625rem', borderRadius: '0.5rem' }}
              onClick={() => handleQuickAmount('2')}
            >
              $2
            </Button>
            <Button
              size="sm"
              variant="outline"
              color="info"
              style={{ padding: '0.25rem 0.625rem', borderRadius: '0.5rem' }}
              onClick={() => handleQuickAmount('5')}
            >
              $5
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
