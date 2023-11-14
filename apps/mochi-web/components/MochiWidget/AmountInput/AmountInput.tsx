import { Button } from '@consolelabs/ui-components'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { Balance, Wallet } from '~store'
import { utils } from '@consolelabs/mochi-ui'
import { TokenAmount, formatTokenAmount } from '~utils/number'
import { TokenPicker } from '../TokenPicker'
import { MonikerAsset } from '../TokenPicker/type'

const INIT_AMOUNT: TokenAmount = {
  value: 0,
  display: '',
}

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
  const [tipAmount, setTipAmount] = useState<TokenAmount>(INIT_AMOUNT)
  const isMonikerAsset = selectedAsset && 'moniker' in selectedAsset
  const balance = utils.formatTokenDigit(selectedAsset?.asset_balance ?? 0)
  const balanceUnit = isMonikerAsset
    ? (selectedAsset as MonikerAsset)?.moniker.moniker
    : selectedAsset?.token?.symbol
  const unitPrice = selectedAsset?.token?.price ?? 0
  // tipAmountUSD will be inaccurate if it's rounded by formatUsdDigit. Ex: $1 -> $0.99, $2 -> $1.99
  const tipAmountUSD = utils.formatDigit({
    value: tipAmount.value * unitPrice,
    fractionDigits: 2,
    shorten: true,
    scientificFormat: true,
  })

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
      const amountInToken = Number(amount) / unitPrice
      const formattedAmount = formatTokenAmount(amountInToken)
      setTipAmount(formattedAmount)
      onAmountChanged?.(formattedAmount.value)
    }
  }

  function onFocusInput() {
    if (!accessToken) {
      onLoginRequest?.()
    }
  }

  function handleAssetChanged(asset: Balance | MonikerAsset) {
    setSelectedAsset(asset)
    onSelectAsset?.(asset)
    setTipAmount(INIT_AMOUNT)
    onAmountChanged?.(INIT_AMOUNT.value)
  }

  function handleAmountChanged(event: ChangeEvent<HTMLInputElement>) {
    const formattedAmount = formatTokenAmount(event.target.value)
    formattedAmount.display = event.target.value // Keep displaying the original user input
    setTipAmount(formattedAmount)
  }

  function handleKeyDown(event: KeyboardEvent) {
    // Accept only a positive integer / float input
    if (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      event.key === 'Tab' ||
      event.key === 'Escape' ||
      event.key === 'Enter' ||
      event.key === '.' ||
      event.key === ',' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      Number.isFinite(Number(event.key))
    ) {
      // Accept only one dot(".")
      if (tipAmount.display.indexOf('.') !== -1 && event.key === '.') {
        event.preventDefault()
      } else {
        // Accept the first dot(".")
        return
      }
    } else {
      event.preventDefault()
    }
    if (event.key === '-' || !Number.isFinite(Number(event.key))) {
      event.preventDefault()
    }
  }

  function onBlurInput(event: ChangeEvent<HTMLInputElement>) {
    // Format number on blur
    const formattedAmount = formatTokenAmount(event.target.value)
    setTipAmount(formattedAmount)
    onAmountChanged?.(formattedAmount.value)
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
            type="text"
            min={0}
            onKeyDown={handleKeyDown}
            value={tipAmount.display}
            onChange={handleAmountChanged}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
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
