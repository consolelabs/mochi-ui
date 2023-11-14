import { Heading, InputField } from '@consolelabs/ui-components'
import {
  SectionList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@consolelabs/core'
import { IconMagnifier } from '@consolelabs/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useState } from 'react'
import { Message, MessageList } from './data'
import { sectionFormatter } from '../TokenPicker/utils'

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
    >
      <button type="button" onClick={onSelect}>
        <Heading as="h3" className="text-sm">
          {item.content}
        </Heading>
      </button>
    </li>
  )
}

interface MessagePickerProps {
  value?: string
  onChange: (msg: string) => void
}

export default function MessagePicker({ value, onChange }: MessagePickerProps) {
  const [messageSearch, setMessageSearch] = useState('')
  const { isOpen: isOpenMessage, onToggle: toggleMessagePopover } =
    useDisclosure()

  function onMessageSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessageSearch(e.target.value)
  }

  return (
    <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-2">
      <div className="flex gap-x-2 items-center py-5 px-4 rounded-lg bg-white-pure">
        <input
          value={value}
          className="flex-1 h-full bg-transparent outline-none"
          placeholder="Enter message"
          onChange={(e) => onChange(e.target.value)}
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
              onClick={() => onChange(message)}
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
              value={messageSearch}
              className="w-full"
              placeholder="Search"
              startAdornment={
                <IconMagnifier className="pl-2 w-5 h-5 text-gray-500" />
              }
              onChange={onMessageSearchChange}
            />
            <SectionList
              sections={sectionFormatter(
                MessageList.filter((m) =>
                  m.content.toLowerCase().includes(messageSearch.toLowerCase()),
                ),
                'group',
              )}
              renderItem={(item: any) => (
                <SectionItem
                  item={item}
                  onSelect={() => {
                    onChange(item.content)
                    toggleMessagePopover()
                  }}
                />
              )}
              renderSectionHeader={(section: any) => (
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
  )
}
