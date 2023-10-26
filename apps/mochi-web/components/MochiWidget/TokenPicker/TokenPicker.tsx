import { useState } from 'react'
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

export const TokenPicker = () => {
  const [isOpenSelector, setIsOpenSelector] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<TokenAsset>(TokenAssets[0])
  const [tokenAssets] = useState<TokenAsset[]>(TokenAssets)
  const [monikerSections] = useState<SectionBase<MonikerAsset>[]>(
    sectionFormatter(MonikerAssets, 'group'),
  )

  function handleTokenSelect(asset: TokenAsset) {
    setSelectedAsset(asset)
    setIsOpenSelector(false)
  }

  return (
    <>
      <button
        className="flex gap-x-2 items-center px-3 py-2 rounded-lg bg-white-pure"
        onClick={() => setIsOpenSelector(true)}
      >
        <span className="text-base" role="img">
          <img
            alt={`${selectedAsset.token.name} icon`}
            className="w-[22px] h-[22px] rounded-full object-contain"
            src={selectedAsset.icon}
          />
        </span>
        <span className="text-sm font-medium">{selectedAsset.token.name}</span>
        <Icon icon="majesticons:chevron-down-line" className="w-4 h-4" />
      </button>
      <Modal isOpen={isOpenSelector} onClose={() => setIsOpenSelector(false)}>
        <div className="flex flex-col gap-y-1 items-center w-[412px] h-fit py-3 px-3 bg-white-pure rounded-lg shadow-md">
          <InputField
            className="w-full"
            placeholder="Search"
            startAdornment={
              <div className="pl-2">
                <Icon icon="ion:search" className="w-5 h-5 text-gray-500" />
              </div>
            }
          />
          <Tab.Group>
            <Tab.List className="flex w-full gap-6">
              {TokenTabs.map((tab) => (
                <Tab key={tab.key}>
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
                <TokenList data={tokenAssets} onSelect={handleTokenSelect} />
                <span className="text-xs text-[#ADACAA]">
                  Only supported tokens are shown
                </span>
              </Tab.Panel>
              <Tab.Panel className="h-[400px]">
                <MonikerList data={monikerSections} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </Modal>
    </>
  )
}
