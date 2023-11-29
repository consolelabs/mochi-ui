import Image from 'next/image'
import useSWR from 'swr'
import { API } from '~constants/api'
import { successStampIcon, failStampIcon, coinIcon } from '~utils/image'
import { Avatar } from '@consolelabs/core'
import clsx from 'clsx'
import { truncate } from '@dwarvesf/react-utils'
import { NativeImage } from '~cpn/NativeImage'
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
            <div className="relative -mx-6 text-gray-400">
              <div className="flex relative flex-col gap-y-2 gap-x-4 py-4 font-mono">
                <div className="absolute top-0 left-0 w-full h-full scale-x-125 receipt-dashed-box" />
                <DataList>
                  <DataList.Item title="From">{data.data.from}</DataList.Item>
                  <DataList.Item
                    title={Array.isArray(data.data.to) ? 'Recipients' : 'To'}
                  >
                    {Array.isArray(data.data.to) ? (
                      <div className="flex flex-col gap-y-2 items-end">
                        {data.data.to.slice(0, 3).map((n: any) => (
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
                  </DataList.Item>
                  <DataList.Item title="Amount">
                    <span className="font-normal text-current">
                      {data.amountSection}
                    </span>
                    {data.unitAmountSection && (
                      <span className="ml-1 font-normal text-current">
                        {data.unitAmountSection}
                      </span>
                    )}
                  </DataList.Item>
                </DataList>
                <DataList>
                  <DataList.Item title="Tx ID">
                    {data.data.external_id}
                  </DataList.Item>
                  <DataList.Item title="Date">
                    {data.data.short_date}
                  </DataList.Item>
                  <DataList.Item title="Status">
                    {data.data.success ? 'Success' : 'Failed'}
                  </DataList.Item>
                  <NativeImage
                    src={
                      data.data.success
                        ? successStampIcon.src
                        : failStampIcon.src
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
                </DataList>
              </div>
              <div className="flex justify-between px-2 mt-5 text-xs font-light">
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
