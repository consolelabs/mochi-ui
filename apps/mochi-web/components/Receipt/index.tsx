import { robotoFont } from '~utils/next-font'
import Link from 'next/link'
import { LinkLine, CornerBottomLeftLine } from '@mochi-ui/icons'
import Image from 'next/image'
import useSWR from 'swr'
import { API } from '~constants/api'
import { coinIcon } from '~utils/image'
import { Avatar, Badge, Typography } from '@mochi-ui/core'
import { format } from 'date-fns'
import clsx from 'clsx'
import { truncate } from '@dwarvesf/react-utils'
import { useDisclosure } from '@dwarvesf/react-hooks'
import DashLine from '~cpn/DashLine'
import DataList from '../DataList'
import Header from './Header'
import ListUser from './ListUser'

interface Props {
  id?: string
  // data will override and disable request fetching
  // instead the UI will use this data to render
  data?: any
}

let transformData: any

export default function Receipt({ id, data: _data }: Props) {
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

  if (data === null) return <span>404 tx</span>
  if (isLoading || !data) return null

  const isSuccess = data.data.success

  return (
    <div className="flex flex-col flex-1 gap-y-7 m-auto w-[300px] max-w-[300px]">
      <style jsx global>{`
        .receipt-body {
          font-family: ${robotoFont.style.fontFamily};
        }
      `}</style>
      <div className="font-sans drop-shadow-xl">
        <div className="flex overflow-hidden relative flex-col gap-y-6 w-full text-center rounded bg-white-pure jagged-bottom">
          <Header
            template={data.data.template}
            platformIcon={data.platformIcon}
            senderAvatar={data.senderAvatar}
            code={data.data.external_id}
          />
          <div className="flex flex-col gap-y-12 py-3 px-4 pb-6 md:px-6 !text-neutral-600">
            <div className="flex relative flex-col items-center">
              {data.data.template ? null : (
                <Avatar
                  smallSrc={data.platformIcon}
                  size="xl"
                  src={data.senderAvatar}
                />
              )}
              <div className="mt-2 text-sm">
                <span className="font-medium">
                  {Array.isArray(data.data.from)
                    ? data.data.from[0].name
                    : data.data.from}
                </span>
                <br />
                <span className="text-xs font-light">
                  {data.data.template
                    ? data.data.template.phrase
                    : data.data.action ?? 'sent'}
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
                  <Image
                    width={28}
                    height={28}
                    className="mr-1"
                    src={data.data.tokenIcon || coinIcon.src}
                    alt=""
                  />
                  <div className="text-5xl">{data.groupAmountDisplay}</div>
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
                {data.groupAmountUsdDisplay.startsWith('<') ? '' : <>&asymp;</>}{' '}
                {data.groupAmountUsdDisplay}
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
            <div className="relative receipt-body !text-neutral-600">
              <div className="flex flex-col gap-y-2 gap-x-4 pt-4 font-light">
                <DataList>
                  <ListUser
                    data={data.data.from}
                    tokenIcon={data.data.tokenIcon}
                    amountDisplay={data.amountDisplay}
                    amountUsd={data.amountUsd}
                    unitAmountSection={data.unitAmountSection}
                    title="Issued by"
                  />
                  {Array.isArray(data.data.from) ? <DashLine /> : null}
                  <ListUser
                    data={data.data.to}
                    tokenIcon={data.data.tokenIcon}
                    amountDisplay={data.amountDisplay}
                    amountUsd={data.amountUsd}
                    unitAmountSection={data.unitAmountSection}
                    title="Recipients"
                  />
                  {Array.isArray(data.data.to) ? <DashLine /> : null}
                </DataList>
              </div>
              <div className="flex flex-col gap-y-2 gap-x-4 py-2">
                <DataList>
                  <DataList.Item title="Amount">
                    <Typography
                      level="p7"
                      className="!font-light !text-neutral-600"
                    >
                      {data.groupAmountDisplay} {data.unitCurrency}
                    </Typography>
                    {data.unitAmountSection && (
                      <span className="ml-1 text-current">
                        {data.unitAmountSection}
                      </span>
                    )}
                  </DataList.Item>
                  <div className="pt-3 w-full h-0" />
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
                        <CornerBottomLeftLine className="text-neutral-600" />
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
                        className="underline !text-neutral-600 !font-light"
                      >
                        {data.data.external_id.slice(0, 9)}
                      </Typography>
                    </DataList.Item>
                  )}
                  <DataList.Item title="Date">
                    {format(new Date(data.data.short_date), 'MMM do, yyyy')}
                  </DataList.Item>
                  <DataList.Item title="Status">
                    {isSuccess ? (
                      <Badge
                        className={
                          isSuccess
                            ? '!bg-[#088752]/[.15] !text-[#34C77B]'
                            : '!bg-[#E02D3C]/[.15] !text-[#EB5757]'
                        }
                        appearance={isSuccess ? 'success' : 'danger'}
                      >
                        {isSuccess ? 'Success' : 'Failed'}
                      </Badge>
                    ) : (
                      <Typography
                        level="p7"
                        color="textSecondary"
                        fontWeight="sm"
                        className="capitalize"
                      >
                        {data.status}
                      </Typography>
                    )}
                  </DataList.Item>
                </DataList>
              </div>
              <DashLine />
              <div className="flex justify-between py-2 text-xs font-light text-neutral-600">
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
