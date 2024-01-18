import { Button, IconButton, Tooltip, Typography } from '@mochi-ui/core'
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Wallet, useMochiWidget } from '~store'
import { utils } from '@consolelabs/mochi-formatter'
import {
  MAX_AMOUNT_PRECISION,
  TokenAmount,
  formatTokenAmount,
} from '~utils/number'
import { ArrowUpDownLine } from '@mochi-ui/icons'
import events from '~constants/events'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { BalanceWithSource } from '~cpn/TokenTableList'
import { useShallow } from 'zustand/react/shallow'
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
  unauthorizedContent: React.ReactNode
  wallet: Wallet | null
  onSelectAsset?: (item: BalanceWithSource | Moniker | null) => void
  onAmountChanged?: (amount: number) => void
  canProceed: boolean
}

export const AmountInput: React.FC<AmountInputProps> = ({
  authorized,
  unauthorizedContent,
  wallet,
  onSelectAsset,
  onAmountChanged,
  canProceed,
}) => {
  const { isOpen: isUsdMode, onToggle: toggleUsdMode } = useDisclosure()
  const ref = useRef<HTMLInputElement | null>(null)
  const { setStep, request, setAmountUsd } = useTipWidget()
  const { selectedAsset, setSelectedAsset } = useMochiWidget(
    useShallow((s) => ({
      selectedAsset: s.selectedAsset,
      setSelectedAsset: s.setSelectedAsset,
    })),
  )
  const [tipAmount, setTipAmount] = useState<TokenAmount>(
    request.amount ? formatTokenAmount(request.amount) : INIT_AMOUNT,
  )
  const unitPrice = selectedAsset?.token?.price ?? 0
  const isMonikerAsset = !isToken(selectedAsset)

  const balance = isMonikerAsset
    ? getBalanceByMoniker(selectedAsset, wallet).display
    : `${utils.formatTokenDigit(selectedAsset?.asset_balance ?? 0)} ${
        selectedAsset?.token?.symbol ?? ''
      }`.trim()

  const balanceUsd = !isToken(request.asset)
    ? getBalanceByMoniker(selectedAsset as Moniker, wallet).value *
      (request.asset?.token_amount ?? 0) *
      unitPrice
    : utils.formatUsdDigit((selectedAsset?.asset_balance ?? 0) * unitPrice)

  // tipAmountUSD will be inaccurate if it's rounded by formatUsdDigit. Ex: $1 -> $0.99, $2 -> $1.99
  const value = isToken(request.asset)
    ? tipAmount.value * unitPrice
    : tipAmount.value * (request.asset?.token_amount ?? 0) * unitPrice
  const tipAmountUSD = utils.formatDigit({
    value,
    fractionDigits: 1,
    shorten: value >= 1,
    takeExtraDecimal: 1,
  })

  const tipAmountUSDhidden = utils.formatDigit({
    value,
    fractionDigits: MAX_AMOUNT_PRECISION,
    shorten: false,
    takeExtraDecimal: 1,
  })

  let valueToken = isToken(request.asset)
    ? tipAmount.value / unitPrice
    : tipAmount.value / ((request.asset?.token_amount ?? 0) * unitPrice)

  if (Number.isNaN(valueToken)) {
    valueToken = 0
  }

  const tipAmountToken = utils.formatDigit({
    value: valueToken,
    fractionDigits: 2,
    shorten: valueToken >= 1,
    takeExtraDecimal: 1,
  })

  useEffect(() => {
    setAmountUsd(tipAmountUSD)
  }, [setAmountUsd, tipAmountUSD])

  useEffect(() => {
    if (!authorized) {
      setSelectedAsset(null)
      setTipAmount({ value: 0, display: '' })
    }
  }, [authorized, setSelectedAsset])

  function handleQuickAmount(amount: string) {
    // Amount is USD -> convert to token amount
    let value = Number(amount) / unitPrice
    if (isUsdMode) {
      value *= unitPrice
      value *= unitPrice
    }
    if (!Number.isFinite(value)) {
      value = 0
    }
    const formattedAmount = formatTokenAmount(
      value.toFixed(MAX_AMOUNT_PRECISION),
    )
    setTipAmount(formattedAmount)
    onAmountChanged?.(formattedAmount.value)
  }

  const handleAssetChanged = useCallback(
    (asset: BalanceWithSource | Moniker | null) => {
      setSelectedAsset(asset)
      // only set to init if asset is null
      // otherwise user might be coming back from step 2
      if (!asset) {
        setTipAmount(INIT_AMOUNT)
        onAmountChanged?.(INIT_AMOUNT.value)
      }
      onSelectAsset?.(asset)
    },
    [onAmountChanged, onSelectAsset, setSelectedAsset],
  )

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
      } else if (event.key === 'Enter' && canProceed) {
        setStep(2)
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

  const handleAmountChanged = useCallback(
    <E extends { target: { value: string } }>(event: E) => {
      const formattedAmount = formatTokenAmount(event.target.value)
      formattedAmount.display = event.target.value // Keep displaying the original user input
      setTipAmount(formattedAmount)
      onAmountChanged?.(
        isUsdMode ? formattedAmount.value / unitPrice : formattedAmount.value,
      )
    },
    [isUsdMode, onAmountChanged, unitPrice],
  )

  function onBlurInput(event: ChangeEvent<HTMLInputElement>) {
    // Format number on blur
    const formattedAmount = formatTokenAmount(event.target.value)
    setTipAmount(formattedAmount)
    onAmountChanged?.(
      isUsdMode ? formattedAmount.value / unitPrice : formattedAmount.value,
    )
  }

  useEffect(() => {
    function focusInput() {
      ref.current?.focus()
    }

    window.addEventListener(events.TIP_WIDGET.FOCUS_AMOUNT, focusInput)

    return () =>
      window.removeEventListener(events.TIP_WIDGET.FOCUS_AMOUNT, focusInput)
  }, [])

  useEffect(() => {
    onSelectAsset?.(selectedAsset as BalanceWithSource | Moniker | null)
  }, [onSelectAsset, selectedAsset])

  return (
    <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-3">
      <div className="flex justify-between items-center">
        <Typography
          level="p5"
          color="textSecondary"
          fontWeight="md"
          className="ml-4"
        >
          You send
        </Typography>
        <div className="flex gap-x-2 justify-end">
          <div className="flex gap-x-2">
            <Button
              size="sm"
              variant="outline"
              color="neutral"
              style={{ padding: '0.25rem 0.625rem', borderRadius: '0.5rem' }}
              onClick={() => handleQuickAmount('1')}
              tabIndex={-1}
              className="text-primary-700"
            >
              {!isUsdMode ? '$' : ''}1
            </Button>
            <Button
              size="sm"
              variant="outline"
              color="neutral"
              style={{ padding: '0.25rem 0.625rem', borderRadius: '0.5rem' }}
              onClick={() => handleQuickAmount('2')}
              tabIndex={-1}
              className="text-primary-700"
            >
              {!isUsdMode ? '$' : ''}2
            </Button>
            <Button
              size="sm"
              variant="outline"
              color="neutral"
              style={{ padding: '0.25rem 0.625rem', borderRadius: '0.5rem' }}
              onClick={() => handleQuickAmount('5')}
              tabIndex={-1}
              className="text-primary-700"
            >
              {!isUsdMode ? '$' : ''}5
            </Button>
          </div>
          <Tooltip
            componentProps={{ trigger: { asChild: true } }}
            content="Currency switcher"
          >
            <IconButton
              label="Toggle USD mode"
              variant="solid"
              color="white"
              onClick={() => {
                if (!isUsdMode) {
                  handleAmountChanged({
                    target: {
                      value: String(tipAmountUSDhidden),
                    },
                  })
                } else {
                  handleAmountChanged({
                    target: { value: String(tipAmountToken) },
                  })
                }
                toggleUsdMode()
              }}
            >
              <ArrowUpDownLine />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col p-4 rounded-lg bg-white-pure">
        <div className="grid grid-cols-8 gap-y-4 grid-rows-auto">
          <div className="flex col-span-5 gap-x-1 items-center pr-4 h-max">
            {isUsdMode && (
              <div className="font-medium leading-[32px] text-[32px] text-neutral-800">
                $
              </div>
            )}
            <input
              className="self-start w-full h-full min-h-0 font-medium appearance-none outline-none leading-[32px] text-[32px] text-neutral-800"
              placeholder="0"
              type="text"
              min={0}
              onKeyDown={handleKeyDown}
              value={tipAmount.display}
              onChange={handleAmountChanged}
              onBlur={onBlurInput}
              ref={ref}
            />
          </div>
          <div className="flex col-span-3 justify-end items-center">
            <TokenPicker
              authorized={authorized}
              unauthorizedContent={unauthorizedContent}
              selectedAsset={selectedAsset}
              onSelect={handleAssetChanged}
            />
          </div>
          <span className="col-span-4 row-start-2 text-sm text-left shrink-0 text-neutral-600">
            &#8776; {!isUsdMode ? tipAmountUSD : tipAmountToken}{' '}
            {!isUsdMode ? 'USD' : selectedAsset?.token.symbol}
          </span>
          <button
            tabIndex={-1}
            type="button"
            onClick={() => {
              let value = isMonikerAsset
                ? getBalanceByMoniker(selectedAsset, wallet).value
                : selectedAsset?.asset_balance ?? 0

              if (isUsdMode) {
                value *= unitPrice
              }

              onBlurInput({
                target: {
                  value: String(value),
                },
              } as any)
            }}
            className="outline-none text-[#848281] text-[13px] col-span-4 text-right"
          >
            Balance: {!isUsdMode ? balance : balanceUsd}
          </button>
        </div>
      </div>
    </div>
  )
}
