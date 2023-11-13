import React from 'react'
import clsx from 'clsx'
import RowCell from './RowCell'

export default function RowSkeleton({ colWidth }: { colWidth: string[] }) {
  return (
    <>
      {Array(colWidth.length)
        .fill(0)
        .map((_, i) => {
          return (
            <RowCell key={`row-skeleton-${i}`} width={colWidth[i]}>
              <div
                className={clsx('flex-1 h-10 rounded', {
                  'animate-pulse bg-neutral-800': i !== 1,
                  'w-5': i === 1,
                })}
              />
            </RowCell>
          )
        })}
    </>
  )
}
