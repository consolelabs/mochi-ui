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
import { Variants, m } from 'framer-motion'
import { useProfileStore } from '~store'
import UI, { Platform } from '@consolelabs/mochi-ui'
import stripEmoji from 'emoji-strip'
import clsx from 'clsx'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useTipWidget } from '../Tip/store'

const variants: Variants = {
  open: {
    marginTop: 4,
    height: 'auto',
  },
  close: {
    height: 0,
  },
}

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
  const { wallet, request, amountUsd } = useTipWidget()
  const { isOpen, onToggle } = useDisclosure()

  return (
    <div className="flex flex-col p-4 rounded-xl border border-neutral-300">
      <button
        className="flex justify-between p-4 -m-4"
        type="button"
        onClick={onToggle}
      >
        <span className="text-sm font-medium">Preview</span>
        <IconChevronDown
          className={clsx(
            'transition justify-self-end self-center text-gray-400',
            {
              'rotate-180': isOpen,
            },
          )}
        />
      </button>
      <m.div
        initial={false}
        variants={variants}
        animate={isOpen ? 'open' : 'close'}
        className="grid overflow-hidden grid-cols-2 gap-y-1 place-content-between text-sm font-light text-gray-800 auto-row-auto"
      >
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
          {wallet?.type === 'offchain' ? (
            <>
              <IconMochi />
              <span className="text-right">Mochi wallet</span>
            </>
          ) : (
            <>
              <IconWallet />
              <span className="text-right">{wallet?.title}</span>
            </>
          )}
        </div>
        <span>They will receive</span>
        <span className="text-right">{amountUsd} USD</span>
      </m.div>
    </div>
  )
}

const TransactionPreivew = { Tip: TipPreview }
export default TransactionPreivew
