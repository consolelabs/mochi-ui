import { useLoginWidget } from '@mochi-web3/login-widget'
import { BottomSheet, useBottomSheetContext } from '~cpn/BottomSheet'
import {
  TextFieldRoot,
  TextFieldInput,
  TextFieldDecorator,
} from '@mochi-ui/core'
import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import { MagnifierLine } from '@mochi-ui/icons'
import { useEffect, useState } from 'react'
import { SectionList } from '~cpn/base/section-list'
import { MessageList } from './data'
import { sectionFormatter } from '../TokenPicker/utils'
import { useDefaultMessage } from './useDefaultMessage'

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
  const { setOpenSheets } = useBottomSheetContext()
  const { profile } = useLoginWidget()
  const defaultTipMessage = useDefaultMessage(profile?.id)

  function onMessageSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessageSearch(e.target.value)
  }

  useEffect(() => {
    if (!defaultTipMessage) return

    onChange(defaultTipMessage)
  }, [defaultTipMessage])

  return (
    <Combobox
      value={messageSearch}
      onChange={(message) => {
        setMessageSearch('')
        setOpenSheets([])
        onChange(message)
      }}
    >
      <div className="rounded-xl bg p-2 bg-background-level2 flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center py-5 px-4 rounded-lg bg-background-body">
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
            /* '🍕 Pizza on me tonight!', */
            /* '🎉 Treat yourself', */
          ].map((message) => {
            return (
              <button
                key={message}
                className="py-1 px-3 text-sm font-medium rounded-lg outline-none bg-background-body text-text-primary"
                type="button"
                onClick={() => onChange(message)}
              >
                {message}
              </button>
            )
          })}
          <BottomSheet
            name="MessagePicker"
            title="Choose message"
            focusNthChild={0}
            trigger={
              <button
                type="button"
                className="py-1 px-3 text-sm font-medium rounded-lg outline-none bg-background-body"
              >
                More
              </button>
            }
          >
            <TextFieldRoot className="flex-shrink-0 mt-2">
              <TextFieldDecorator>
                <MagnifierLine className="w-5 h-5 text-text-disabled" />
              </TextFieldDecorator>
              <Combobox.Input
                as={TextFieldInput}
                value={messageSearch}
                placeholder="Search"
                className="placeholder:text-text-disabled"
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
                                'bg-neutral-soft-active': active,
                                'hover:bg-neutral-soft-hover': !active,
                              },
                            )}
                            onClick={() => {
                              onChange(item.content)
                              setOpenSheets([])
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
                    className="font-bold text-[0.625rem] uppercase text-text-disabled"
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
