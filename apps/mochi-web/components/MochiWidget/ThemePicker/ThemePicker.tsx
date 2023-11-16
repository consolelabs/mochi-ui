import Image from 'next/image'
import useSWR from 'swr'
import clsx from 'clsx'
import { api } from '~constants/mochi'
import {
  Heading,
  InputField,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@consolelabs/core'
import { IconMagnifier } from '@consolelabs/icons'
import React, { useState } from 'react'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Tab } from '@headlessui/react'
import { sectionFormatter } from '../TokenPicker/utils'

export interface Theme {
  id: number
  src: string
  group: string
  name: string
}

interface ThemePickerProps {
  value?: Theme
  onChange: (t: Theme) => void
}

export default function ThemePicker({ value, onChange }: ThemePickerProps) {
  const { data: themes = [] } = useSWR<Theme[]>(
    ['tip-widget-themes'],
    async () => {
      const { data, error, ok } = await api.base.metadata.getThemes()
      if (!ok || error) return []

      const startOfZodiac = data.findIndex((d) =>
        d.name.toLowerCase().includes('aries'),
      )
      return [
        ...data
          .slice(0, startOfZodiac)
          .map((d) => ({ id: d.id, name: d.name, src: d.image, group: 'TBD' })),
        ...data.slice(startOfZodiac).map((d) => ({
          id: d.id,
          name: d.name,
          src: d.image,
          group: 'Zodiac signs',
        })),
      ]
    },
  )

  const [themeSearch, setThemeSearch] = useState('')
  const {
    isOpen: isOpenTheme,
    onClose: closeThemePopover,
    onToggle: toggleThemePopover,
  } = useDisclosure()

  function onThemeSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setThemeSearch(e.target.value)
  }

  return (
    <div className="flex flex-col gap-y-1">
      <span className="text-sm text-[#343433] font-medium">Select theme</span>
      <div className="grid grid-cols-4 grid-rows-1 gap-x-2 h-20">
        {themes.slice(0, 3).map((t, i) => {
          const selectedIndex = themes.findIndex(
            (theme) => theme.id === value?.id,
          )
          const isSelected =
            (selectedIndex > 2 && i === 0) ||
            (selectedIndex <= 2 && selectedIndex === i)

          return (
            <button
              key={t.name}
              type="button"
              className="overflow-hidden relative rounded-lg"
              onClick={() => {
                onChange(t)
                closeThemePopover()
              }}
            >
              <Image
                fill
                alt={t.name}
                src={isSelected && value?.src ? value?.src : t.src}
                className={clsx('object-cover w-full h-full', {
                  'brightness-50': !isSelected,
                })}
              />
              {!isSelected && (
                <span className="absolute top-1/2 left-1/2 px-2 text-xs font-medium -translate-x-1/2 -translate-y-1/2 text-white-pure">
                  {t.name}
                </span>
              )}
            </button>
          )
        })}
        <Popover open={isOpenTheme} onOpenChange={toggleThemePopover}>
          <PopoverTrigger asChild>
            <button className="overflow-hidden relative">
              <Image
                fill
                src="/tip-theme-more.jpg"
                className="object-cover w-full h-full"
                alt=""
              />
              <span className="absolute top-1/2 left-1/2 text-xs font-medium whitespace-nowrap -translate-x-1/2 -translate-y-1/2 text-white-pure">
                +More
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="flex flex-col gap-y-2 items-center rounded-lg shadow-md w-[414px] max-h-[500px] bg-white-pure"
          >
            <InputField
              value={themeSearch}
              className="w-full"
              placeholder="Search"
              startAdornment={
                <IconMagnifier className="pl-2 w-5 h-5 text-gray-500" />
              }
              onChange={onThemeSearchChange}
            />
            <Tab.Group>
              <Tab.List className="flex overflow-x-auto flex-shrink-0 gap-6 w-full">
                {sectionFormatter(themes, 'group').map((tab) => (
                  <Tab
                    key={`theme-tab-${tab.title}`}
                    className="focus-visible:outline-none"
                  >
                    {({ selected }) => (
                      <Heading
                        as="h2"
                        className={`whitespace-nowrap text-sm ${
                          selected ? 'text-[#343433]' : 'text-[#848281]'
                        }`}
                      >
                        {tab.title}
                      </Heading>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="overflow-y-auto w-full">
                {sectionFormatter(
                  themes.filter((t) =>
                    t.name.toLowerCase().includes(themeSearch.toLowerCase()),
                  ),
                  'group',
                ).map((t) => {
                  return (
                    <Tab.Panel
                      key={`theme-panel-${t.title}`}
                      className="grid grid-cols-2 auto-rows-fr gap-4 p-4"
                    >
                      {t.data
                        .filter((d) => !!d.src)
                        .map((d) => {
                          return (
                            <button
                              type="button"
                              key={`theme-image-${t}`}
                              onClick={() => {
                                onChange(d)
                                toggleThemePopover()
                              }}
                              className="relative h-full aspect-video"
                            >
                              <Image
                                fill
                                alt=""
                                src={d.src}
                                className="object-cover w-full h-full rounded-lg"
                              />
                            </button>
                          )
                        })}
                    </Tab.Panel>
                  )
                })}
              </Tab.Panels>
            </Tab.Group>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
