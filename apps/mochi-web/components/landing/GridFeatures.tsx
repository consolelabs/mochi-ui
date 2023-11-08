import React from 'react'
import clsx from 'clsx'

interface Props {
  title: string
  data: {
    id: string
    icon: React.ReactNode
    title: string
    body: React.ReactNode
  }[]
  className?: string
}

export function GridFeatures({ title, data, className }: Props) {
  return (
    <div className={clsx('flex flex-col gap-y-7 landing-block', className)}>
      {typeof title === 'string' ? (
        <span className="text-2xl font-medium md:text-4xl">{title}</span>
      ) : (
        title
      )}
      <div className="grid grid-cols-3 auto-rows-auto gap-5">
        {data.map((d) => {
          return (
            <div key={d.id} className="flex flex-col p-6">
              {d.icon}
              <span className="mt-5 font-medium text-[22px] text-neutral-900">
                {d.title}
              </span>
              <span className="mt-1 text-base font-thin text-neutral-700 line-clamp-4">
                {d.body}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
