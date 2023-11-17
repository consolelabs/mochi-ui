import clsx from 'clsx'
import { MAX_AMOUNT_PRECISION, formatTokenAmount } from '~utils/number'
import Link from 'next/link'
import { Button } from '@consolelabs/core'
import { IconCheck, IconChevronLeft, IconSpinner } from '@consolelabs/icons'
import { useTipWidget } from './store'
import MessagePicker from '../MessagePicker/MessagePicker'
import ThemePicker from '../ThemePicker/ThemePicker'
import TransactionPreview from '../TransactionPreview/TransactionPreview'
import { isToken } from '../TokenPicker/utils'

export default function StepTwo() {
  const {
    isTransferring,
    tx,
    execute,
    setStep,
    updateRequestTheme,
    updateRequestMessage,
    request,
    reset,
    amountUsd,
  } = useTipWidget()

  return (
    <div className="flex flex-col flex-1 gap-y-3 min-h-0">
      <div
        className={clsx(
          'will-change-transform transition absolute left-0 top-0 w-full h-full',
          {
            'bg-transparent pointer-events-none': !tx,
            'bg-black/10': tx,
          },
        )}
        onClick={reset}
      />
      <div
        className={clsx(
          'will-change-transform delay-75 flex justify-between text-sm absolute left-3 right-3 bottom-0 transition border border-neutral-300 bg-white-pure shadow-lg py-3 px-4 rounded-lg',
          {
            'translate-y-full': !tx,
            '-translate-y-3': tx,
          },
        )}
      >
        <span className="font-medium">🎊 New tip sent</span>
        <Link
          href={`/tx/${tx?.external_id}`}
          className="text-blue-500 underline"
        >
          View tx
        </Link>
      </div>
      <div className="flex overflow-y-auto flex-col gap-y-2">
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

        {/* probably will read data from store */}
        <TransactionPreview.Tip />

        <MessagePicker
          value={request.message ?? ''}
          onChange={updateRequestMessage}
        />

        <ThemePicker
          value={request.theme ?? { id: 0, src: '', name: '', group: '' }}
          onChange={updateRequestTheme}
        />
      </div>
      <Button
        type="button"
        onClick={execute}
        className="flex justify-center mt-auto"
        size="lg"
        disabled={isTransferring}
      >
        {isTransferring ? <>&#8203;</> : 'Send'}
        {isTransferring ? <IconSpinner /> : <IconCheck />}
      </Button>
    </div>
  )
}
