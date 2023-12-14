import React from 'react'
import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  listMode?: boolean
}

export default function DataList({ children }: Omit<Props, 'listMode'>) {
  return <ul className="relative flex-1 space-y-2 text-xs">{children}</ul>
}

DataList.Item = function Item({
  title,
  listMode = false,
  children,
}: { title: string } & Props) {
  return (
    <li
      className={clsx('flex gap-x-3 justify-between font-thin', {
        'items-start flex-col gap-y-2': listMode,
      })}
    >
      <span className="text-current">{title}</span>
      {typeof children === 'string' ? (
        <span className="text-current">{children}</span>
      ) : (
        children
      )}
    </li>
  )
}
