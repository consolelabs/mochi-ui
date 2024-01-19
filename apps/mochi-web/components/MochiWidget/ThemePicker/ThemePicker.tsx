import Image from 'next/image'
import useSWR from 'swr'
import clsx from 'clsx'
import { api } from '~constants/mochi'
import {
  TextFieldRoot,
  TextFieldInput,
  TextFieldDecorator,
  Tabs,
  TabList,
  TabTrigger,
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
  ScrollAreaViewport,
  Typography,
} from '@mochi-ui/core'
import {
  StarsSolid,
  ShapesSolid,
  CrossCircleOutlined,
  MagnifierLine,
} from '@mochi-ui/icons'
import React, { useEffect, useMemo, useState } from 'react'
import { useDisclosure } from '@dwarvesf/react-hooks'
/* import { Tab } from '@headlessui/react' */
import { BottomSheet } from '~cpn/BottomSheet'
import { sectionFormatter } from '../TokenPicker/utils'

export interface Theme {
  id: number
  src: string
  group: string
  name: string
}

interface ThemePickerProps {
  value?: Theme | null
  onChange: (t: Theme | null) => void
}

function getFilterThemeFunc(searchTerm: string) {
  return function filterTheme(t: Theme) {
    return t.name.toLowerCase().includes(searchTerm.toLowerCase())
  }
}

