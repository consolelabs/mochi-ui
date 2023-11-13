import { IconArrowRight } from '@consolelabs/icons'
import { Avatar, Badge } from '@consolelabs/core'
import React from 'react'
import { Tx } from './store'
import RowCell from './RowCell'

export default function Row({ tx, colWidth }: { tx: Tx; colWidth: string[] }) {
  return (
    <>
      <RowCell className="gap-x-2" width={colWidth[0]}>
        <Avatar
          smallSrc={tx.platformIcon}
          src={tx.fromAvatar}
          fallback={tx.from}
        />
        <div className="flex flex-col justify-between min-w-0">
          <span className="text-sm leading-5 break-words truncate text-white-pure">
            {tx.from}
          </span>
          <span className="text-xs font-normal capitalize text-neutral-600">
            {tx.sourcePlatform}
          </span>
        </div>
      </RowCell>
      <RowCell width={colWidth[1]} className="justify-center items-center">
        <div className="p-1 w-5 h-5 rounded-full border border-blue-700 text-white-pure bg-primary-700/25">
          <IconArrowRight className="w-full h-full scale-125" />
        </div>
      </RowCell>
      <RowCell className="gap-x-2" width={colWidth[2]}>
        <Avatar
          smallSrc={tx.toPlatformIcon}
          src={tx.toAvatar}
          fallback={tx.to}
        />
        <div className="flex flex-col justify-between min-w-0">
          <span className="text-sm leading-5 break-words truncate text-white-pure">
            {tx.to}
          </span>
        </div>
      </RowCell>
      <RowCell className="items-center" width={colWidth[3]}>
        <Badge
          className="bg-neutral-800 text-white-pure"
          label="Transfer"
          appearance="black"
        />
      </RowCell>
      <RowCell className="gap-x-2 items-center" width={colWidth[4]}>
        <Avatar src={tx.token.icon} size="sm" />
        <span className="text-sm font-normal leading-5 text-white-pure">
          {tx.amount} {tx.token.symbol}
        </span>
      </RowCell>
      <RowCell className="items-center" width={colWidth[5]}>
        <Badge
          className="max-w-full bg-neutral-800 text-white-pure"
          icon={<Avatar src="TODO" size="xs" />}
          iconClassName="-ml-0.5"
          label={<span className="w-full truncate">{tx.channel}</span>}
          appearance="black"
        />
      </RowCell>
      <RowCell className="items-center" width={colWidth[6]}>
        <span className="text-sm font-normal leading-5 text-white-pure">
          {tx.code.slice(0, 9)}
        </span>
      </RowCell>
      <RowCell className="items-center" width={colWidth[7]}>
        <span className="text-sm font-normal leading-5 text-white-pure">
          {tx.date}
        </span>
      </RowCell>
      <RowCell className="items-center" width={colWidth[8]}>
        <Badge
          className={
            tx.isSuccess
              ? '!bg-[#088752]/[.15] !text-[#34C77B]'
              : '!bg-[#E02D3C]/[.15] !text-[#EB5757]'
          }
          appearance={tx.isSuccess ? 'success' : 'danger'}
          label={tx.isSuccess ? 'Success' : 'Failed'}
        />
      </RowCell>
    </>
  )
}
