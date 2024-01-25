import Image from 'next/image'
import React, { useState } from 'react'
import clsx from 'clsx'
import { Typography } from '@mochi-ui/core'

interface Props {
  title: string
  data: { id: string; title: string; body: React.ReactNode; image: string }[]
  className?: string
}

export function TabbedFeatures({ title, data, className }: Props) {
  const [idx, setIdx] = useState(0)

  return (
    <div className={clsx('flex flex-col gap-y-7 landing-container', className)}>
      {typeof title === 'string' ? (
        <Typography
          fontWeight="lg"
          color="textPrimary"
          className="!text-3xl title-tracking"
        >
          {title}
        </Typography>
      ) : (
        title
      )}
      <div className="flex gap-x-5">
        <ul className="flex flex-col flex-1 gap-y-2">
          {data.map((d, i) => {
            return (
              <React.Fragment key={d.id}>
                <li>
                  <button
                    className={clsx(
                      'text-left flex flex-col py-4 px-0 sm:p-4 md:p-6 rounded-2xl transition md:border pointer-events-none md:pointer-events-auto',
                      {
                        'md:border-primary-outline-border md:bg-primary-outline-hover':
                          i === idx,
                        'md:border-transparent md:hover:bg-background-level2':
                          i !== idx,
                      },
                    )}
                    type="button"
                    onClick={() => setIdx(i)}
                  >
                    <span className="text-xl font-semibold md:leading-7 text-text-primary">
                      {d.title}
                    </span>
                    <span className="mt-2 text-sm font-normal md:text-base md:leading-6 text-text-secondary">
                      {d.body}
                    </span>
                  </button>
                </li>
                {i !== data.length - 1 && (
                  <div className="mx-0 h-px sm:mx-4 bg-background-level2" />
                )}
              </React.Fragment>
            )
          })}
        </ul>
        <div className="hidden relative flex-1 md:block">
          <Image className="object-contain" fill alt="" src={data[idx].image} />
        </div>
      </div>
    </div>
  )
}
