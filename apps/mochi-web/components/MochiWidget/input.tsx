import Button from '~cpn/base/button'
import { TokenPicker } from './TokenPicker'
import { useState } from 'react'
import { MonikerAsset, TokenAsset } from './TokenPicker/type'
import { abbreviateNumber, formatNumber } from '~utils/number'

export default function Input() {
  const [selectedAsset, setSelectedAsset] = useState<
    TokenAsset | MonikerAsset
  >()
  const [tipAmount, setTipAmount] = useState(0)
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
  const tipAmountUSD = abbreviateNumber((tipAmount || 0) * unitPrice)

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
            onChange={(e) => setTipAmount(parseFloat(e.target.value))}
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
            <Button appearance="text" size="xs">
              1
            </Button>
            <Button appearance="text" size="xs">
              2
            </Button>
            <Button appearance="text" size="xs">
              5
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
