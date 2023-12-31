import { BottomSheet } from '~cpn/BottomSheet'
import {
  TextFieldRoot,
  TextFieldInput,
  TextFieldDecorator,
} from '@mochi-ui/core'
import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import { MagnifierLine } from '@mochi-ui/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useState } from 'react'
import { SectionList } from '~cpn/base/section-list'
import { MessageList } from './data'
import { sectionFormatter } from '../TokenPicker/utils'

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
  const [messageSearch, setMessageSearch] = useState('')
  const { isOpen, onClose, onOpen } = useDisclosure()

  function onMessageSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessageSearch(e.target.value)
  }

  return (
    <Combobox
      value={messageSearch}
      onChange={(message) => {
        setMessageSearch('')
        onClose()
        onChange(message)
      }}
    >
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
          <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="Choose message"
            focusNthChild={0}
          >
            <TextFieldRoot className="flex-shrink-0 mt-2">
              <TextFieldDecorator>
                <MagnifierLine className="w-5 h-5 text-gray-500" />
              </TextFieldDecorator>
              <Combobox.Input
                as={TextFieldInput}
                value={messageSearch}
                placeholder="Search"
                onChange={onMessageSearchChange}
              />
            </TextFieldRoot>
            <Combobox.Options static className="flex mt-2 w-full min-h-0">
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
                  <Combobox.Option value={item.content}>
                    {({ active }) => {
                      return (
                        <li>
                          <button
                            type="button"
                            className={clsx(
                              'flex items-center p-2 space-x-2 w-full rounded-lg cursor-pointer outline-none',
                              {
                                'bg-neutral-100': active,
                                'hover:bg-neutral-100': !active,
                              },
                            )}
                            onClick={() => {
                              onChange(item.content)
                              onClose()
                            }}
                          >
                            <h3 className="text-sm">{item.content}</h3>
                          </button>
                        </li>
                      )
                    }}
                  </Combobox.Option>
                )}
                renderSectionHeader={(section: any) => (
                  <label
                    htmlFor={sectionTitleHtmlFor}
                    className="font-bold text-[0.625rem] uppercase text-[#ADACAA]"
                  >
                    {section.title}
                  </label>
                )}
                rootClassName="w-full"
              />
            </Combobox.Options>
          </BottomSheet>
        </div>
      </div>
    </Combobox>
  )
}
