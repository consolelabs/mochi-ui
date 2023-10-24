import { GetServerSideProps } from 'next'
import { API } from '~constants/api'
import { utils } from 'ethers'
import { format } from 'date-fns'
import { Layout } from '~app/layout'
import { HOME_URL } from '~envs'
import { SEO } from '~app/layout/seo'
import { Platform, utils as mochiUtils } from '@consolelabs/mochi-ui'
import { Icon } from '@iconify/react'
import Avatar from '~cpn/base/avatar'
import {
  discordLogo,
  successStampIcon,
  failStampIcon,
  telegramLogo,
  xlogo,
  coinIcon,
} from '~utils/image'
import clsx from 'clsx'
import { UI } from '~constants/mochi'
import { hpbd, appreciation, achievement, wedding } from 'utils/image'
import Image from 'next/image'
import { truncate } from '@dwarvesf/react-utils'
import { useDisclosure } from '@dwarvesf/react-hooks'
import cc from 'clsx'
import { boringAvatar } from '~utils/string'

type TemplateName =
  | 'happy_birthday'
  | 'appreciation'
  | 'achievement'
  | 'anniversary'

type Template = { img: string; phrase: string; title: string }

const templates: Record<TemplateName, Template> = {
  happy_birthday: {
    phrase: 'sent a birthday gift',
    img: hpbd.src,
    title: 'Happy Birthday ⎯ Tip from <user> ⎯ Mochi',
  },
  appreciation: {
    phrase: 'sent a thank you gift',
    img: appreciation.src,
    title: 'Thank You ⎯ Tip from <user> ⎯ Mochi',
  },
  achievement: {
    phrase: 'sent a gift to celebrate the achievement',
    img: achievement.src,
    title: 'Celebrate Achievement ⎯ Tip from <user> ⎯ Mochi',
  },
  anniversary: {
    phrase: 'sent an anniversary gift',
    img: wedding.src,
    title: 'Happy Anniversary ⎯ Tip from <user> ⎯ Mochi',
  },
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query

  if (!id) {
    return {
      props: {},
    }
  }

  const transfer = await API.MOCHI_PAY.get(`/transfer/${id}`)
    .notFound(() => null)
    .json((r: any) => r.data)

  if (!transfer) {
    return {
      notFound: true,
    }
  }

  const templateName =
    transfer.metadata?.template?.slug.toLowerCase() as TemplateName
  const template = templates[templateName] ?? null

  const type = transfer.type

  let avatar = transfer.from_profile.avatar
  let [sender, receiver] = await UI.resolve(
    Platform.Web,
    transfer.from_profile_source === 'mochi-vault'
      ? {
          type: 'vault',
          id: transfer.metadata.vault_request.vault_id.toString(),
        }
      : transfer.from_profile_id,
    transfer.other_profile_source === 'mochi-vault'
      ? {
          type: 'vault',
          id: transfer.metadata.vault_request.vault_id.toString(),
        }
      : transfer.other_profile_id,
  )

  if (sender?.plain && template?.title) {
    template.title = template.title.replace('<user>', sender.plain)
  }

  if (type === 'in') {
    ;[sender, receiver] = [receiver, sender]
    avatar = transfer.other_profile.avatar
  }

  let platformIcon = null
  switch (sender?.platform) {
    case Platform.Discord: {
      platformIcon = discordLogo.src
      break
    }
    case Platform.Telegram: {
      platformIcon = telegramLogo.src
      break
    }
    case Platform.Twitter: {
      platformIcon = xlogo.src
      break
    }
  }

  const { image } = await UI.components.amount({
    on: Platform.Web,
    amount: utils.formatUnits(
      transfer?.amount ?? 0,
      transfer?.token.decimal ?? 0,
    ),
    symbol: transfer.token.symbol,
  })

  // try to see if the avatar is an image
  try {
    const res = await fetch(avatar)
    if (!res.ok) throw new Error()
  } catch (e: any) {
    avatar = boringAvatar(sender?.id)
  }

  const success = transfer.status === 'success'
  const data = {
    from: sender?.plain ?? '',
    native: transfer?.token.native,
    tokenIcon: image || `${HOME_URL}/assets/coin.png`,
    to: receiver?.plain ?? '',
    symbol: transfer?.token.symbol,
    amount: mochiUtils.formatTokenDigit({
      value: utils.formatUnits(
        transfer?.amount ?? 0,
        transfer?.token.decimal ?? 0,
      ),
      scientificFormat: true,
    }),
    usd_amount: mochiUtils.formatUsdDigit(transfer.usd_amount),
    date: '',
    external_id: transfer.external_id,
    moniker: transfer.metadata.moniker || '',
    original_amount: transfer.metadata.original_amount || '',
    template,
    success,
  }

  if (transfer) {
    data.date = format(new Date(transfer?.created_at), 'MMM do, yyyy')
  }

  return {
    props: {
      ogData: data,
      platformIcon,
      transfer,
      sender: {
        value: sender?.plain ?? '',
        avatar,
      },
      receiver: receiver?.plain ?? '',
    },
  }
}

