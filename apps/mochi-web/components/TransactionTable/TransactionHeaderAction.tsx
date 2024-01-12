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
import { useTransactionStore } from '~cpn/explore/index/stores/useTransactionStore'
import { TransactionBadge } from './TransactionBadge'

const ALL_ACTIONS = [
  { id: 'transfer', value: 'Transfer' },
  { id: 'airdrop', value: 'Airdrop' },
  { id: 'deposit', value: 'Deposit' },
  { id: 'withdraw', value: 'Withdraw' },
  { id: 'swap', value: 'Swap' },
  { id: 'vault_transfer', value: 'Vault Transfer' },
  { id: 'paylink', value: 'Pay Link' },
  { id: 'payme', value: 'Pay Me' },
]

export const TransactionHeaderAction = () => {
  const { setFilters } = useTransactionStore()
  const [selectedActions, setSelectedActions] = useState<Array<string>>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (selectedActions.length) {
      setFilters({ actions: selectedActions })
    }
  }, [selectedActions, setFilters])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex gap-x-1 justify-between items-center">
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
              onChange={(values) => setSelectedActions(values)}
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
                  data={ALL_ACTIONS}
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
