import React from 'react'
import { Tab as HeadlessTab } from '@headlessui/react'
import { tab } from './styles'
import clsx from 'clsx'

type Props = {
  headings: {
    label: string
    disabled?: boolean
  }[]
  children?: React.ReactNode
}

type TabGroupProps = Parameters<typeof HeadlessTab.Group>[0]

export const Tabs = ({
  children,
  headings,
  ...rest
}: Props & TabGroupProps) => {
  return (
    <div className={tab({})}>
      <HeadlessTab.Group {...rest}>
        <HeadlessTab.List className="flex gap-x-8 text-sm">
          {headings.map((h, i) => {
            return (
              <HeadlessTab
                className="outline-none"
                key={`tab-${h.label}-${i}`}
                disabled={h.disabled}
              >
                {({ selected }) => {
                  return (
                    <span
                      className={clsx(
                        'font-medium pb-1 border-b-2 transition-colors duration-100 ease-in',
                        {
                          'text-foreground border-b-foreground': selected,
                          'text-dashboard-gray-8 border-b-transparent':
                            !selected,
                          'opacity-50': h.disabled,
                        },
                      )}
                    >
                      {h.label}
                    </span>
                  )
                }}
              </HeadlessTab>
            )
          })}
        </HeadlessTab.List>
        <HeadlessTab.Panels>{children}</HeadlessTab.Panels>
      </HeadlessTab.Group>
    </div>
  )
}

Tabs.Panel = HeadlessTab.Panel
