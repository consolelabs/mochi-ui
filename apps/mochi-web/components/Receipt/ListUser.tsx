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
}

export default function ListUser({ data, title }: Props) {
  return (
    <DataList.Item right={data.length > 1 && <>&#8203;</>} title={title}>
      {data.length > 1 ? (
        <div className="flex flex-col gap-y-1 items-start whitespace-nowrap !text-neutral-600">
          {data.map((n: any) => (
            <div
              key={n.name}
              className="flex gap-x-1 items-center text-current"
            >
              <CornerBottomLeftLine className="w-3 h-3 text-neutral-500" />
              <Link
                href={n.url}
                className="underline text-xxxs text-neutral-600"
              >
                {n.name}
              </Link>
              <ArrowTopRightLine className="w-4 h-4" />
              <span className="text-neutral-500">for</span>
              <Image
                width={12}
                height={12}
                src={n.tokenIcon || coinIcon.src}
                alt=""
                className="object-contain"
              />
              <span>
                {n.amountDisplay} ({n.amountUsd})
                {n.unitAmountSection && (
                  <span className="ml-1 text-current">
                    {n.unitAmountSection}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <Link
          href={data[0].url}
          className="flex gap-x-1 items-center text-current underline text-xxxs"
        >
          {data[0].name}
          <LinkLine />
        </Link>
      )}
    </DataList.Item>
  )
}
