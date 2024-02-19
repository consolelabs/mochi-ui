import Image from 'next/image'
import { coinIcon } from '~utils/image'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { truncate } from '@dwarvesf/react-utils'
import { Avatar, Badge, Typography } from '@mochi-ui/core'
import { CornerBottomLeftLine, LinkLine } from '@mochi-ui/icons'
import clsx from 'clsx'
import { format } from 'date-fns'
import Link from 'next/link'
import { useMemo } from 'react'
import useSWR from 'swr'
import { API } from '~constants/api'
import {
  TransactionActionType,
  transactionActionIcon,
  transactionActionString,
} from '~constants/transactions'
import { utils } from '@consolelabs/mochi-formatter'
import Amount from '~cpn/Amount'
import DashLine from '~cpn/DashLine'
import DataList from '../DataList'
import Header from './Header'
import ListUser from './ListUser'

interface Props {
  id?: string
  // data will override and disable request fetching
  // instead the UI will use this data to render
  data?: any
  variant?: 'default' | 'peeking'
  className?: string
}

let transformData: any

export default function Receipt({
  data: _data,
  id = _data?.data?.external_id,
  variant = 'default',
  className,
}: Props) {
  const { data, isLoading } = useSWR(
    [`transfer/${id}`, id],
    async ([_, id]) => {
      if (_data) return _data
      const raw = await API.MOCHI_PAY.get(`/transfer/${id}`)
        .setTimeout(2000)
        .fetchError(() => null)
        .json((r: any) => r.data)

      if (!raw) return null
      if (!transformData) {
        ;({ transformData } = await import('./utils'))
      }
      return transformData(raw)
    },
  )

  const { isOpen: isViewFullMessage, onToggle } = useDisclosure({
    defaultIsOpen: false,
  })

  const statusComponent = useMemo(() => {
    if (data?.data.isSuccess) {
      return (
        <Badge
          className="border border-success-outline-border"
          appearance="success"
        >
          Success
        </Badge>
      )
    }
    if (data?.data.isFail) {
      return (
        <Badge
          className="border border-danger-outline-border"
          appearance="danger"
        >
          Failed
        </Badge>
      )
    }
    return (
      <Badge
        appearance="neutral"
        className="capitalize border border-neutral-outline-border"
      >
        {data?.status}
      </Badge>
    )
  }, [data?.data?.isSuccess, data?.data?.isFail, data?.status])

  if (data === null) return <span>404 tx</span>
  if (isLoading || !data) return null

  return (
    <div
      className={clsx(
        'flex-1 gap-y-7 receipt-container',
        {
          peeking: variant === 'peeking',
        },
        className,
      )}
    >
      <div
        className={clsx('relative rounded-xl', {
          'backdrop-blur-md overflow-hidden shadow-lg': variant === 'peeking',
          'drop-shadow-lg': variant !== 'peeking',
        })}
      >
        {variant === 'peeking' && (
          <div
            className="absolute top-0 left-0 w-full h-full bg-background-surface" // FIXME correct background color
            style={{ opacity: 0.85 }}
          />
        )}
        <div
          className={clsx(
            'flex relative flex-col gap-y-10 w-full text-center',
            {
              'rounded jagged-bottom bg-background-surface':
                variant !== 'peeking',
              'rounded-xl': variant === 'peeking',
            },
          )}
        >
          {variant === 'default' && (
            <Header
              template={data.data.template}
              platformIcon={data.platformIcon}
              senderAvatar={data.senderAvatar}
              code={data.data.external_id}
              title={
                transactionActionString[
                  data.data.action as keyof typeof transactionActionString
                ]
              }
              icon={
                transactionActionIcon[
                  data.data.action as keyof typeof transactionActionIcon
                ]
              }
            />
          )}
          <div
            className={clsx('px-4 md:px-6 !text-text-secondary', {
              // FIXME: coorect text color
              'flex flex-col gap-y-4 pb-10': variant === 'default',
              'flex gap-x-16 !p-8': variant === 'peeking',
            })}
          >
            <div
              className={clsx('flex flex-col gap-y-4', {
                'flex-1': variant !== 'peeking',
                'w-1/2 justify-center': variant === 'peeking',
              })}
            >
              <div className="flex relative flex-col items-center">
                {data.data.template ? null : (
                  <Avatar
                    smallSrc={data.platformIcon}
                    size="xl"
                    src={data.senderAvatar}
                  />
                )}
                <div className="mt-2 text-sm">
                  <Typography
                    level="p5"
                    color="textPrimary"
                    className="inline"
                    fontWeight="md"
                  >
                    {utils.string.formatAddressUsername(data.data.from[0].name)}
                  </Typography>
                  <br />
                  <span className="text-xs capitalize">
                    {data.data.template
                      ? data.data.template.phrase
                      : transactionActionString[
                          data.data.action as TransactionActionType
                        ] ?? 'sent'}
                  </span>
                </div>
                <Amount
                  value={
                    data.isMultipleTokens
                      ? data.data.amount
                      : data.groupAmountDisplay
                  }
                  valueUsd={data.groupAmountUsdDisplay}
                  tokenIcon={data.data.tokenIcon}
                  unit={data.unitCurrency}
                  approxMoniker={data.amountApproxMoniker}
                  className="mt-4"
                  isMultipleTokens={data.isMultipleTokens}
                />
              </div>
              {data.message && (
                <div className="flex flex-col gap-y-3">
                  <Typography
                    level="p6"
                    fontWeight="sm"
                    className="relative text-center break-words"
                  >
                    &ldquo;
                    {isViewFullMessage
                      ? data.message
                      : truncate(data.message, 300, false)}
                    &rdquo;
                  </Typography>
                  {data.message.length > 300 ? (
                    <button
                      className="font-normal underline text-text-tertiary"
                      onClick={onToggle}
                    >
                      {isViewFullMessage ? 'view less' : 'view more'}
                    </button>
                  ) : null}
                </div>
              )}
            </div>
            <div
              className={clsx('relative font-mono !text-text-secondary', {
                'flex-1': variant !== 'peeking',
                'w-1/2 flex flex-col justify-center': variant === 'peeking',
              })}
            >
              {variant !== 'peeking' && <DashLine />}
              <div
                className={clsx('flex flex-col gap-y-2 gap-x-4', {
                  'pt-4': variant !== 'peeking',
                })}
              >
                <DataList>
                  <ListUser
                    isPeeking={variant === 'peeking'}
                    data={data.data.from}
                    title="Issued by"
                  />
                  {data.data.from.length > 1 ? <DashLine /> : null}
                  <ListUser
                    isPeeking={variant === 'peeking'}
                    data={data.data.to}
                    title="Recipients"
                  />
                  {data.data.to.length > 1 ? <DashLine /> : null}
                </DataList>
              </div>
              <div className="flex flex-col gap-y-2 gap-x-4 py-2">
                <DataList>
                  <DataList.Item title="Amount">
                    <div className="flex gap-x-1 items-center">
                      <Image
                        width={12}
                        height={12}
                        src={data.data.tokenIcon || coinIcon.src}
                        alt=""
                        className="object-contain"
                      />
                      <Typography
                        level="p6"
                        fontWeight="sm"
                        className="!text-text-secondary"
                      >
                        {data.isMultipleTokens
                          ? data.data.amount
                          : data.groupAmountDisplay}{' '}
                        {data.unitCurrency}
                      </Typography>
                      {data.unitAmountSection && (
                        <span className="ml-1 text-current">
                          {data.unitAmountSection}
                        </span>
                      )}
                    </div>
                  </DataList.Item>
                  {data.originalTxId ? (
                    <DataList.Item
                      title="Tx ID"
                      right={
                        <span className="underline text-xxs text-text-secondary">
                          {data.data.external_id.slice(0, 9)}
                        </span>
                      }
                    >
                      <DataList>
                        <div className="flex gap-x-2 self-stretch">
                          <CornerBottomLeftLine className="text-text-secondary shrink-0" />
                          <DataList.Item title="Group Tx ID">
                            <Link
                              href={`/tx/${data.originalTxId}`}
                              className="flex items-center text-xs underline"
                            >
                              {data.originalTxId}
                              <LinkLine />
                            </Link>
                          </DataList.Item>
                        </div>
                      </DataList>
                    </DataList.Item>
                  ) : (
                    <DataList.Item title="Tx ID">
                      <Typography
                        level="p6"
                        className="underline !text-text-secondary"
                        fontWeight="sm"
                      >
                        {data.data.external_id.slice(0, 9)}
                      </Typography>
                    </DataList.Item>
                  )}
                  <DataList.Item title="Date">
                    {format(new Date(data.data.short_date), 'MMM do, yyyy')}
                  </DataList.Item>
                  <DataList.Item title="Status">
                    {statusComponent}
                  </DataList.Item>
                </DataList>
              </div>
              <DashLine />
              <div className="flex justify-between pt-2 text-xs text-text-secondary">
                <span className="text-xs">
                  Mochi &copy; {new Date().getUTCFullYear()}
                </span>
                <span className="text-xs">
                  {format(new Date(data.data.full_date), 'dd/MM/yyyy hh:mmaa')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
