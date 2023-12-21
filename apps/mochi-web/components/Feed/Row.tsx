/* eslint-disable react/jsx-key */
import { ArrowRightLine } from '@mochi-ui/icons'
import { Avatar, AvatarSmallImage, Badge } from '@mochi-ui/core'
import React from 'react'
import { Tx } from './store'
import RowCell from './RowCell'

export default function Row({ tx, colWidth }: { tx: Tx; colWidth: string[] }) {
  return [
    <RowCell className="flex gap-x-2 items-center" width="">
      <Avatar src={tx.fromAvatar} fallback={tx.from} size="sm">
        <AvatarSmallImage src={tx.platformIcon} />
      </Avatar>
      <div className="flex flex-col justify-between min-w-0">
        <span className="text-sm leading-5 break-words truncate text-white-pure">
          {tx.from}
        </span>
      </div>
    </RowCell>,
    <RowCell className="justify-center items-center" width="">
      <div className="p-1 w-5 h-5 rounded-full border border-blue-700 text-white-pure bg-primary-700/25">
        <ArrowRightLine className="w-full h-full scale-125" />
      </div>
    </RowCell>,
    <RowCell className="flex gap-x-2 items-center" width="">
      <Avatar src={tx.toAvatar} fallback={tx.to} size="sm">
        <AvatarSmallImage src={tx.toPlatformIcon} />
      </Avatar>
      <div className="flex flex-col justify-between min-w-0">
        <span className="text-sm leading-5 break-words truncate text-white-pure">
          {tx.to}
        </span>
      </div>
    </RowCell>,
    /** <RowCell className="items-center" width="">
      <Badge
        className="capitalize !bg-neutral-800 text-white-pure"
        label={tx.action}
        appearance="black"
      />
    </RowCell> */
    <RowCell className="gap-x-2 items-center" width="">
      <Avatar src={tx.token.icon} size="sm" />
      <span className="text-sm font-normal leading-5 text-white-pure">
        {tx.amount} {tx.token.symbol}
      </span>
    </RowCell>,
    <RowCell className="items-center" width="">
      <Badge
        className="max-w-full !bg-neutral-800 text-white-pure"
        icon={
          typeof tx.where.avatar === 'string' ? (
            <Avatar src={tx.where.avatar} size="xs" />
          ) : (
            <div className="flex justify-center items-center w-4 h-4 rounded-full text-neutral-800 bg-white-pure">
              <tx.where.avatar />
            </div>
          )
        }
        iconClassName="-ml-0.5"
        label={<span className="w-full truncate">{tx.where.text}</span>}
        appearance="black"
      />
    </RowCell>,
    <RowCell className="items-center" width="">
      <span className="text-sm font-normal leading-5 text-white-pure">
        {tx.code.slice(0, 9)}
      </span>
    </RowCell>,
    <RowCell className="items-center" width="">
      <span className="text-sm font-normal leading-5 text-white-pure">
        {tx.date}
      </span>
    </RowCell>,
    <RowCell className="items-center" width="">
      <Badge
        className={
          tx.isSuccess
            ? '!bg-[#088752]/[.15] !text-[#34C77B]'
            : '!bg-[#E02D3C]/[.15] !text-[#EB5757]'
        }
        appearance={tx.isSuccess ? 'success' : 'danger'}
        label={tx.isSuccess ? 'Success' : 'Failed'}
      />
    </RowCell>,
  ].map((rowCell, i) =>
    React.cloneElement(rowCell, {
      width: colWidth[i],
      key: `row-cell-${i}`,
    }),
  )
}