export default function ThemePicker({ value, onChange }: ThemePickerProps) {
  const [selectedTab, setSelectedTab] = useState<'common' | 'zodiac'>('common')
  const { data: themes = [] } = useSWR<Theme[]>(
    ['tip-widget-themes'],
    async () => {
      const { data, error, ok } = await api.base.metadata.getThemes()
      if (!ok || error) return []

      const startOfZodiac = data.findIndex((d) =>
        d.name.toLowerCase().includes('aries'),
      )
      return [
        ...data.slice(0, startOfZodiac).map((d) => ({
          id: d.id,
          name: d.name,
          src: d.image,
          group: 'common',
        })),
        ...data.slice(startOfZodiac).map((d) => ({
          id: d.id,
          name: d.name,
          src: d.image,
          group: 'zodiac',
        })),
      ]
    },
  )

  const [themeSearch, setThemeSearch] = useState('')
  const { isOpen, onClose, onOpen } = useDisclosure()

  function onThemeSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setThemeSearch(e.target.value)
    if (!e.target.value) {
      setSelectedTab('common')
    }
  }

  const groupByTheme = useMemo(
    () => sectionFormatter(themes, 'group'),
    [themes],
  )

  useEffect(() => {
    const firstGroupHasValueIdx = groupByTheme.findIndex(
      (g) => g.data.filter(getFilterThemeFunc(themeSearch)).length,
    )
    setSelectedTab(firstGroupHasValueIdx === 0 ? 'common' : 'zodiac')
  }, [groupByTheme, themeSearch])

  return (
    <div className="flex flex-col gap-y-1">
      <span className="text-sm font-medium text-neutral-800">
        Select theme{' '}
      </span>
      <div className="grid grid-cols-4 grid-rows-1 h-20">
        {themes.slice(0, 3).map((t, i) => {
          const selectedIndex = themes.findIndex(
            (theme) => theme.id === value?.id,
          )
          const isSelected = Boolean(
            ((selectedIndex > 2 && i === 0) ||
              (selectedIndex <= 2 && selectedIndex === i)) &&
              value?.src,
          )

          return (
            <div
              key={t.name}
              className={clsx(
                'flex-shrink-0 relative relative rounded-lg outline-none border-4',
                {
                  'border-transparent': !isSelected,
                  'border-blue-700': isSelected,
                },
              )}
            >
              <button
                type="button"
                onClick={() => {
                  onChange(isSelected ? null : t)
                }}
              >
                <Image
                  fill
                  alt={t.name}
                  src={isSelected && value?.src ? value?.src : t.src}
                  className={clsx('object-cover w-full h-full rounded', {
                    'brightness-50': !isSelected,
                  })}
                />
              </button>
              {!isSelected ? (
                <span className="absolute top-1/2 left-1/2 px-2 text-xs font-medium -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white-pure">
                  {t.name}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onChange(null)}
                  className="overflow-hidden absolute top-0 right-0 w-4 h-4 bg-gray-800 rounded-full translate-x-1/2 -translate-y-1/2 text-white-pure"
                >
                  <CrossCircleOutlined className="scale-150" />
                </button>
              )}
            </div>
          )
        })}
        <button
          type="button"
          onClick={onOpen}
          className="overflow-hidden relative rounded-lg border-4 border-transparent outline-none"
        >
          <Image
            fill
            src="/tip-theme-more.jpg"
            className="object-cover w-full h-full rounded-lg"
            alt=""
          />
          <span className="absolute top-1/2 left-1/2 text-xs font-medium whitespace-nowrap -translate-x-1/2 -translate-y-1/2 text-white-pure">
            +More
          </span>
        </button>
        <BottomSheet
          title="Choose theme"
          isOpen={isOpen}
          onClose={onClose}
          focusNthChild={0}
        >
          <div className="flex flex-col w-full min-h-0">
            <TextFieldRoot className="flex-shrink-0 mt-2">
              <TextFieldDecorator>
                <MagnifierLine className="w-5 h-5 text-gray-500" />
              </TextFieldDecorator>
              <TextFieldInput
                value={themeSearch}
                placeholder="Search"
                onChange={onThemeSearchChange}
              />
            </TextFieldRoot>
            <Tabs value={selectedTab} className="flex flex-col mt-3 min-h-0">
              <TabList className="flex -mx-3">
                <TabTrigger
                  value="common"
                  onClick={() => setSelectedTab('common')}
                  wrapperClassName="!p-0"
                  variant="solid"
                  className={clsx(
                    'flex flex-1 justify-center py-3 !px-0 rounded-none border-t border-b border-divider',
                    {
                      'bg-background-level2': selectedTab === 'common',
                    },
                  )}
                >
                  <ShapesSolid
                    className={clsx('w-5 h-5', {
                      'text-neutral-800': selectedTab === 'common',
                      'text-neutral-500': selectedTab !== 'common',
                    })}
                  />
                  <Typography
                    color={
                      selectedTab === 'common' ? 'textPrimary' : 'textSecondary'
                    }
                    className="capitalize"
                    level="p5"
                  >
                    Common
                  </Typography>
                </TabTrigger>
                <TabTrigger
                  value="zodiac"
                  onClick={() => setSelectedTab('zodiac')}
                  wrapperClassName="!p-0"
                  variant="solid"
                  className={clsx(
                    'flex flex-1 justify-center py-3 !px-0 rounded-none border-t border-b border-divider',
                    {
                      'bg-background-level2': selectedTab === 'zodiac',
                    },
                  )}
                >
                  <StarsSolid
                    className={clsx('w-5 h-5', {
                      'text-neutral-800': selectedTab === 'zodiac',
                      'text-neutral-500': selectedTab !== 'zodiac',
                    })}
                  />
                  <Typography
                    color={
                      selectedTab === 'zodiac' ? 'textPrimary' : 'textSecondary'
                    }
                    className="capitalize"
                    level="p5"
                  >
                    Zodiac signs
                  </Typography>
                </TabTrigger>
              </TabList>
              <ScrollArea className="h-[430px]">
                <ScrollAreaViewport>
                  <div className="grid grid-cols-2 auto-rows-fr gap-4 mt-4">
                    {selectedTab === 'common'
                      ? groupByTheme[0]?.data
                          .filter((d) => !!d.src)
                          .filter(getFilterThemeFunc(themeSearch))
                          .map((d) => {
                            return (
                              <button
                                type="button"
                                key={`theme-image-${d.name}-${d.id}`}
                                onClick={() => {
                                  onChange(d)
                                  onClose()
                                }}
                                className="relative h-full outline-none aspect-video"
                              >
                                <Image
                                  fill
                                  alt=""
                                  src={d.src}
                                  className="object-cover w-full h-full rounded-lg"
                                />
                              </button>
                            )
                          })
                      : groupByTheme[1]?.data
                          .filter((d) => !!d.src)
                          .filter(getFilterThemeFunc(themeSearch))
                          .map((d) => {
                            return (
                              <button
                                type="button"
                                key={`theme-image-${d.name}-${d.id}`}
                                onClick={() => {
                                  onChange(d)
                                  onClose()
                                }}
                                className="relative h-full outline-none aspect-video"
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
                  </div>
                </ScrollAreaViewport>
                <ScrollAreaScrollbar orientation="vertical" className="mt-10">
                  <ScrollAreaThumb />
                </ScrollAreaScrollbar>
                <ScrollAreaCorner className="bg-neutral-outline-hover" />
              </ScrollArea>
            </Tabs>
            {/* <Tab.Group */}
            {/*   selectedIndex={selectedIndex} */}
            {/*   onChange={setSelectedIndex} */}
            {/* > */}
            {/*   <Tab.List className="flex overflow-x-auto flex-shrink-0 gap-6 mt-2 w-full"> */}
            {/*     {groupByTheme.map((tab) => ( */}
            {/*       <Tab */}
            {/*         key={`theme-tab-${tab.title}`} */}
            {/*         className="focus-visible:outline-none" */}
            {/*       > */}
            {/*         {({ selected }) => ( */}
            {/*           <h2 */}
            {/*             className={`py-2 whitespace-nowrap text-sm */}
            {/*             ${ */}
            {/*               selected ? 'text-text-primary' : 'text-text-secondary' */}
            {/*             }`} */}
            {/*           > */}
            {/*             {tab.title} */}
            {/*           </h2> */}
            {/*         )} */}
            {/*       </Tab> */}
            {/*     ))} */}
            {/*   </Tab.List> */}
            {/*   <Tab.Panels className="overflow-y-auto w-full"> */}
            {/*     {groupByTheme.map((t) => { */}
            {/*       return ( */}
            {/*         <Tab.Panel */}
            {/*           key={`theme-panel-${t.title}`} */}
            {/*           className="grid grid-cols-2 auto-rows-fr gap-4" */}
            {/*         > */}
            {/*           {t.data */}
            {/*             .filter((d) => !!d.src) */}
            {/*             .filter(getFilterThemeFunc(themeSearch)) */}
            {/*             .map((d) => { */}
            {/*               return ( */}
            {/*                 <button */}
            {/*                   type="button" */}
            {/*                   key={`theme-image-${d.name}-${d.id}`} */}
            {/*                   onClick={() => { */}
            {/*                     onChange(d) */}
            {/*                     onClose() */}
            {/*                   }} */}
            {/*                   className="relative h-full outline-none aspect-video" */}
            {/*                 > */}
            {/*                   <Image */}
            {/*                     fill */}
            {/*                     alt="" */}
            {/*                     src={d.src} */}
            {/*                     className="object-cover w-full h-full rounded-lg" */}
            {/*                   /> */}
            {/*                 </button> */}
            {/*               ) */}
            {/*             })} */}
            {/*         </Tab.Panel> */}
            {/*       ) */}
            {/*     })} */}
            {/*   </Tab.Panels> */}
            {/* </Tab.Group> */}
          </div>
        </BottomSheet>
      </div>
    </div>
  )
}
