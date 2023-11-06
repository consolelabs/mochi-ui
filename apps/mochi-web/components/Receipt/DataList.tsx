import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function DataList({ children }: Props) {
  return <ul className="relative flex-1 px-2 space-y-2 text-xs">{children}</ul>
}

DataList.Item = function Item({ title, children }: { title: string } & Props) {
  return (
    <li className="flex gap-x-3 justify-between">
      <span className="font-normal text-current">{title}</span>
      {typeof children === 'string' ? (
        <span className="font-semibold text-current">{children}</span>
      ) : (
        children
      )}
    </li>
  )
}
