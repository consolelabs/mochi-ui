import { Button } from '@consolelabs/core'
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Balance, Wallet } from '~store'
import { utils } from '@consolelabs/mochi-ui'
import {
  MAX_AMOUNT_PRECISION,
  TokenAmount,
  formatTokenAmount,
} from '~utils/number'
import { TokenPicker } from '../TokenPicker'
import { Moniker } from '../TokenPicker/type'
import { useTipWidget } from '../Tip/store'
import { getBalanceByMoniker, isToken } from '../TokenPicker/utils'

const INIT_AMOUNT: TokenAmount = {
  value: 0,
  display: '',
}

interface AmountInputProps {
  authorized: boolean
  unauthorizedContent?: React.ReactNode
  wallet: Wallet | null
  onSelectAsset?: (item: Balance | Moniker | null) => void
  onAmountChanged?: (amount: number) => void
}

export const AmountInput: React.FC<AmountInputProps> = ({
  authorized,
  unauthorizedContent,
  wallet,
  onSelectAsset,
  onAmountChanged,
}) => {
  const { request, setAmountUsd } = useTipWidget()
  const [selectedAsset, setSelectedAsset] = useState<Balance | Moniker | null>(
    request.asset,
  )
  const [tipAmount, setTipAmount] = useState<TokenAmount>(
    request.amount ? formatTokenAmount(request.amount) : INIT_AMOUNT,
  )
  const isMonikerAsset = !isToken(selectedAsset)

  const balance = isMonikerAsset
    ? getBalanceByMoniker(selectedAsset, wallet).display
    : `${utils.formatTokenDigit(selectedAsset?.asset_balance ?? 0)} ${
        selectedAsset?.token?.symbol ?? ''
      }`.trim()

  const unitPrice = selectedAsset?.token?.price ?? 0
  // tipAmountUSD will be inaccurate if it's rounded by formatUsdDigit. Ex: $1 -> $0.99, $2 -> $1.99
  const value = isToken(request.asset)
    ? tipAmount.value * unitPrice
    : tipAmount.value * (request.asset?.token_amount ?? 0) * unitPrice
  const tipAmountUSD = utils.formatDigit({
    value,
    fractionDigits: 2,
    shorten: value >= 1,
    scientificFormat: true,
    takeExtraDecimal: 1,
  })

  useEffect(() => {
    setAmountUsd(tipAmountUSD)
  }, [setAmountUsd, tipAmountUSD])

  useEffect(() => {
    if (!authorized) {
      setSelectedAsset(null)
    }
  }, [authorized])

  function handleQuickAmount(amount: string) {
    // Amount is USD -> convert to token amount
    const amountInToken = Number(amount) / unitPrice
    const formattedAmount = formatTokenAmount(
      amountInToken.toFixed(MAX_AMOUNT_PRECISION),
    )
    setTipAmount(formattedAmount)
    onAmountChanged?.(formattedAmount.value)
  }

  const handleAssetChanged = useCallback(
    (asset: Balance | Moniker | null) => {
      setSelectedAsset(asset)
      // only set to init if asset is null
      // otherwise user might be coming back from step 2
      if (!asset) {
        setTipAmount(INIT_AMOUNT)
        onAmountChanged?.(INIT_AMOUNT.value)
      }
      onSelectAsset?.(asset)
    },
    [onAmountChanged, onSelectAsset],
  )

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
      Number.isFinite(Number(event.key)) ||
      // allow for select all
      (event.metaKey && event.key.toLowerCase() === 'a')
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

  useEffect(() => {
    const bal = wallet?.balances.at(0)
    if (bal) {
      handleAssetChanged(bal)
    }
  }, [handleAssetChanged, wallet?.balances, wallet?.id])

  return (
    <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-3">
      <div className="flex justify-between items-center">
        <TokenPicker
          authorized={authorized}
          unauthorizedContent={unauthorizedContent}
          selectedAsset={selectedAsset}
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
            onBlur={onBlurInput}
          />
          <span className="text-sm text-[#848281] text-right">
            &#8776; {tipAmountUSD} USD
          </span>
        </div>
        <div className="flex flex-1 justify-between items-center">
          <button
            type="button"
            onClick={() =>
              onBlurInput({
                target: {
                  value: isMonikerAsset
                    ? getBalanceByMoniker(selectedAsset, wallet).value
                    : String(selectedAsset?.asset_balance ?? 0),
                },
              } as any)
            }
            className="outline-none text-[#848281] text-[13px]"
          >
            Balance: {balance}
          </button>
          <div className="flex gap-x-2">
            <Button
              size="sm"
              variant="outline"
              color="neutral"
              style={{ padding: '0.25rem 0.625rem', borderRadius: '0.5rem' }}
              onClick={() => handleQuickAmount('1')}
            >
              $1
            </Button>
            <Button
              size="sm"
              variant="outline"
              color="neutral"
              style={{ padding: '0.25rem 0.625rem', borderRadius: '0.5rem' }}
              onClick={() => handleQuickAmount('2')}
            >
              $2
            </Button>
            <Button
              size="sm"
              variant="outline"
              color="neutral"
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
