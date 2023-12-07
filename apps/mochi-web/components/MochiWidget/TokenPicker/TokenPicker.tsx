import { useDisclosure } from '@dwarvesf/react-hooks'
import clsx from 'clsx'
import Image from 'next/image'
import { ChevronDownLine, MagnifierLine } from '@mochi-ui/icons'
import { useShallow } from 'zustand/react/shallow'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import {
  TextFieldInput,
  TextFieldDecorator,
  TextFieldRoot,
  Heading,
} from '@mochi-ui/core'
import { BottomSheet } from '~cpn/BottomSheet'
import { Balance, useWalletStore } from '~store'
import { TokenList } from './TokenList'
import { Moniker } from './type'
import { MonikerList } from './MonikerList'
import { MonikerIcons, isToken } from './utils'
import { DEFAULT_BALANCE } from './default-data'

const TokenTabs = [
  {
    key: 1,
    value: 'Token',
  },
  {
    key: 2,
    value: 'Moniker',
  },
]

interface TokenPickerProps {
  selectedAsset: Balance | Moniker | null
  balances?: Balance[]
  onSelect?: (item: Balance | Moniker | null) => void
  authorized: boolean
  unauthorizedContent: React.ReactNode
}

interface TokenButtonProps {
  isToken?: boolean
  name?: string
  icon?: string
  isOpenSelector?: boolean
}

const TokenButton = (props: TokenButtonProps) => (
  <div className="flex gap-x-2 items-center py-1.5 px-3 rounded-lg bg-white-pure">
    {props.isToken ? (
      <span className="text-base" role="img">
        <Image
          width={22}
          height={22}
          alt={`${props.name} icon`}
          className="object-contain rounded-full"
          src={props.icon || '/logo.png'}
        />
      </span>
    ) : (
      <span className="text-base w-[22px] h-[22px]" role="img">
        {MonikerIcons.get(props.name ?? '')}
      </span>
    )}
    <span className="text-sm font-medium">{props.name}</span>
    <ChevronDownLine
      className={clsx('transition w-4 h-4 text-[#ADACAA]', {
        'rotate-180': props.isOpenSelector,
      })}
    />
  </div>
)

function getFilterTokenNameFunc(searchTerm: string) {
  return function filterTokenName(bal: Balance) {
    return bal.token?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  }
}

export const TokenPicker: React.FC<TokenPickerProps> = ({
  selectedAsset,
  balances,
  onSelect,
  authorized,
  unauthorizedContent,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isFetchingWallets = useWalletStore(useShallow((s) => s.isFetching))
  const [tokenBalances, setTokenBalances] = useState<Balance[]>(
    balances || [DEFAULT_BALANCE],
  )
  const [isOpenSelector, setIsOpenSelector] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const filteredTokens = useMemo<Balance[]>(
    () => tokenBalances.filter(getFilterTokenNameFunc(searchTerm)),
    [searchTerm, tokenBalances],
  )
  const isTokenSelected = isToken(selectedAsset)
  const [tabIdx, setTabIdx] = useState(isTokenSelected ? 0 : 1)

  const handleTokenSelect = useCallback(
    (asset: Balance | null) => {
      setSearchTerm('')
      setIsOpenSelector(false)
      onSelect?.(asset)
      setTabIdx(0)
      onClose()
    },
    [onClose, onSelect],
  )

  function handleMonikerSelect(asset: Moniker) {
    setSearchTerm('')
    setIsOpenSelector(false)
    onSelect?.(asset)
    setTabIdx(1)
    onClose()
  }

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    if (!Array.isArray(balances)) return
    if (balances.length) {
      setTokenBalances(balances)
      if (!selectedAsset) {
        handleTokenSelect(balances[0])
      }
    } else {
      setTokenBalances([DEFAULT_BALANCE])
      handleTokenSelect(null)
    }
  }, [balances, handleTokenSelect, selectedAsset])

  useEffect(() => {
    if (isOpen) {
      // hack
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true })
      }, 0)
    }
  }, [isOpen])

  return (
    <>
      <button
        tabIndex={-1}
        type="button"
        onClick={onOpen}
        className="outline-none"
      >
        <TokenButton
          isToken={isTokenSelected}
          name={
            isTokenSelected
              ? selectedAsset?.token?.symbol ?? DEFAULT_BALANCE.token.symbol
              : selectedAsset?.name
          }
          icon={
            isTokenSelected
              ? selectedAsset?.token?.icon ?? DEFAULT_BALANCE.token?.icon
              : selectedAsset?.name
          }
          isOpenSelector={isOpenSelector}
        />
      </button>

      <BottomSheet
        title={authorized ? 'Choose token' : ''}
        isOpen={isOpen}
        onClose={onClose}
      >
        {authorized ? (
          <div className="flex flex-col flex-1 w-full min-h-0">
            <TextFieldRoot className="flex-shrink-0 mt-1">
              <TextFieldDecorator>
                <MagnifierLine className="w-5 h-5 text-gray-500" />
              </TextFieldDecorator>
              <TextFieldInput
                ref={inputRef}
                placeholder="Search"
                value={searchTerm}
                onChange={onSearchChange}
              />
            </TextFieldRoot>
            <Tab.Group selectedIndex={tabIdx} onChange={setTabIdx}>
              <Tab.List className="flex gap-6 mt-2 w-full">
                {TokenTabs.map((tab) => (
                  <Tab key={tab.key} className="focus-visible:outline-none">
                    {({ selected }) => (
                      <div className="flex justify-start py-2 w-full">
                        <Heading
                          as="h2"
                          className={`text-sm ${
                            selected ? 'text-neutral-800' : 'text-neutral-600'
                          }`}
                        >
                          {tab.value}
                        </Heading>
                      </div>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="flex-1 w-full min-h-0">
                <Tab.Panel className="flex flex-col gap-2 h-full">
                  <TokenList
                    loading={isFetchingWallets}
                    data={filteredTokens}
                    onSelect={handleTokenSelect}
                  />
                  <span className="mt-auto text-xs text-neutral-500">
                    Only supported tokens are shown
                  </span>
                </Tab.Panel>
                <Tab.Panel className="flex flex-col gap-2 h-full">
                  <MonikerList
                    balances={tokenBalances}
                    searchTerm={searchTerm}
                    onSelect={handleMonikerSelect}
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>{' '}
          </div>
        ) : (
          unauthorizedContent
        )}
      </BottomSheet>
    </>
  )
}
