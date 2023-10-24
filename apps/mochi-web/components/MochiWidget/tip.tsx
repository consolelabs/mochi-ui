import MoneySource from './money-source'
import Recipient from './recipient'
import Input from './input'
import { Icon } from '@iconify/react'
import { useState } from 'react'

export default function Tip() {
  const [step, setStep] = useState(1)

  if (step === 1) {
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
          <MoneySource />
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

        <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center py-5 px-4 rounded-lg bg-white-pure">
            <input
              className="flex-1 h-full bg-transparent outline-none"
              placeholder="Enter message"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="py-1 px-3 rounded-lg bg-white-pure font-medium text-sm text-[#343433]">
              ☕️ Coffee treat for you
            </span>
            <span className="py-1 px-3 rounded-lg bg-white-pure font-medium text-sm text-[#343433]">
              💸 Pay my debt
            </span>
            <span className="py-1 px-3 rounded-lg bg-white-pure font-medium text-sm text-[#343433]">
              🍕 Pizza on me tonight!
            </span>
            <span className="py-1 px-3 rounded-lg bg-white-pure font-medium text-sm text-[#343433]">
              🎉 Treat yourself
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <span className="text-sm text-[#343433] font-medium">
            Select theme
          </span>
          <div className="grid grid-cols-4 grid-rows-1 gap-x-2">
            <div className="overflow-hidden relative">
              <img
                src="/tip-theme-new-year.jpg"
                className="object-cover w-full h-full"
                alt=""
              />
              <span className="absolute top-1/2 left-1/2 text-xs font-medium whitespace-nowrap -translate-x-1/2 -translate-y-1/2 text-white-pure">
                New Year
              </span>
            </div>
            <div className="overflow-hidden relative">
              <img
                src="/tip-theme-christmas.jpg"
                className="object-cover w-full h-full"
                alt=""
              />
              <span className="absolute top-1/2 left-1/2 text-xs font-medium whitespace-nowrap -translate-x-1/2 -translate-y-1/2 text-white-pure">
                Christmas
              </span>
            </div>
            <div className="overflow-hidden relative">
              <img
                src="/tip-theme-hpbd.jpg"
                className="object-cover w-full h-full"
                alt=""
              />
              <span className="absolute top-1/2 left-1/2 text-xs font-medium whitespace-nowrap -translate-x-1/2 -translate-y-1/2 text-white-pure">
                Birthday
              </span>
            </div>
            <div className="overflow-hidden relative">
              <img
                src="/tip-theme-more.jpg"
                className="object-cover w-full h-full"
                alt=""
              />
              <span className="absolute top-1/2 left-1/2 text-xs font-medium whitespace-nowrap -translate-x-1/2 -translate-y-1/2 text-white-pure">
                +More
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 px-1">
          <div className="flex justify-between">
            <span className="text-sm text-[#343433] font-medium">Details</span>
            <Icon icon="majesticons:chevron-down-line" className="w-4 h-4" />
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#848281] flex-1">Transfer to</span>
            <span className="text-sm text-[#343433] flex-1 text-right">
              vincent
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#848281] flex-1">Social</span>
            <span className="text-sm text-[#343433] flex-1 text-right">
              Discord
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[#848281] flex-1">Your address</span>
            <span className="text-sm text-[#343433] flex-1 text-right">
              0xd23..4dx
            </span>
          </div>
        </div>
      </div>
      <button className="flex gap-x-1 justify-center items-center py-2.5 px-6 mt-auto bg-blue-700 rounded-lg">
        <span className="text-sm font-medium text-white-pure">Send</span>
        <Icon className="w-5 h-5 text-white-pure" icon="iconamoon:check-bold" />
      </button>
    </div>
  )
}
