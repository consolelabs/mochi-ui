import useSWR from 'swr'
import { API } from '~constants/api'
import { templates, type TemplateName } from './template'
import Template from './template'
import UI, { Platform, utils as mochiUtils } from '@consolelabs/mochi-ui'
import {
  discordLogo,
  successStampIcon,
  failStampIcon,
  telegramLogo,
  xlogo,
  coinIcon,
} from '~utils/image'
import { utils } from 'ethers'
import { HOME_URL } from '~envs'
import { Icon } from '@iconify/react'
import { Avatar } from '@consolelabs/ui-components'
import clsx from 'clsx'
import { truncate } from '@dwarvesf/react-utils'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { format } from 'date-fns'

interface Props {
  id: string
}

export async function transformData(rawData: any) {
  const templateName =
    rawData.metadata?.template?.slug.toLowerCase() as TemplateName
  const template = templates[templateName] ?? null

  const { type } = rawData
  const isMultipleReceivers = Array.isArray(rawData.other_profiles)
  const success = rawData.status === 'success'

  let avatar = rawData.from_profile.avatar
  let [sender, receiver] = await UI.resolve(
    Platform.Web,
    rawData.from_profile_source === 'mochi-vault'
      ? {
          type: 'vault',
          id: rawData.metadata.vault_request.vault_id.toString(),
        }
      : rawData.from_profile_id,
    rawData.other_profile_source === 'mochi-vault'
      ? {
          type: 'vault',
          id: rawData.metadata.vault_request.vault_id.toString(),
        }
      : rawData.other_profile_id,
  )

  if (sender?.plain && template?.title) {
    template.title = template.title.replace('<user>', sender.plain)
  }

  if (type === 'in') {
    ;[sender, receiver] = [receiver, sender]
    avatar = rawData.other_profile.avatar
  }

  let platformIcon
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
      rawData?.amount ?? 0,
      rawData?.token.decimal ?? 0,
    ),
    symbol: rawData.token.symbol,
  })

  const ogDataOnly = {
    from: sender?.plain ?? '',
    native: rawData?.token.native,
    tokenIcon: image || `${HOME_URL}/assets/coin.png`,
    to: receiver?.plain ?? ('' as string | string[]),
    symbol: rawData?.token.symbol,
    amount: mochiUtils.formatTokenDigit({
      value: utils.formatUnits(
        rawData?.amount ?? 0,
        rawData?.token.decimal ?? 0,
      ),
      scientificFormat: true,
    }),
    usd_amount: mochiUtils.formatUsdDigit(rawData.usd_amount),
    short_date: '',
    full_date: '',
    external_id: rawData.external_id,
    moniker: rawData.metadata.moniker || '',
    original_amount: rawData.metadata.original_amount || '',
    template,
    success,
  }

  const data = {
    ...ogDataOnly,
    template,
  }

  if (isMultipleReceivers) {
    const promises = await Promise.allSettled(
      rawData.other_profiles.map(async (p: any) => {
        const [profile] = await UI.resolve(Platform.Web, p.id)
        return profile?.plain ?? ''
      }),
    )

    data.to = promises
      .map((p) => (p.status === 'fulfilled' ? p.value : ''))
      .filter(Boolean)
  }

  if (rawData) {
    data.short_date = format(new Date(rawData?.created_at), 'MMM do, yyyy')
    data.full_date = format(new Date(rawData?.created_at), 'dd/MM/yyyy hh:mmaa')
  }

  const amountSymbol = data.amount
  const amountDisplay = rawData.metadata.moniker
    ? rawData.metadata.original_amount
    : amountSymbol
  const unitCurrency = rawData.metadata.moniker
    ? rawData.metadata.moniker
    : rawData.token.symbol
  const amountApproxMoniker = rawData.metadata.moniker
    ? `${amountSymbol} ${rawData.token.symbol}`
    : ``
  const amountSection = rawData.metadata.moniker
    ? `${amountDisplay} ${rawData.metadata.moniker}`
    : `${amountDisplay} ${rawData.token.symbol}`
  const unitAmountSection = rawData.metadata.moniker
    ? `(${amountSymbol} ${rawData.token.symbol})`
    : null
  const isLongNumber = amountDisplay.length >= 12

  const amountUsd = mochiUtils.formatUsdDigit(rawData.usd_amount)

  return {
    data,
    ogDataOnly,
    platformIcon,
    senderAvatar: avatar,
    amountDisplay,
    unitCurrency,
    amountApproxMoniker,
    amountSection,
    unitAmountSection,
    isLongNumber,
    amountUsd,
    message: rawData.metadata?.message ?? '',
  }
}

