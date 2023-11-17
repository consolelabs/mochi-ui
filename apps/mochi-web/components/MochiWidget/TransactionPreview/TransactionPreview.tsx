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
import { useProfileStore } from '~store'
import { truncate } from '@dwarvesf/react-utils'
import UI, { Platform } from '@consolelabs/mochi-ui'
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
  const { me } = useProfileStore()
  const { fromWallet, request, amountUsd } = useTipWidget()

  return (
    <div className="grid grid-cols-2 gap-y-1 place-content-between p-4 text-sm font-light text-gray-800 rounded-xl border auto-row-auto border-neutral-300">
      <span className="font-medium">Preview</span>
      <IconChevronDown className="justify-self-end self-center text-gray-400" />
      <span>Issued by</span>
      <span className="text-right">{me?.profile_name}</span>
      <span>Addressed to</span>
      <div className="flex flex-col gap-y-1">
        {request.recipients?.slice(0, 4).map((p) => {
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
        {(request.recipients?.slice(4).length ?? 0) > 0 ? (
          <span className="text-right">
            ...and 10 other
            {(request.recipients?.slice(4).length ?? 0) > 1 ? 's' : ''}
          </span>
        ) : null}
      </div>
      <span>Money source</span>
      <div className="flex gap-x-1 justify-end items-center">
        {fromWallet?.wallet.id === 'mochi' ? (
          <>
            <IconMochi />
            <span className="text-right">Mochi wallet</span>
          </>
        ) : (
          <>
            <IconWallet />
            <span className="text-right">
              {truncate(fromWallet?.wallet.platform_identifier ?? '', 5)}
            </span>
          </>
        )}
      </div>
      <span>They will receive</span>
      <span className="text-right">{amountUsd} USD</span>
    </div>
  )
}

const TransactionPreivew = { Tip: TipPreview }
export default TransactionPreivew
