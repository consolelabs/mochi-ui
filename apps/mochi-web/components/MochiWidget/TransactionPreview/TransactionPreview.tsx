import React from 'react'
import {
  IconChevronDown,
  IconX,
  IconDiscord,
  IconTelegram,
  IconDango,
  IconWallet,
  IconMochi,
} from '@consolelabs/icons'
import UI, { Platform, utils } from '@consolelabs/mochi-ui'
import stripEmoji from 'emoji-strip'
import { useTipWidget } from '../Tip/store'

function Recipient({
  children,
  platform,
}: {
  platform?: Platform | null
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
  const { recipients = [], asset, amount } = useTipWidget()

  return (
    <div className="grid grid-cols-2 gap-y-1 place-content-between p-4 text-sm font-light text-gray-800 rounded-xl border auto-row-auto border-neutral-300">
      <span className="font-medium">Preview</span>
      <IconChevronDown className="justify-self-end self-center text-gray-400" />
      <span>Issued by</span>
      <span className="text-right">vincent</span>
      <span>Addressed to</span>
      <div className="flex flex-col gap-y-1">
        {recipients.slice(0, 4).map((p) => {
          const [profile] = UI.render(Platform.Web, p)
          const name = stripEmoji(profile?.plain ?? 'user')

          return (
            <Recipient
              key={`transaction-preview-${name}`}
              platform={profile?.platform}
            >
              {name}
            </Recipient>
          )
        })}
        {recipients.slice(4).length > 0 ? (
          <span className="text-right">
            ...and 10 other{recipients.slice(4).length > 1 ? 's' : ''}
          </span>
        ) : null}
      </div>
      <span>Money source</span>
      <div className="flex gap-x-1 justify-end items-center">
        <IconMochi />
        <span className="text-right">Mochi wallet</span>
      </div>
      <span>They will receive</span>
      <span className="text-right">
        {utils.formatDigit({
          value: (asset?.token?.price ?? 0) * (amount ?? 0),
          fractionDigits: 2,
          shorten: true,
          scientificFormat: true,
        })}{' '}
        USD
      </span>
    </div>
  )
}

const TransactionPreivew = { Tip: TipPreview }
export default TransactionPreivew
