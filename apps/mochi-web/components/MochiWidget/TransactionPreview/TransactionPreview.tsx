import React, { useMemo } from 'react'
import {
  X,
  Discord,
  Telegram,
  Dango,
  WalletSolid,
  Mochi,
} from '@mochi-ui/icons'
import { useProfileStore } from '~store'
import UI, { Platform } from '@consolelabs/mochi-formatter'
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
      Icon = Discord
      break
    case Platform.Twitter:
      Icon = X
      break
    case Platform.Telegram:
      Icon = Telegram
      break
    case Platform.Mochi:
      Icon = Dango
      break
    default:
      Icon = WalletSolid
      break
  }

  return (
    <div className="inline-flex gap-x-1 items-center">
      {Icon && <Icon className="text-gray-400 shrink-0" />}
      <span className="whitespace-nowrap truncate max-w-[100px]">
        {stripEmoji(children)}
      </span>
    </div>
  )
}

function TipPreview() {
  const { me } = useProfileStore()
  const { wallet, request, amountUsd } = useTipWidget()

  const receivers = useMemo(() => {
    if (!request.recipients) return null
    const isUseShorten = request.recipients.length > 2
    if (!isUseShorten) {
      const [first, second] = request.recipients
      const [p1, p2] = UI.render(Platform.Web, first, second)
      return (
        <>
          <Recipient platform={p1?.platform}>
            {stripEmoji(p1?.plain ?? 'user')}
          </Recipient>
          {second && (
            <>
              ,
              <Recipient platform={p2?.platform}>
                {stripEmoji(p2?.plain ?? 'user')}
              </Recipient>
            </>
          )}
        </>
      )
    }

    const [first] = request.recipients
    const [p1] = UI.render(Platform.Web, first)

    const count = request.recipients.slice(1).length

    return (
      <>
        <Recipient platform={p1?.platform}>
          {stripEmoji(p1?.plain ?? 'user')}
        </Recipient>
        <span>
          , +{count} other{count > 1 ? 's' : ''}
        </span>
      </>
    )
  }, [request.recipients])

  return (
    <div className="flex flex-col p-4 rounded-xl border border-neutral-300">
      <span className="text-sm font-medium">Preview</span>
      <div className="grid overflow-hidden grid-cols-2 gap-y-1 place-content-between mt-1 text-sm font-light text-gray-800 auto-row-auto">
        <span>Issued by</span>
        <span className="text-right">{me?.profile_name}</span>
        <span>Addressed to</span>
        <span className="flex gap-x-1 justify-end">{receivers}</span>
        <span>Money source</span>
        <div className="flex gap-x-1 justify-end items-center">
          {wallet?.type === 'offchain' ? (
            <>
              <Mochi />
              <span className="text-right">Mochi wallet</span>
            </>
          ) : (
            <>
              <WalletSolid />
              <span className="text-right">{wallet?.title}</span>
            </>
          )}
        </div>
        <span>They will receive</span>
        <span className="text-right">{amountUsd} USD</span>
      </div>
    </div>
  )
}

const TransactionPreivew = { Tip: TipPreview }
export default TransactionPreivew
