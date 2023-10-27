import { useEffect, useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import Modal from '~components/Modal'
import { TokenList } from './TokenList'
import { MonikerAsset, SectionBase, TokenAsset } from './type'
import { TokenAssets, MonikerAssets } from './data'
import { InputField, Heading } from '@consolelabs/ui-components'
import { MonikerList } from './MonikerList'
import { sectionFormatter } from './utils'
import { Tab } from '@headlessui/react'

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
  onClick?: () => void
}

const TokenButton = (props: TokenButtonProps) => (
  <button
    className="flex gap-x-2 items-center px-2 py-1.5 rounded-lg bg-white-pure"
    onClick={props.onClick}
  >
    {props.isToken ? (
      <span className="text-base" role="img">
        <img
          alt={`${props.name} icon`}
          className="w-[22px] h-[22px] rounded-full object-contain"
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
  </button>
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
  },[])

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

  function onModalClosed() {
    // Reset on close
    setIsOpenSelector(false)
    setSearchTerm('')
  }

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <TokenButton
        isToken={isTokenSelected}
        name={
          isTokenSelected
            ? selectedAsset.token.name
            : selectedAsset.moniker.name
        }
        icon={isTokenSelected ? selectedAsset.icon : selectedAsset.moniker.icon}
        onClick={() => setIsOpenSelector(true)}
      />
      <Modal isOpen={isOpenSelector} onClose={onModalClosed}>
        <div className="flex flex-col gap-y-1 items-center w-[412px] h-fit py-3 px-3 bg-white-pure rounded-lg shadow-md">
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
            <Tab.List className="flex w-full gap-6">
              {TokenTabs.map((tab) => (
                <Tab key={tab.key} className="focus-visible:outline-none">
                  {({ selected }) => (
                    <div className="flex justify-start w-full py-2">
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
              <Tab.Panel className="flex flex-col gap-1 h-[400px]">
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
        </div>
      </Modal>
    </>
  )
}
