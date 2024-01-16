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
  transactionActionString,
} from '~constants/transactions'
import Amount from '~cpn/Amount'
import DashLine from '~cpn/DashLine'
import { robotoFont } from '~utils/next-font'
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
  id,
  data: _data,
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
          className="!bg-[#088752]/[.15] !text-[#34C77B]"
          appearance="success"
        >
          Success
        </Badge>
      )
    }
    if (data?.data.isFail) {
      return (
        <Badge
          className="!bg-[#E02D3C]/[.15] !text-[#EB5757]"
          appearance="danger"
        >
          Failed
        </Badge>
      )
    }
    return (
      <Badge appearance="black" className="capitalize">
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
      <style jsx global>{`
        .receipt-body {
          font-family: ${robotoFont.style.fontFamily};
        }
      `}</style>
      <div className="font-sans drop-shadow-xl">
        <div className="flex overflow-hidden relative flex-col gap-y-6 w-full text-center rounded bg-white-pure jagged-bottom">
          {variant === 'default' && (
            <Header
              template={data.data.template}
              platformIcon={data.platformIcon}
              senderAvatar={data.senderAvatar}
              code={data.data.external_id}
            />
          )}
          <div
            className={clsx('py-3 px-4 pb-6 md:px-6 !text-neutral-600', {
              'flex flex-col gap-y-12': variant === 'default',
              'flex gap-x-12 ': variant === 'peeking',
            })}
          >
            <div className="flex-1 flex flex-col gap-y-12">
              <div className="flex relative flex-col items-center">
                {data.data.template ? null : (
                  <Avatar
                    smallSrc={data.platformIcon}
                    size="3xl"
                    src={data.senderAvatar}
                  />
                )}
                <div className="mt-2 text-sm">
                  <span className="font-medium">{data.data.from[0].name}</span>
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
                  className="mt-8"
                  isMultipleTokens={data.isMultipleTokens}
                />
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
            </div>
            <div className="flex-1 relative receipt-body !text-neutral-600">
              <div className="flex flex-col gap-y-2 gap-x-4 pt-4">
                <DataList>
                  <ListUser data={data.data.from} title="Issued by" />
                  {data.data.from.length > 1 ? <DashLine /> : null}
                  <ListUser data={data.data.to} title="Recipients" />
                  {data.data.to.length > 1 ? <DashLine /> : null}
                </DataList>
              </div>
              <div className="flex flex-col gap-y-2 gap-x-4 py-2">
                <DataList>
                  <DataList.Item title="Amount">
                    <Typography
                      level="p7"
                      fontWeight="sm"
                      className="!text-neutral-600"
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
                  </DataList.Item>
                  {data.originalTxId ? (
                    <DataList.Item
                      title="Tx ID"
                      right={
                        <span className="underline text-xxs text-neutral-600">
                          {data.data.external_id.slice(0, 9)}
                        </span>
                      }
                    >
                      <div className="flex gap-x-2 self-stretch">
                        <CornerBottomLeftLine className="text-neutral-600 shrink-0" />
                        <DataList.Item title="Group Tx ID">
                          <Link
                            href={`/tx/${data.originalTxId}`}
                            className="flex items-center underline text-xxxs"
                          >
                            {data.originalTxId}
                            <LinkLine />
                          </Link>
                        </DataList.Item>
                      </div>
                    </DataList.Item>
                  ) : (
                    <DataList.Item title="Tx ID">
                      <Typography
                        level="p7"
                        className="underline !text-neutral-600"
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
              <div className="flex justify-between py-2 text-xs text-neutral-600">
                <span className="text-xxxs">
                  Mochi &copy; {new Date().getUTCFullYear()}
                </span>
                <span className="text-xxxs">
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
