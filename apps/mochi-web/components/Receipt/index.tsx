import { ArrowTopRightLine, CornerBottomLeftLine } from '@mochi-ui/icons'
import Image from 'next/image'
import useSWR from 'swr'
import { API } from '~constants/api'
import { coinIcon } from '~utils/image'
import { Avatar } from '@mochi-ui/core'
import clsx from 'clsx'
import { truncate } from '@dwarvesf/react-utils'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { HOME_URL } from '~envs'
import DataList from './DataList'
import Header from './Header'
import Buttons from './Buttons'

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

  return (
    <div className="flex flex-col flex-1 gap-y-7 m-auto w-full max-w-md">
      <div className="px-4 font-sans drop-shadow-md">
        <div className="flex overflow-hidden relative flex-col gap-y-6 w-full text-center bg-white rounded receipt">
          <Header
            template={data.data.template}
            platformIcon={data.platformIcon}
            senderAvatar={data.senderAvatar}
          />
          <div className="flex flex-col gap-y-12 py-3 px-4 pb-6 md:px-6">
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
                <span className="text-xs font-light text-neutral-500">
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
            <div className="relative text-neutral-600" id="receipt-body">
              <div className="flex overflow-hidden relative flex-col gap-y-2 gap-x-4 py-4 font-mono">
                <div className="absolute top-0 left-0 w-full h-full scale-x-105 receipt-dashed-box" />
                <DataList>
                  <DataList.Item title="Issued by">
                    <span className="underline">{data.data.from}</span>
                  </DataList.Item>
                  <DataList.Item listMode title="Recipients">
                    {Array.isArray(data.data.to) ? (
                      <div className="flex flex-col gap-y-1 items-start mt-0.5 whitespace-nowrap">
                        {data.data.to.map((n: any) => (
                          <div
                            key={n}
                            className="flex gap-x-1 items-center text-current"
                          >
                            <CornerBottomLeftLine className="w-3 h-3 text-neutral-500" />
                            <a href="TODO" className="underline">
                              {n}
                            </a>
                            <ArrowTopRightLine className="w-4 h-4" />
                            <span className="text-neutral-500">for</span>
                            <Image
                              width={12}
                              height={12}
                              src={data.data.tokenIcon || coinIcon.src}
                              alt=""
                              className="object-contain"
                            />
                            <span>
                              {data.amountDisplay}
                              {data.unitAmountSection && (
                                <span className="ml-1 text-current">
                                  {data.unitAmountSection}
                                </span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-current">{data.data.to}</span>
                    )}
                  </DataList.Item>
                </DataList>
              </div>
              <div className="flex flex-col gap-y-2 gap-x-4 py-4 font-mono">
                <DataList>
                  <DataList.Item title="Amount">
                    <span className="text-current">{data.amountSection}</span>
                    {data.unitAmountSection && (
                      <span className="ml-1 text-current">
                        {data.unitAmountSection}
                      </span>
                    )}
                  </DataList.Item>
                  <div className="pt-5 w-full h-0" />
                  <DataList.Item title="Tx ID">
                    {data.data.external_id}
                  </DataList.Item>
                  <DataList.Item title="Date">
                    {data.data.short_date}
                  </DataList.Item>
                  <DataList.Item title="Status">
                    {data.data.success ? 'Success' : 'Failed'}
                  </DataList.Item>
                </DataList>
              </div>
              <div className="flex overflow-hidden relative justify-between py-4 text-xs font-light">
                <div className="absolute top-0 left-0 w-full h-full origin-top scale-x-105 scale-y-105 receipt-dashed-box" />
                <span className="text-current">Mochi &copy; 2023</span>
                <span className="text-current">{data.data.full_date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Buttons shareLink={`${HOME_URL}/tx/${data.data.external_id}`} />
    </div>
  )
}
