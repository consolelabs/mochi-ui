import * as ScrollArea from '@radix-ui/react-scroll-area'
import { MAX_AMOUNT_PRECISION, formatTokenAmount } from '~utils/number'
import { Button } from '@consolelabs/core'
import { IconCheck, IconChevronLeft } from '@consolelabs/icons'
import { useTipWidget } from './store'
import MessagePicker from '../MessagePicker/MessagePicker'
import ThemePicker from '../ThemePicker/ThemePicker'
import TransactionPreview from '../TransactionPreview/TransactionPreview'
import { isToken } from '../TokenPicker/utils'

export default function StepTwo() {
  const {
    isTransferring,
    execute,
    setStep,
    updateRequestTheme,
    updateRequestMessage,
    request,
    amountUsd,
  } = useTipWidget()

  return (
    <div className="flex flex-col flex-1 gap-y-3 min-h-0">
      <ScrollArea.Viewport className="[&>div]:!block">
        <div className="flex flex-col gap-y-2 h-full">
          <button onClick={() => setStep(1)} className="self-start mt-3">
            <IconChevronLeft className="w-5 h-5" />
          </button>
          <span className="mx-auto text-base text-[#343433]">You send</span>
          <p className="mx-auto text-3xl font-medium leading-5 text-black">
            {formatTokenAmount(request.amount ?? 0).display}{' '}
            {isToken(request.asset)
              ? request.asset?.token?.symbol
              : request.asset?.name}
          </p>
          <div className="flex flex-col">
            {!isToken(request.asset) && (
              <span className="text-sm text-[#7a7e85] mx-auto">
                &#8776;{' '}
                {
                  formatTokenAmount(
                    (
                      (request.amount ?? 0) * (request.asset?.token_amount ?? 0)
                    ).toFixed(MAX_AMOUNT_PRECISION),
                  ).display
                }{' '}
                {request.asset?.token.symbol}
              </span>
            )}
            <span className="text-sm text-[#7a7e85] mx-auto">
              &#8776; {amountUsd} USD
            </span>
          </div>

          <TransactionPreview.Tip />

          <MessagePicker
            value={request.message ?? ''}
            onChange={updateRequestMessage}
          />

          <ThemePicker value={request.theme} onChange={updateRequestTheme} />
        </div>
      </ScrollArea.Viewport>
      <Button
        type="button"
        onClick={execute}
        className="flex justify-center mt-auto"
        size="lg"
        disabled={isTransferring}
      >
        Send
        <IconCheck />
      </Button>
    </div>
  )
}
