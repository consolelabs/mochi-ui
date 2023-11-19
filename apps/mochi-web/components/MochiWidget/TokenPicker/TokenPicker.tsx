import Image from 'next/image'
import { IconChevronDown, IconMagnifier } from '@consolelabs/icons'
import { useShallow } from 'zustand/react/shallow'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Tab } from '@headlessui/react'
import {
  InputField,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Heading,
} from '@consolelabs/core'
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
  onSelect?: (item: Balance | Moniker) => void
}

interface TokenButtonProps {
  isToken?: boolean
  name?: string
  icon?: string
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
    <IconChevronDown className="w-4 h-4 text-[#ADACAA]" />
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
}) => {
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
    (asset: Balance) => {
      setIsOpenSelector(false)
      onSelect?.(asset)
      setTabIdx(0)
    },
    [onSelect],
  )

  useEffect(() => {
    if (Array.isArray(balances) && balances.length) {
      setTokenBalances(balances)
      if (!selectedAsset) {
        handleTokenSelect(balances[0])
      }
    }
  }, [balances, handleTokenSelect, selectedAsset])

  function handleMonikerSelect(asset: Moniker) {
    setIsOpenSelector(false)
    onSelect?.(asset)
    setTabIdx(1)
  }

  function onOpenChange(isOpen: boolean) {
    // Reset on close
    setIsOpenSelector(isOpen)
    setSearchTerm('')
  }

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
  }

  return (
    <Popover open={isOpenSelector} onOpenChange={onOpenChange}>
      <PopoverTrigger>
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
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        alignOffset={-8}
        className="flex flex-col gap-y-2 items-center rounded-lg shadow-md w-[414px] h-fit bg-white-pure"
      >
        <InputField
          className="w-full"
          placeholder="Search"
          startAdornment={
            <div className="pl-2">
              <IconMagnifier className="w-5 h-5 text-gray-500" />
            </div>
          }
          onChange={onSearchChange}
        />
        <Tab.Group selectedIndex={tabIdx} onChange={setTabIdx}>
          <Tab.List className="flex gap-6 w-full">
            {TokenTabs.map((tab) => (
              <Tab key={tab.key} className="focus-visible:outline-none">
                {({ selected }) => (
                  <div className="flex justify-start py-2 w-full">
                    <Heading
                      as="h2"
                      className={`text-sm ${
                        selected ? 'text-[#343433]' : 'text-[#848281]'
                      }`}
                    >
                      {tab.value}
                    </Heading>
                  </div>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="w-full h-[350px]">
            <Tab.Panel className="flex flex-col gap-2 h-full">
              <TokenList
                loading={isFetchingWallets}
                data={filteredTokens}
                onSelect={handleTokenSelect}
              />
              <span className="text-xs text-[#ADACAA]">
                Only supported tokens are shown
              </span>
            </Tab.Panel>
            <Tab.Panel className="h-full">
              <MonikerList
                searchTerm={searchTerm}
                onSelect={handleMonikerSelect}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </PopoverContent>
    </Popover>
  )
}
