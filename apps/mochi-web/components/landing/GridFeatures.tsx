import React from 'react'
import clsx from 'clsx'
import { Typography } from '@mochi-ui/core'

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
    <div className={clsx('flex flex-col gap-y-7 landing-container', className)}>
      {typeof title === 'string' ? (
        <Typography
          fontWeight="lg"
          color="textPrimary"
          className="text-2xl md:text-3xl title-tracking"
        >
          {title}
        </Typography>
      ) : (
        title
      )}
      <div className="flex flex-col gap-9 py-4 md:grid md:grid-cols-3 md:auto-rows-auto md:gap-11 md:py-6">
        {data.map((d) => {
          return (
            <div key={d.id} className="flex flex-col">
              <div className="flex flex-row gap-x-3 items-center md:flex-col md:items-start">
                {d.icon}
                <span className="text-xl font-semibold md:mt-5 text-text-primary">
                  {d.title}
                </span>
              </div>
              <span className="mt-3 text-base font-normal md:mt-1 text-text-primary line-clamp-4">
                {d.body}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
