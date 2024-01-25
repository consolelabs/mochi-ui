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
  className = '',
}: Omit<Props, 'listMode' | 'title' | 'right'> & { className?: string }) {
  return (
    <ul
      className={clsx(
        'relative flex-1 self-stretch space-y-2 text-xs',
        className,
      )}
    >
      {children}
    </ul>
  )
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
          level="p6"
          fontWeight="sm"
          className="shrink-0"
          color="textSecondary"
        >
          {title}
        </Typography>
        {right ? (
          <Typography color="textSecondary" level="p6" fontWeight="sm">
            {right}
          </Typography>
        ) : null}
      </div>
      {typeof children === 'string' ? (
        <Typography
          level="p6"
          fontWeight="sm"
          color="textSecondary"
          className="shrink-0"
        >
          {children}
        </Typography>
      ) : (
        children
      )}
    </li>
  )
}
