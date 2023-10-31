import { SourcePicker } from '../SourcePicker'
import Recipient from '../recipient'
import Input from '../input'
import { Icon } from '@iconify/react'
import { useTipWidget } from '.'

export default function StepOne() {
  const { setStep } = useTipWidget()

  return (
    <div className="flex flex-col flex-1 gap-y-3 min-h-0">
      <div className="flex overflow-y-auto flex-col gap-y-3 h-full">
        <div className="flex flex-col gap-y-2 items-center mt-3">
          <p className="text-xl text-[#343433] font-medium">Send a tip</p>
          <span className="text-[#848281] text-xs text-center">
            Celebrate someone&apos; birthday or achievement
            <br />
            by sending them money
          </span>
        </div>
        <SourcePicker />
        <Recipient />
        <Input />
      </div>
      <button
        onClick={() => setStep(2)}
        className="flex gap-x-1 justify-center items-center py-2.5 px-6 bg-blue-700 rounded-lg"
      >
        <span className="text-sm font-medium text-white-pure">Continue</span>
        <Icon className="w-5 h-5 text-white-pure" icon="ci:arrow-right-sm" />
      </button>
    </div>
  )
}
