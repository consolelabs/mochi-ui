import React from 'react'
import {
  IconChevronDown,
  IconX,
  IconDiscord,
  IconTelegram,
  IconDango,
  IconWallet,
  IconMochi,
} from '@consolelabs/ui-components'
import { Platform } from '@consolelabs/mochi-ui'
import stripEmoji from 'emoji-strip'

function Recipient({
  children,
  platform,
}: {
  platform?: Platform
  children?: string
}) {
  if (!children) return null
  let Icon
  switch (platform) {
    case Platform.Discord:
      Icon = IconDiscord
      break
    case Platform.Twitter:
      Icon = IconX
      break
    case Platform.Telegram:
      Icon = IconTelegram
      break
    case Platform.Mochi:
      Icon = IconDango
      break
    default:
      Icon = IconWallet
      break
  }

  return (
    <div className="flex gap-x-1 justify-end items-center">
      {Icon && <Icon className="text-gray-400" />}
      {stripEmoji(children)}
    </div>
  )
}

function TipPreview() {
  return (
    <div className="grid grid-cols-2 gap-y-1 place-content-between p-4 text-sm font-light text-gray-800 rounded-xl border auto-row-auto border-neutral-300">
      <span className="font-medium">Preview</span>
      <IconChevronDown className="justify-self-end self-center text-gray-400" />
      <span>Issued by</span>
      <span className="text-right">vincent</span>
      <span>Addressed to</span>
      <div className="flex flex-col gap-y-1">
        <Recipient>0xd23...4dx</Recipient>
        <Recipient platform={Platform.Twitter}>baddeed</Recipient>
        <Recipient platform={Platform.Telegram}>hnh2908</Recipient>
        <Recipient platform={Platform.Discord}>tqhuy1991</Recipient>
        <span className="text-right">...and 10 others</span>
      </div>
      <span>Money source</span>
      <div className="flex gap-x-1 justify-end items-center">
        <IconMochi />
        <span className="text-right">baddeed</span>
      </div>
      <span>They will receive</span>
      <span className="text-right">100 USD</span>
    </div>
  )
}

const TransactionPreivew = { Tip: TipPreview }
export default TransactionPreivew
