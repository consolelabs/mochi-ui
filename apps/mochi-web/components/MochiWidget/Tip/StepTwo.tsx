import { Icon } from '@iconify/react'
import {
  Heading,
  IconChevron,
  InputField,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SectionList,
} from '@consolelabs/ui-components'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useState } from 'react'
import { MessageList, ThemeList } from './data'
import { sectionFormatter } from '../TokenPicker/utils'
import { Tab } from '@headlessui/react'
import { useTipWidget } from '.'

function SectionItem({ item }: { item: typeof MessageList[0] }) {
  return (
    <li
      className="flex items-center w-full p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
      key={item.id}
    >
      <Heading as="h3" className="text-sm">
        {item.content}
      </Heading>
    </li>
  )
}

export default function StepTwo() {
  const [, setMessageSearch] = useState('')
  const { isOpen: isOpenMessage, onToggle: toggleMessagePopover } =
    useDisclosure()
  const { isOpen: isOpenTheme, onToggle: toggleThemePopover } = useDisclosure()
  const { setStep } = useTipWidget()

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessageSearch(e.target.value)
  }

  return (
    <div className="flex flex-col flex-1 gap-y-3 min-h-0">
      <div className="flex overflow-y-auto flex-col gap-y-2">
        <button onClick={() => setStep(1)} className="self-start mt-3">
          <Icon icon="ic:round-chevron-left" className="w-5 h-5" />
        </button>
        <span className="mx-auto text-base text-[#343433]">You send</span>
        <p className="mx-auto text-3xl font-medium leading-5 text-black">
          100 USD
        </p>
        <span className="text-sm text-[#7a7e85] mx-auto">&#8776; 10 BTC</span>

        <div className="grid grid-cols-2 gap-y-1 place-content-between p-4 text-sm font-light text-gray-800 rounded-xl border auto-row-auto border-neutral-300">
          <span className="font-medium">Preview</span>
          <IconChevron className="justify-self-end self-center text-gray-400" />
          <span>Issued by</span>
          <span className="text-right">vincent</span>
          <span>Addressed to</span>
          <div className="flex flex-col gap-y-1">
            <span className="text-right">0xd23...4dx</span>
            <span className="text-right">baddeed</span>
            <span className="text-right">hnh2908</span>
            <span className="text-right">tqhuy1991</span>
            <span className="text-right">...and 10 others</span>
          </div>
          <span>Money source</span>
          <span className="text-right">baddeed</span>
          <span>They will receive</span>
          <span className="text-right">100 USD</span>
        </div>

        <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center py-5 px-4 rounded-lg bg-white-pure">
            <input
              className="flex-1 h-full bg-transparent outline-none"
              placeholder="Enter message"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              '☕️ Coffee treat for you',
              '💸 Pay my debt',
              '🍕 Pizza on me tonight!',
              '🎉 Treat yourself',
            ].map((message) => {
              return (
                <button
                  key={message}
                  className="px-3 py-1 rounded-lg bg-white-pure font-medium text-sm text-[#343433]"
                  type="button"
                >
                  {message}
                </button>
              )
            })}
            <Popover open={isOpenMessage} onOpenChange={toggleMessagePopover}>
              <PopoverTrigger className="py-1 px-3 text-sm font-medium bg-[#e5e4e3] rounded-lg">
                More
              </PopoverTrigger>
              <PopoverContent
                align="end"
                alignOffset={-20}
                className="flex flex-col gap-y-2 items-center rounded-lg shadow-md w-[414px] max-h-[500px] bg-white-pure"
              >
                <InputField
                  className="w-full"
                  placeholder="Search"
                  startAdornment={
                    <div className="pl-2">
                      <Icon
                        icon="ion:search"
                        className="w-5 h-5 text-gray-500"
                      />
                    </div>
                  }
                  onChange={onSearchChange}
                />
                <SectionList
                  sections={sectionFormatter(MessageList, 'group')}
                  renderItem={(item) => <SectionItem item={item} />}
                  renderSectionHeader={(section) => (
                    <label className="font-bold text-[0.625rem] uppercase text-[#ADACAA]">
                      {section.title}
                    </label>
                  )}
                  rootClassName="w-full h-full"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <span className="text-sm text-[#343433] font-medium">
            Select theme
          </span>
          <div className="grid grid-cols-4 grid-rows-1 gap-x-2">
            <div className="overflow-hidden relative">
              <img
                src="/tip-theme-new-year.jpg"
                className="object-cover w-full h-full"
                alt=""
              />
              <span className="absolute top-1/2 left-1/2 text-xs font-medium whitespace-nowrap -translate-x-1/2 -translate-y-1/2 text-white-pure">
                New Year
              </span>
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
                    <div className="pl-2">
                      <Icon
                        icon="ion:search"
                        className="w-5 h-5 text-gray-500"
                      />
                    </div>
                  }
                  onChange={onSearchChange}
                />
                <Tab.Group>
                  <Tab.List className="flex overflow-x-auto gap-6 w-full">
                    {ThemeList.map((tab) => (
                      <Tab
                        key={`theme-tab-${tab.id}`}
                        className="focus-visible:outline-none"
                      >
                        {({ selected }) => (
                          <Heading
                            as="h2"
                            className={`whitespace-nowrap text-sm ${
                              selected ? 'text-[#343433]' : 'text-[#848281]'
                            }`}
                          >
                            {tab.group}
                          </Heading>
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="w-full">
                    <Tab.Panel className="grid grid-cols-2 gap-4 p-4 auto-row-auto">
                      {ThemeList.at(0)?.themes.map((t) => {
                        return (
                          <img
                            alt=""
                            key={`theme-image-${t}`}
                            src={t}
                            className="object-cover w-full h-full rounded-lg"
                          />
                        )
                      })}
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <button
        onClick={() => setStep(3)}
        className="flex gap-x-1 justify-center items-center py-2.5 px-6 mt-auto bg-blue-700 rounded-lg"
      >
        <span className="text-sm font-medium text-white-pure">Send</span>
        <Icon className="w-5 h-5 text-white-pure" icon="iconamoon:check-bold" />
      </button>
    </div>
  )
}
