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
      <div className="flex flex-col gap-5 md:grid md:grid-cols-3 md:auto-rows-auto">
        {data.map((d) => {
          return (
            <div key={d.id} className="flex flex-col p-4 md:p-6">
              <div className="flex flex-row gap-x-3 items-center md:flex-col md:items-start">
                {d.icon}
                <span className="text-lg font-medium md:mt-5 text-neutral-900 md:text-[22px]">
                  {d.title}
                </span>
              </div>
              <span className="mt-3 text-base font-thin md:mt-1 text-neutral-700 line-clamp-4">
                {d.body}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
