import { useState } from 'react'
import { Icon } from '@iconify/react'
import Modal from '~components/Modal'
import { TokenList } from './TokenList'
import { TokenAsset } from './type'
import { TokenAssets } from './data'
import { InputField, Heading } from '@consolelabs/ui-components'

export const TokenPicker = () => {
  const [isOpenSelector, setIsOpenSelector] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<TokenAsset>(TokenAssets[0])

  function handleSourceSelect(asset: TokenAsset) {
    setSelectedAsset(asset)
    setIsOpenSelector(false)
  }

  return (
    <>
      <button
        className="flex gap-x-2 items-center py-1 px-3 rounded-lg bg-white-pure"
        onClick={() => setIsOpenSelector(true)}
      >
        <span className="text-base" role="img">
          <img
            alt={`${selectedAsset.token.name} icon`}
            className="w-5 h-5 rounded-full object-contain"
            src={selectedAsset.icon}
          />
        </span>
        <span className="text-sm font-medium">{selectedAsset.token.name}</span>
        <Icon icon="majesticons:chevron-down-line" className="w-4 h-4" />
      </button>
      <Modal isOpen={isOpenSelector} onClose={() => setIsOpenSelector(false)}>
        <div className="flex flex-col gap-y-1 items-center w-[412px] h-[512px] py-3 px-3 bg-[#fff] rounded-lg shadow-md">
          <InputField
            className="w-full"
            placeholder="Search"
            startAdornment={
              <div className="pl-2">
                <Icon icon="ion:search" className="w-5 h-5 text-gray-500" />
              </div>
            }
          />
          <div className='flex justify-start w-full py-2'>
          <Heading as="h2" className="text-sm">
            Token
          </Heading>
          </div>
          <TokenList data={TokenAssets} onSelect={handleSourceSelect} />
        </div>
      </Modal>
    </>
  )
}
