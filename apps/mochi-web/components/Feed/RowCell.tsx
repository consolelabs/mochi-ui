import React from 'react'
import clsx from 'clsx'

export default function RowCell({
  children,
  style,
  width,
  className = '',
}: {
  width: string
  style?: object
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      style={style}
      className={clsx(
        'flex-shrink-0 border-feed-border whitespace-nowrap border-b flex p-4 min-w-0',
        width,
        className,
      )}
    >
      {children}
    </div>
  )
}
