import { BottomSheet } from '~cpn/BottomSheet'
import {
  TextFieldRoot,
  TextFieldInput,
  TextFieldDecorator,
  Heading,
  SectionList,
} from '@mochi-ui/core'
import { MagnifierLine } from '@mochi-ui/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useEffect, useRef, useState } from 'react'
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
    <li>
      <button
        type="button"
        className="outline-none flex items-center w-full p-2 hover:bg-[#FAF9F7] rounded-lg space-x-2 cursor-pointer"
        onClick={onSelect}
      >
        <Heading as="h3" className="text-sm">
          {item.content}
        </Heading>
      </button>
    </li>
  )
}

interface MessagePickerProps {
  value: string
  onChange: (msg: string) => void
  sectionTitleHtmlFor?: string
}

export default function MessagePicker({
  value,
  onChange,
  sectionTitleHtmlFor,
}: MessagePickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const outerInputRef = useRef<HTMLInputElement | null>(null)
  const [messageSearch, setMessageSearch] = useState('')
  const { isOpen, onClose, onOpen } = useDisclosure()

  function onMessageSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessageSearch(e.target.value)
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true })
      }, 0)
    }
  }, [isOpen])

  useEffect(() => {
    setTimeout(() => {
      outerInputRef.current?.focus({ preventScroll: true })
    }, 0)
  }, [])

  return (
    <div className="rounded-xl bg p-2 bg-[#f4f3f2] flex flex-col gap-y-2">
      <div className="flex gap-x-2 items-center py-5 px-4 rounded-lg bg-white-pure">
        <input
          value={value}
          className="flex-1 h-full bg-transparent outline-none"
          placeholder="Enter message"
          onChange={(e) => onChange(e.target.value)}
          ref={outerInputRef}
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
              className="py-1 px-3 text-sm font-medium rounded-lg outline-none bg-white-pure text-neutral-800"
              type="button"
              onClick={() => onChange(message)}
            >
              {message}
            </button>
          )
        })}
        <button
          type="button"
          onClick={onOpen}
          className="py-1 px-3 text-sm font-medium rounded-lg outline-none bg-neutral-300"
        >
          More
        </button>
        <BottomSheet isOpen={isOpen} onClose={onClose} title="Choose message">
          <div className="flex flex-col w-full min-h-0">
            <TextFieldRoot className="flex-shrink-0 mt-2">
              <TextFieldDecorator>
                <MagnifierLine className="w-5 h-5 text-gray-500" />
              </TextFieldDecorator>
              <TextFieldInput
                ref={inputRef}
                value={messageSearch}
                placeholder="Search"
                onChange={onMessageSearchChange}
              />
            </TextFieldRoot>
            <SectionList
              sections={sectionFormatter(
                MessageList.filter((m) =>
                  m.content.toLowerCase().includes(messageSearch.toLowerCase()),
                ),
                'group',
              )}
              renderItem={(item) => (
                <SectionItem
                  key={`message-list-${item.id}`}
                  item={item}
                  onSelect={() => {
                    onChange(item.content)
                    onClose()
                  }}
                />
              )}
              renderSectionHeader={(section: any) => (
                <label
                  htmlFor={sectionTitleHtmlFor}
                  className="font-bold text-[0.625rem] uppercase text-[#ADACAA]"
                >
                  {section.title}
                </label>
              )}
              rootClassName="w-full h-full mt-2"
            />
          </div>
        </BottomSheet>
      </div>
    </div>
  )
}
