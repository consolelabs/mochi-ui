import { ChevronDownLine, MagnifierLine } from '@mochi-ui/icons'
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
  TextFieldRoot,
  TextFieldInput,
  TextFieldDecorator,
  List,
  Checkbox,
} from '@mochi-ui/core'
import { Combobox } from '@headlessui/react'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { noop } from '@dwarvesf/react-utils'
import { TransactionBadge } from './TransactionBadge'
import { TransactionFilters } from './types'

const ALL_ACTIONS = [
  { id: 'transfer', idSearch: 'transfer tip', value: 'Transfer' },
  { id: 'airdrop', idSearch: 'airdrop', value: 'Airdrop' },
  { id: 'deposit', idSearch: 'deposit dp', value: 'Deposit' },
  { id: 'withdraw', idSearch: 'withdraw wd', value: 'Withdraw' },
  { id: 'swap', idSearch: 'swap', value: 'Swap' },
  { id: 'vault_transfer', idSearch: 'vault', value: 'Vault Transfer' },
  { id: 'paylink', idSearch: 'paylink', value: 'Pay Link' },
  { id: 'payme', idSearch: 'payme', value: 'Pay Me' },
]

interface Props {
  disabled: boolean
  setFilters?: (partialFilters: Partial<TransactionFilters>) => void
}

export const TransactionHeaderAction = ({
  disabled,
  setFilters = noop,
}: Props) => {
  const [selectedActions, setSelectedActions] = useState<Array<string>>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    setFilters({ actions: selectedActions })
  }, [selectedActions, setFilters])

  if (disabled) return 'ACTION'

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex gap-x-1 justify-between items-center focus:outline-none"
        >
          <span>ACTION</span>
          <ChevronDownLine className="w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent className="!p-3 bg-white-pure">
          <div className="flex flex-col">
            <Combobox
              multiple
              value={selectedActions}
              onChange={(values) => {
                setSelectedActions(values)
              }}
            >
              <TextFieldRoot>
                <TextFieldDecorator>
                  <MagnifierLine />
                </TextFieldDecorator>
                <Combobox.Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search action"
                  as={TextFieldInput}
                />
              </TextFieldRoot>
              <Combobox.Options static className="-mx-1 mt-2">
                <List
                  data={ALL_ACTIONS.filter((a) =>
                    a.idSearch.toLowerCase().includes(query.toLowerCase()),
                  )}
                  renderItem={(a) => {
                    return (
                      <Combobox.Option
                        key={a.id}
                        value={a.id}
                        className="focus:outline-none"
                      >
                        {({ selected, active }) => {
                          return (
                            <div
                              className={clsx(
                                'rounded flex gap-x-2 items-center py-1 px-2',
                                {
                                  'cursor-pointer bg-neutral-150': active,
                                },
                              )}
                            >
                              <Checkbox checked={selected} />
                              <TransactionBadge action={a.id as any} />
                            </div>
                          )
                        }}
                      </Combobox.Option>
                    )
                  }}
                />
              </Combobox.Options>
            </Combobox>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}
