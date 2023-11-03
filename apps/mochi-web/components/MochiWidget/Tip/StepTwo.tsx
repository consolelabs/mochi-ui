import { Icon } from '@iconify/react'
import { useTipWidget } from './store'
import MessagePicker from '../MessagePicker/MessagePicker'
import ThemePicker from '../ThemePicker/ThemePicker'
import TransactionPreview from '../TransactionPreview/TransactionPreview'

export default function StepTwo() {
  const { setStep, request, updateRequestTheme, updateRequestMessage } =
    useTipWidget()

  return (
    <div className="flex flex-col flex-1 gap-y-3 min-h-0">
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

        <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center py-5 px-4 rounded-lg bg-white-pure">
            <input
              value={request?.message ?? ''}
              className="flex-1 h-full bg-transparent outline-none"
              placeholder="Enter message"
            />
          </div>
          <MessagePicker
            value={request?.message}
            onChange={updateRequestMessage}
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <span className="text-sm text-[#343433] font-medium">
            Select theme
          </span>
          <ThemePicker value={request?.theme} onChange={updateRequestTheme} />
        </div>
      </div>
      <button
        onClick={() => setStep(3)}
        className="flex gap-x-1 justify-center items-center py-2.5 px-6 mt-auto bg-blue-700 rounded-lg"
      >
        <span className="text-sm font-medium text-white-pure">Send</span>
        <Icon className="w-5 h-5 text-white-pure" icon="iconamoon:check-bold" />
      </button>
    </div>
  )
}