export default function Receipt({ id }: Props) {
  const { data, isLoading } = useSWR(
    [`transfer/${id}`, id],
    async ([_, id]) => {
      const raw = await API.MOCHI_PAY.get(`/transfer/${id}`)
        .notFound(() => null)
        .json((r: any) => r.data)

      if (!raw) return null
      return await transformData(raw)
    },
  )

  const { isOpen: isViewFullMessage, onToggle } = useDisclosure({
    defaultIsOpen: false,
  })

  if (data === null) return <span>404 tx</span>
  if (isLoading || !data) return null

  return (
    <div className="px-4 m-auto w-full max-w-md font-sans drop-shadow-md">
      <div className="flex overflow-hidden relative flex-col gap-y-6 w-full text-center bg-white rounded receipt">
        {data.data.template ? (
          <Template
            {...data.data.template}
            platformIcon={data.platformIcon}
            avatar={data.senderAvatar}
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
            {data.data.template ? null : (
              <Avatar
                smallSrc={data.platformIcon}
                size="xl"
                src={data.senderAvatar}
              />
            )}
            <div className="mt-2 text-sm">
              <span className="font-medium">{data.data.from}</span>
              <br />
              <span className="text-xs font-light text-gray-500">
                {data.data.template ? data.data.template.phrase : 'sent'}
              </span>
            </div>
            <div className="flex justify-center items-center mt-8 font-medium">
              <div
                className={clsx('flex', {
                  'flex-col': data.isLongNumber,
                  'items-center': data.isLongNumber,
                  'items-baseline': !data.isLongNumber,
                })}
              >
                <img
                  className={clsx('mr-1 w-7 h-7', {})}
                  src={data.data.tokenIcon || coinIcon.src}
                  alt=""
                />
                <div className="text-5xl">{data.amountDisplay}</div>
                <div
                  className={clsx('flex mt-1', {
                    'items-center': data.isLongNumber,
                    'items-baseline ml-1': !data.isLongNumber,
                  })}
                >
                  <div className="text-4xl">{data.unitCurrency}</div>
                </div>
              </div>
            </div>
            <span className="text-xl">
              {data.amountApproxMoniker}{' '}
              {data.amountUsd.startsWith('<') ? '' : <>&asymp;</>}{' '}
              {data.amountUsd}
            </span>
          </div>
          {data.message && (
            <div className="flex flex-col gap-y-3">
              <span className="relative mt-3 font-normal text-center break-words">
                &ldquo;
                {isViewFullMessage
                  ? data.message
                  : truncate(data.message, 300, false)}
                &rdquo;
              </span>
              {data.message.length > 300 ? (
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
            <div className="flex relative flex-col gap-y-2 gap-x-4 py-4 font-mono">
              <div className="absolute top-0 left-0 w-full h-full scale-x-125 receipt-dashed-box" />
              <ul className="relative flex-1 px-2 space-y-2 text-xs">
                <li className="flex gap-x-3 justify-between">
                  <span className="font-normal text-current">From</span>
                  <span className="font-semibold text-current">
                    {data.data.from}
                  </span>
                </li>
                <li className="flex gap-x-3 justify-between">
                  <span className="font-normal text-current">
                    {Array.isArray(data.data.to) ? 'Recipients' : 'To'}
                  </span>
                  {Array.isArray(data.data.to) ? (
                    <div className="flex flex-col gap-y-2 items-end">
                      {data.data.to.slice(0, 3).map((n) => (
                        <span key={n} className="font-semibold text-current">
                          {n}
                        </span>
                      ))}
                      {data.data.to.slice(3).length > 0 ? (
                        <span className="text-current">
                          ...and {data.data.to.slice(3).length} other
                          {data.data.to.slice(3).length > 1 ? 's' : ''}
                        </span>
                      ) : null}
                    </div>
                  ) : (
                    <span className="font-semibold text-current">
                      {data.data.to}
                    </span>
                  )}
                </li>

                <li className="flex gap-x-3 justify-between">
                  <span className="font-normal text-current">Amount</span>
                  <span className="flex flex-col items-end text-current">
                    <span className="font-normal text-current">
                      {data.amountSection}
                    </span>
                    {data.unitAmountSection && (
                      <span className="ml-1 font-normal text-current">
                        {data.unitAmountSection}
                      </span>
                    )}
                  </span>
                </li>
              </ul>
              <ul className="relative flex-1 px-2 space-y-2 text-xs">
                <li className="flex justify-between">
                  <span className="font-normal text-current">Tx ID</span>
                  <span className="font-normal text-current">
                    {data.data.external_id}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-normal text-current">Date</span>
                  <span className="font-normal text-current">
                    {data.data.short_date}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-normal text-current">Status</span>
                  <span className="font-normal text-current">
                    {data.data.success ? 'Success' : 'Failed'}
                  </span>
                </li>
                <img
                  src={
                    data.data.success ? successStampIcon.src : failStampIcon.src
                  }
                  className={clsx(
                    'absolute right-0 top-1/2 flex-shrink-0 h-full opacity-30',
                    {
                      'scale-[2]': data.data.success,
                      '': !data.data.success,
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
              <span className="text-current">{data.data.full_date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
