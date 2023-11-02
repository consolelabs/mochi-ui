import Button from '~cpn/base/button'
import { useEffect, useState } from 'react'
import { abbreviateNumber, formatNumber } from '~utils/number'
import { TokenPicker } from '../TokenPicker'
import { MonikerAsset, TokenAsset } from '../TokenPicker/type'

interface AmountInputProps {
  accessToken: string | null
  onLoginRequest?: () => void
}

export const AmountInput: React.FC<AmountInputProps> = ({
  accessToken,
  onLoginRequest,
}) => {
  const [selectedAsset, setSelectedAsset] = useState<
    TokenAsset | MonikerAsset
  >()
  const [tipAmount, setTipAmount] = useState('')
  const isTokenAsset = selectedAsset && 'token' in selectedAsset
  const balance = isTokenAsset
    ? formatNumber(selectedAsset?.token_amount)
    : formatNumber(selectedAsset?.total_amount || '0')
  const balanceUnit = isTokenAsset
    ? selectedAsset.token.name
    : selectedAsset?.moniker.name
  const unitPrice =
    parseFloat(selectedAsset?.total_amount || '0') /
    parseFloat(selectedAsset?.token_amount || '1')
  const tipAmountUSD = abbreviateNumber(
    (parseFloat(tipAmount) || 0) * unitPrice,
  )

  useEffect(() => {
    if (!accessToken) {
      setSelectedAsset(undefined)
    } else {
      // TODO: Fetch assets by token
    }
  }, [accessToken])

  function handleQuickAmount(amount: string) {
    if (!accessToken) {
      onLoginRequest?.()
    } else {
      setTipAmount(amount)
    }
  }

  function onFocusInput() {
    if (!accessToken) {
      onLoginRequest?.()
    }
  }

  return (
    <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <TokenPicker onSelect={setSelectedAsset} />
      </div>
      <div className="flex flex-col gap-y-2 py-6 px-4 rounded-lg bg-white-pure">
        <div className="flex flex-1 justify-between items-center">
          <input
            className="w-[65%] outline-none text-2xl font-medium text-[#343433] appearance-none"
            placeholder="0"
            type="number"
            value={tipAmount}
            onChange={(e) => setTipAmount(e.target.value)}
            onFocus={onFocusInput}
          />
          <span className="text-sm text-[#848281] text-right">
            &#8776; {tipAmountUSD} USD
          </span>
        </div>
        <div className="flex flex-1 justify-between items-center">
          <span className="text-[#848281] text-sm">
            Balance: {balance} {balanceUnit}
          </span>
          <div className="flex gap-x-2">
            <Button
              appearance="text"
              size="xs"
              onClick={() => handleQuickAmount('1')}
            >
              1
            </Button>
            <Button
              appearance="text"
              size="xs"
              onClick={() => handleQuickAmount('2')}
            >
              2
            </Button>
            <Button
              appearance="text"
              size="xs"
              onClick={() => handleQuickAmount('5')}
            >
              5
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
