import { Icon } from '@iconify/react'
import clsx from 'clsx'
import Link from 'next/link'
import { Button } from '@consolelabs/ui-components'
import { IconCheck, IconSpinner } from '@consolelabs/icons'
import { useTipWidget } from './store'
import MessagePicker from '../MessagePicker/MessagePicker'
import ThemePicker from '../ThemePicker/ThemePicker'
import TransactionPreview from '../TransactionPreview/TransactionPreview'

export default function StepTwo() {
  const {
    isTransferring,
    tx,
    transfer,
    setStep,
    updateRequestTheme,
    updateRequestMessage,
    request,
    reset,
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
          <Icon icon="ic:round-chevron-left" className="w-5 h-5" />
        </button>
        <span className="mx-auto text-base text-[#343433]">You send</span>
        <p className="mx-auto text-3xl font-medium leading-5 text-black">
          100 USD
        </p>
        <span className="text-sm text-[#7a7e85] mx-auto">&#8776; 10 BTC</span>

        {/* probably will read data from store */}
        <TransactionPreview.Tip />

        <MessagePicker
          value={request?.message}
          onChange={updateRequestMessage}
        />

        <ThemePicker value={request?.theme} onChange={updateRequestTheme} />
      </div>
      <Button
        type="button"
        onClick={transfer}
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