function Template({
  title,
  phrase,
  img,
  ...rest
}: Template & { platformIcon?: string; avatar: string }) {
  return (
    <div className="relative w-full bg-inherit h-[200px]">
      <Image
        src={img}
        fill
        className="object-cover object-bottom"
        alt={title}
      />
      <div className="absolute bottom-0 left-1/2 p-0.5 rounded-full -translate-x-1/2 translate-y-1/2 bg-inherit">
        <InternalAvatar {...rest} />
      </div>
    </div>
  )
}

function InternalAvatar({
  platformIcon,
  avatar,
}: {
  platformIcon?: string
  avatar: string
}) {
  return !platformIcon ? (
    <img className="w-14 h-14 rounded-full" src={avatar} alt="" />
  ) : (
    <Avatar size="sm" src={avatar} cutoutSrc={platformIcon} />
  )
}

export default function Transfer({
  transfer,
  sender,
  receiver,
  platformIcon,
  ogData,
}: {
  ogData: any
  platformIcon?: string
  transfer: any
  sender: {
    value: string
    avatar: string
  }
  receiver: string
}) {
  const amountSymbol = ogData.amount
  const amountDisplay = transfer.metadata.moniker
    ? transfer.metadata.original_amount
    : amountSymbol
  const unitCurrency = transfer.metadata.moniker
    ? transfer.metadata.moniker
    : transfer.token.symbol
  const amountApproxMoniker = transfer.metadata.moniker
    ? `${amountSymbol} ${transfer.token.symbol}`
    : ``
  const amountSection = transfer.metadata.moniker
    ? `${amountDisplay} ${transfer.metadata.moniker}`
    : `${amountDisplay} ${transfer.token.symbol}`
  const unitAmountSection = transfer.metadata.moniker
    ? `(${amountSymbol} ${transfer.token.symbol})`
    : null
  const isLongNumber = amountDisplay.length >= 12

  const amountUsd = mochiUtils.formatUsdDigit(transfer.usd_amount)

  const { isOpen: isViewFullMessage, onToggle } = useDisclosure({
    defaultIsOpen: false,
  })

  return (
    <Layout>
      <SEO
        title={
          ogData.template
            ? ogData.template.title
            : `Tip from ${sender.value} - Mochi`
        }
        image={`${HOME_URL}/api/transfer-og?data=${encodeURIComponent(
          JSON.stringify(ogData),
        )}`}
        description={`${
          sender.value
        } paid ${receiver} ${amountDisplay} ${unitCurrency}${
          transfer.metadata.message
            ? ` with message: "${truncate(
                transfer.metadata.message,
                30,
                false,
              )}"`
            : ''
        }`}
        url={`${HOME_URL}/transfer/${transfer.external_id}`}
      />
      <div className="px-4 mx-auto w-full max-w-md font-sans drop-shadow-md">
        <div className="flex overflow-hidden relative flex-col gap-y-6 w-full text-center bg-white rounded receipt">
          {ogData.template ? (
            <Template
              {...ogData.template}
              platformIcon={platformIcon}
              avatar={sender.avatar}
            />
          ) : (
            <>
              <div
                className="w-1/2 -translate-x-1/2"
                style={{
                  display: 'flex',
                  top: 10,
                  left: '50%',
                  position: 'absolute',
                  height: 200,
                  background:
                    'linear-gradient(0deg, #f4c4c2 0%, #eec3fd 48.96%, #8fc6e4 100%)',
                  filter: 'blur(60px)',
                  opacity: 0.7,
                }}
              />
              <Icon
                icon="solar:gift-linear"
                className="relative mt-2 w-full h-32 text-gray-700 drop-shadow-2xl"
              />
            </>
          )}
          <div className="flex flex-col gap-y-12 py-3 px-6 pb-6 md:px-8">
            <div className="flex relative flex-col items-center">
              {ogData.template ? null : (
                <InternalAvatar
                  platformIcon={platformIcon}
                  avatar={sender.avatar}
                />
              )}
              <div className="mt-2 text-sm">
                <span className="font-medium">{sender.value}</span>
                <br />
                <span className="text-xs font-light text-gray-500">
                  {ogData.template ? ogData.template.phrase : 'sent'}
                </span>
              </div>
              <div className="flex justify-center items-center mt-8 font-medium">
                <div
                  className={clsx('flex', {
                    'flex-col': isLongNumber,
                    'items-center': isLongNumber,
                    'items-baseline': !isLongNumber,
                  })}
                >
                  <img
                    className={clsx('mr-1 w-7 h-7', {})}
                    src={ogData.tokenIcon || coinIcon.src}
                    alt=""
                  />
                  <div className="text-5xl">{amountDisplay}</div>
                  <div
                    className={clsx('flex mt-1', {
                      'items-center': isLongNumber,
                      'items-baseline ml-1': !isLongNumber,
                    })}
                  >
                    <div className="text-4xl">{unitCurrency}</div>
                  </div>
                </div>
              </div>
              <span className="text-xl">
                {amountApproxMoniker}{' '}
                {amountUsd.startsWith('<') ? '' : <>&asymp;</>} {amountUsd}
              </span>
            </div>
            {transfer.metadata.message && (
              <div className="flex flex-col gap-y-3">
                <span className="relative mt-3 font-normal text-center break-words">
                  &ldquo;
                  {isViewFullMessage
                    ? transfer.metadata.message
                    : truncate(transfer.metadata.message, 300, false)}
                  &rdquo;
                </span>
                {transfer.metadata.message.length > 300 ? (
                  <button
                    className="font-normal text-gray-500 underline"
                    onClick={onToggle}
                  >
                    {isViewFullMessage ? 'view less' : 'view more'}
                  </button>
                ) : null}
              </div>
            )}
            <div className="relative -mx-6 text-gray-400">
              <div className="flex relative flex-col gap-y-2 gap-x-4 py-4 font-mono xs:flex-row">
                <div className="absolute top-0 left-0 w-full h-full scale-x-125 receipt-dashed-box" />
                <ul className="relative flex-1 px-2 space-y-2 text-xs">
                  <li className="flex gap-x-3 justify-between">
                    <span className="font-normal text-current">From</span>
                    <span className="font-semibold text-current">
                      {sender.value}
                    </span>
                  </li>
                  <li className="flex gap-x-3 justify-between">
                    <span className="font-normal text-current">To</span>
                    <span className="font-semibold text-current">
                      {receiver}
                    </span>
                  </li>

                  <li className="flex gap-x-3 justify-between">
                    <span className="font-normal text-current">Amount</span>
                    <span className="flex flex-col items-end text-current">
                      <span className="font-normal text-current">
                        {amountSection}
                      </span>
                      {unitAmountSection && (
                        <span className="ml-1 font-normal text-current">
                          {unitAmountSection}
                        </span>
                      )}
                    </span>
                  </li>
                </ul>
                <ul className="relative flex-1 px-2 space-y-2 text-xs">
                  <li className="flex justify-between">
                    <span className="font-normal text-current">Tx ID</span>
                    <span className="font-normal text-current">
                      {transfer.external_id}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-normal text-current">Date</span>
                    <span className="font-normal text-current">
                      {ogData.date}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-normal text-current">Status</span>
                    <span className="font-normal text-current">
                      {ogData.success ? 'Success' : 'Failed'}
                    </span>
                  </li>
                  <img
                    src={
                      ogData.success ? successStampIcon.src : failStampIcon.src
                    }
                    className={cc(
                      'absolute right-0 top-1/2 flex-shrink-0 h-full opacity-30',
                      {
                        'scale-[2]': ogData.success,
                        '': !ogData.success,
                      },
                    )}
                    alt=""
                  />
                </ul>
              </div>
              <div className="flex justify-between px-2 mt-5 text-xs font-light">
                <a className="text-current" href="#">
                  Mochi &copy; 2023
                </a>
                <span className="text-current">
                  {format(new Date(transfer.created_at), 'dd/MM/yyyy hh:mmaa')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
