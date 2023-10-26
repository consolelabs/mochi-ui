import { useState } from 'react'
import { Icon } from '@iconify/react'
import Modal from '~components/Modal'
import { ChainList } from './ChainList'
import { Chains } from './data'
import { InputField } from '@consolelabs/ui-components'
import { Chain } from './type'

export const ChainPicker = () => {
  const [isOpenSelector, setIsOpenSelector] = useState(false)
  const [selectedChain, setSelectedChain] = useState<Chain>(Chains[0])

  function handleChainSelect(chain: Chain) {
    setSelectedChain(chain)
    setIsOpenSelector(false)
  }

  return (
    <>
      <button
        className="flex gap-x-2 items-center py-1.5 rounded-lg bg-[#FAF9F7]"
        onClick={() => setIsOpenSelector(true)}
      >
        <span className="text-base" role="img">
          <img
            alt={`${selectedChain.name} icon`}
            className="w-[22px] h-[22px] rounded-full object-contain"
            src={selectedChain.icon}
          />
        </span>
        <span className="text-sm font-medium">{selectedChain.name}</span>
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
          <ChainList data={Chains} onSelect={handleChainSelect} />
          <span className="w-full text-xs text-[#ADACAA]">
            Only supported tokens are shown
          </span>
        </div>
      </Modal>
    </>
  )
}
