import { IconChevronDown } from '@consolelabs/icons'
import { useEffect, useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import { Tab } from '@headlessui/react'
import {
  InputField,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Heading,
} from '@consolelabs/core'
import { Balance } from '~store'
import { TokenList } from './TokenList'
import { MonikerAsset, MonikerIcons, SectionBase } from './type'
import { DefaultBalances, MonikerAssets } from './data'
import { MonikerList } from './MonikerList'
import { sectionFormatter } from './utils'

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
  selectedAsset: Balance | MonikerAsset | null
  balances?: Balance[]
  onSelect?: (item: Balance | MonikerAsset) => void
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
        <img
          alt={`${props.name} icon`}
          className="object-contain rounded-full w-[22px] h-[22px]"
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

function getFilterMonikerNameFunc(searchTerm: string) {
  return function filterMonikerName(monikerAsset: MonikerAsset) {
    return monikerAsset.moniker.moniker
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  }
}

export const TokenPicker: React.FC<TokenPickerProps> = ({
  selectedAsset,
  balances,
  onSelect,
}) => {
  const [tokenBalances, setTokenBalances] = useState<Balance[]>(
    balances || DefaultBalances,
  )
  const [isOpenSelector, setIsOpenSelector] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const filteredTokens = useMemo<Balance[]>(
    () => tokenBalances.filter(getFilterTokenNameFunc(searchTerm)),
    [searchTerm, tokenBalances],
  )
  const filteredMonikers = useMemo<SectionBase<MonikerAsset>[]>(() => {
    const filteredData = MonikerAssets.filter(
      getFilterMonikerNameFunc(searchTerm),
    )
    return sectionFormatter(filteredData, 'group')
  }, [searchTerm])
  const isTokenSelected = (selectedAsset && 'token' in selectedAsset) ?? true

  useEffect(() => {
    if (Array.isArray(balances) && balances.length) {
      setTokenBalances(balances)
      if (!selectedAsset) {
        handleTokenSelect(balances[0])
      }
    }
  }, [balances])

  function handleTokenSelect(asset: Balance) {
    setIsOpenSelector(false)
    onSelect?.(asset)
  }

  function handleMonikerSelect(asset: MonikerAsset) {
    setIsOpenSelector(false)
    onSelect?.(asset)
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
              ? selectedAsset?.token?.symbol ?? DefaultBalances[0].token?.symbol
              : (selectedAsset as MonikerAsset).moniker.moniker
          }
          icon={
            isTokenSelected
              ? selectedAsset?.token?.icon ?? DefaultBalances[0].token?.icon
              : (selectedAsset as MonikerAsset).moniker.moniker
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
              <Icon icon="ion:search" className="w-5 h-5 text-gray-500" />
            </div>
          }
          onChange={onSearchChange}
        />
        <Tab.Group>
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
          <Tab.Panels className="w-full">
            <Tab.Panel className="flex flex-col gap-2 h-[400px]">
              <TokenList data={filteredTokens} onSelect={handleTokenSelect} />
              <span className="text-xs text-[#ADACAA]">
                Only supported tokens are shown
              </span>
            </Tab.Panel>
            <Tab.Panel className="h-[400px]">
              <MonikerList
                data={filteredMonikers}
                onSelect={handleMonikerSelect}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </PopoverContent>
    </Popover>
  )
}
