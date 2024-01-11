import React from 'react'
import clsx from 'clsx'
import { Typography } from '@mochi-ui/core'

interface Props {
  children: React.ReactNode
  title: string
  right?: React.ReactNode
}

export default function DataList({
  children,
}: Omit<Props, 'listMode' | 'title' | 'right'>) {
  return <ul className="relative flex-1 space-y-2 text-xs">{children}</ul>
}

DataList.Item = function Item({
  title,
  children,
  right,
}: { title: string } & Props) {
  return (
    <li
      className={clsx('shrink-0 flex justify-between flex-1', {
        'items-start flex-col gap-y-1': !!right,
      })}
    >
      <div className="flex justify-between self-stretch">
        <Typography
          level="p7"
          fontWeight="sm"
          className="shrink-0 !text-neutral-600"
        >
          {title}
        </Typography>
        {right ? (
          <Typography level="p7" fontWeight="sm" className="!text-neutral-600">
            {right}
          </Typography>
        ) : null}
      </div>
      {typeof children === 'string' ? (
        <Typography
          level="p7"
          fontWeight="sm"
          className="shrink-0 !text-neutral-600"
        >
          {children}
        </Typography>
      ) : (
        children
      )}
    </li>
  )
}
