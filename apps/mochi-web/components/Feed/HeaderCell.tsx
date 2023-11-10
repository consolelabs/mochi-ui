import React from 'react'
import clsx from 'clsx'

export default function HeaderCell({
  width,
  children,
  style,
}: {
  style?: object
  width: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={clsx(
        'flex-shrink-0 whitespace-nowrap border-feed-border py-3 px-4 font-medium leading-3 uppercase border-b text-[11px] text-neutral-600',
        width,
      )}
      style={style}
    >
      {children}
    </div>
  )
}
