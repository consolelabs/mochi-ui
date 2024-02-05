import clsx from 'clsx'
import { utils } from '@consolelabs/mochi-formatter'
import { Tooltip } from '@mochi-ui/core'
import {
  ArrowTopRightLine,
  CornerBottomLeftLine,
  LinkLine,
} from '@mochi-ui/icons'
import Image from 'next/image'
import Link from 'next/link'
import DataList from '~cpn/DataList'
import { coinIcon } from '~utils/image'

type Props = {
  data: {
    name: string
    url: string
    tokenIcon?: string
    amountDisplay?: string
    amountUsd?: string
    unitAmountSection?: string
  }[]
  title: string
  isPeeking: boolean
}

export default function ListUser({ data, title, isPeeking }: Props) {
  return (
    <DataList.Item right={data.length > 1 && <>&#8203;</>} title={title}>
      {data.length > 1 ? (
        <div className="flex flex-col gap-y-1 items-start whitespace-nowrap !text-neutral-600">
          {data.map((n: any, i: number) => {
            const text = (
              <div className="flex gap-x-1 items-center text-current">
                <CornerBottomLeftLine className="w-3 h-3 text-text-tertiary shrink-0" />
                <Link
                  href={n.url}
                  className={clsx('underline text-text-secondary text-xs')}
                >
                  {utils.string.formatAddressUsername(n.name)}
                </Link>
                <ArrowTopRightLine className="w-4 h-4 shrink-0" />
                <span className="text-text-tertiary">for</span>
                <Image
                  width={12}
                  height={12}
                  src={n.tokenIcon || coinIcon.src}
                  alt=""
                  className="object-contain"
                />
                <span>
                  {n.amountDisplay} ({n.amountUsd})
                  {/* {n.unitAmountSection && ( */}
                  {/*   <span className="ml-1 text-current"> */}
                  {/*     {n.unitAmountSection} */}
                  {/*   </span> */}
                  {/* )} */}
                </span>
              </div>
            )

            if (isPeeking) return text

            return (
              <Tooltip key={`${n.name}-${i}`} content={n.name}>
                {text}
              </Tooltip>
            )
          })}
        </div>
      ) : (
        <Link
          href={data[0].url}
          className={clsx(
            'flex gap-x-1 items-center text-current underline text-xs',
          )}
        >
          {isPeeking ? (
            utils.string.formatAddressUsername(data[0].name)
          ) : (
            <Tooltip content={data[0].name}>
              {utils.string.formatAddressUsername(data[0].name)}
            </Tooltip>
          )}
          <LinkLine />
        </Link>
      )}
    </DataList.Item>
  )
}
