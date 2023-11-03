import {
  Heading,
  IconMagnifier,
  InputField,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@consolelabs/ui-components'
import React, { useState } from 'react'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Tab } from '@headlessui/react'
import { sectionFormatter } from '../TokenPicker/utils'
import { Theme, ThemeList } from './data'

interface ThemePickerProps {
  value?: Theme
  onChange: (t: Theme) => void
}

export default function ThemePicker({ value, onChange }: ThemePickerProps) {
  const [, setThemeSearch] = useState('')
  const { isOpen: isOpenTheme, onToggle: toggleThemePopover } = useDisclosure()

  function onThemeSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setThemeSearch(e.target.value)
  }
  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-x-2">
      <div className="overflow-hidden relative rounded-lg">
        <img
          src={value?.src || '/tip-theme-new-year.jpg'}
          className="object-cover w-full h-full"
          alt=""
        />
        {!value && (
          <span className="absolute top-1/2 left-1/2 text-xs font-medium whitespace-nowrap -translate-x-1/2 -translate-y-1/2 text-white-pure">
            New Year
          </span>
        )}
      </div>
      <div className="overflow-hidden relative">
        <img
          src="/tip-theme-christmas.jpg"
          className="object-cover w-full h-full"
          alt=""
        />
        <span className="absolute top-1/2 left-1/2 text-xs font-medium whitespace-nowrap -translate-x-1/2 -translate-y-1/2 text-white-pure">
          Christmas
        </span>
      </div>
      <div className="overflow-hidden relative">
        <img
          src="/tip-theme-hpbd.jpg"
          className="object-cover w-full h-full"
          alt=""
        />
        <span className="absolute top-1/2 left-1/2 text-xs font-medium whitespace-nowrap -translate-x-1/2 -translate-y-1/2 text-white-pure">
          Birthday
        </span>
      </div>
      <Popover open={isOpenTheme} onOpenChange={toggleThemePopover}>
        <PopoverTrigger>
          <div className="overflow-hidden relative">
            <img
              src="/tip-theme-more.jpg"
              className="object-cover w-full h-full"
              alt=""
            />
            <span className="absolute top-1/2 left-1/2 text-xs font-medium whitespace-nowrap -translate-x-1/2 -translate-y-1/2 text-white-pure">
              +More
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="flex flex-col gap-y-2 items-center rounded-lg shadow-md w-[414px] max-h-[500px] bg-white-pure"
        >
          <InputField
            className="w-full"
            placeholder="Search"
            startAdornment={
              <IconMagnifier className="pl-2 w-5 h-5 text-gray-500" />
            }
            onChange={onThemeSearchChange}
          />
          <Tab.Group>
            <Tab.List className="flex overflow-x-auto gap-6 w-full">
              {sectionFormatter(ThemeList, 'group').map((tab) => (
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
            <Tab.Panels className="w-full">
              {sectionFormatter(ThemeList, 'group').map((t) => {
                return (
                  <Tab.Panel
                    key={`theme-panel-${t.title}`}
                    className="grid grid-cols-2 gap-4 p-4 auto-row-auto"
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
                          >
                            <img
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
  )
}
