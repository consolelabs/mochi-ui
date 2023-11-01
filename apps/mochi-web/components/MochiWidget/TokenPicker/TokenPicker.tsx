import { useEffect, useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import { TokenList } from './TokenList'
import { MonikerAsset, SectionBase, TokenAsset } from './type'
import { TokenAssets, MonikerAssets } from './data'
import { MonikerList } from './MonikerList'
import { sectionFormatter } from './utils'
import { Tab } from '@headlessui/react'
import {
  InputField,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@consolelabs/ui-components'

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
  onSelect?: (item: TokenAsset | MonikerAsset) => void
}

interface TokenButtonProps {
  isToken?: boolean
  name?: string
  icon?: string
}

const TokenButton = (props: TokenButtonProps) => (
  <div className="flex gap-x-2 items-center py-1.5 px-2 rounded-lg bg-white-pure">
    {props.isToken ? (
      <span className="text-base" role="img">
        <img
          alt={`${props.name} icon`}
          className="object-contain rounded-full w-[22px] h-[22px]"
          src={props.icon}
        />
      </span>
    ) : (
      <span className="text-base w-[22px] h-[22px]" role="img">
        {props.icon}
      </span>
    )}
    <span className="text-sm font-medium">{props.name}</span>
    <Icon
      icon="majesticons:chevron-down-line"
      className="w-4 h-4 text-[#ADACAA]"
    />
  </div>
)

export const TokenPicker: React.FC<TokenPickerProps> = ({ onSelect }) => {
  const [isOpenSelector, setIsOpenSelector] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<TokenAsset | MonikerAsset>(
    TokenAssets[0],
  )
  const [searchTerm, setSearchTerm] = useState('')
  const filteredTokens = useMemo<TokenAsset[]>(
    () =>
      TokenAssets.filter((token) =>
        token.token.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  )
  const filteredMonikers = useMemo<SectionBase<MonikerAsset>[]>(() => {
    const filteredData = MonikerAssets.filter((section) =>
      section.moniker.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    return sectionFormatter(filteredData, 'moniker.group')
  }, [searchTerm])
  const isTokenSelected = 'token' in selectedAsset

  // TODO: Init selected asset. Maybe remove after data binding
  useEffect(() => {
    onSelect?.(TokenAssets[0])
  }, [])

  function handleTokenSelect(asset: TokenAsset) {
    setSelectedAsset(asset)
    setIsOpenSelector(false)
    onSelect?.(asset)
  }

  function handleMonikerSelect(asset: MonikerAsset) {
    setSelectedAsset(asset)
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
              ? selectedAsset.token.name
              : selectedAsset.moniker.name
          }
          icon={
            isTokenSelected ? selectedAsset.icon : selectedAsset.moniker.icon
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
