import { Icon } from '@iconify/react'
import {
  Heading,
  IconChevron,
  IconX,
  IconDiscord,
  InputField,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SectionList,
  IconTelegram,
  IconDango,
  IconWallet,
  IconMochi,
} from '@consolelabs/ui-components'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useState } from 'react'
import { MessageList, ThemeList, Message } from './data'
import { sectionFormatter } from '../TokenPicker/utils'
import { Tab } from '@headlessui/react'
import { useTipWidget } from '.'
import { Platform } from '@consolelabs/mochi-ui'
import stripEmoji from 'emoji-strip'

function SectionItem({
  item,
  onSelect,
}: {
  item: Message
  onSelect: () => void
}) {
  return (
    <li
      className="flex items-center w-full p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
      key={item.id}
      onClick={onSelect}
    >
      <Heading as="h3" className="text-sm">
        {item.content}
      </Heading>
    </li>
  )
}

function Recipient({
  children,
  platform,
}: {
  platform?: Platform
  children?: string
}) {
  if (!children) return null
  let Icon
  switch (platform) {
    case Platform.Discord:
      Icon = IconDiscord
      break
    case Platform.Twitter:
      Icon = IconX
      break
    case Platform.Telegram:
      Icon = IconTelegram
      break
    case Platform.Mochi:
      Icon = IconDango
      break
    default:
      Icon = IconWallet
      break
  }

  return (
    <div className="flex gap-x-1 justify-end items-center">
      {Icon && <Icon className="text-gray-400" />}
      {stripEmoji(children)}
    </div>
  )
}

export default function StepTwo() {
  const [messageSearch, setMessageSearch] = useState('')
  const [, setThemeSearch] = useState('')
  const { isOpen: isOpenMessage, onToggle: toggleMessagePopover } =
    useDisclosure()
  const { isOpen: isOpenTheme, onToggle: toggleThemePopover } = useDisclosure()
  const { setStep, request, updateRequestMessage, updateRequestTheme } =
    useTipWidget()

  function onMessageSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessageSearch(e.target.value)
  }

  function onThemeSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setThemeSearch(e.target.value)
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
            <Recipient>0xd23...4dx</Recipient>
            <Recipient platform={Platform.Twitter}>baddeed</Recipient>
            <Recipient platform={Platform.Telegram}>hnh2908</Recipient>
            <Recipient platform={Platform.Discord}>tqhuy1991</Recipient>
            <span className="text-right">...and 10 others</span>
          </div>
          <span>Money source</span>
          <div className="flex gap-x-1 justify-end items-center">
            <IconMochi />
            <span className="text-right">baddeed</span>
          </div>
          <span>They will receive</span>
          <span className="text-right">100 USD</span>
        </div>

        <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center py-5 px-4 rounded-lg bg-white-pure">
            <input
              value={request?.message ?? ''}
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
                  onClick={() => updateRequestMessage(message)}
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
                  onChange={onMessageSearchChange}
                />
                <SectionList
                  sections={sectionFormatter(
                    MessageList.filter((m) =>
                      m.content
                        .toLowerCase()
                        .includes(messageSearch.toLowerCase()),
                    ),
                    'group',
                  )}
                  renderItem={(item) => (
                    <SectionItem
                      item={item}
                      onSelect={() => {
                        updateRequestMessage(item.content)
                        toggleMessagePopover()
                      }}
                    />
                  )}
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
            <div className="overflow-hidden relative rounded-lg">
              <img
                src={request?.theme?.src || '/tip-theme-new-year.jpg'}
                className="object-cover w-full h-full"
                alt=""
              />
              {!request?.theme && (
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
                    <div className="pl-2">
                      <Icon
                        icon="ion:search"
                        className="w-5 h-5 text-gray-500"
                      />
                    </div>
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
                                  onClick={() => updateRequestTheme(d)}
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
