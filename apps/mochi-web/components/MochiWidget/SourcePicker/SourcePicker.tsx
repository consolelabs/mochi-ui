import { useState } from 'react'
import { Icon } from '@iconify/react'
import Modal from '~components/Modal'
import { SourceList } from './SourceList'
import { SourceType } from './type'

const MockSources: SourceType[] = [
  {
    id: '1',
    source: 'Mochi Wallet',
    source_icon: '/logo.png',
    profile_id: 'baddeed',
    total_amount: '2511.53',
  },
  {
    id: '2',
    source: 'Solana',
    source_icon: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    profile_id: 'd3gen.sol',
    total_amount: '12673',
    token_amount: '23',
    chain: {
      short_name: 'SOL',
    },
  },
]

export const SourcePicker = () => {
  const [isOpenSelector, setIsOpenSelector] = useState(false)
  const [selectedSource, setSelectedSource] = useState<SourceType>(
    MockSources[0],
  )

  function handleSourceSelect(source: SourceType) {
    setSelectedSource(source)
    setIsOpenSelector(false)
  }

  return (
    <>
      <div
        className="flex gap-x-3 items-center py-3 px-2 bg-blue-50 rounded-lg"
        onClick={() => setIsOpenSelector(true)}
      >
        <img
          className="flex-shrink-0 w-6 h-6"
          src={selectedSource.source_icon}
          alt={`${selectedSource.source} icon`}
        />
        <div className="flex flex-col flex-1 justify-between">
          <span className="text-sm font-medium text-blue-700">
            {selectedSource.source}
          </span>
          <span className="text-xs text-blue-500">
            {selectedSource.profile_id}
          </span>
        </div>
        <span className="flex-shrink-0 text-sm font-medium text-blue-700">
          ${parseFloat(selectedSource.total_amount).toLocaleString('en-US')}
        </span>
        <Icon icon="majesticons:chevron-down-line" className="w-4 h-4" />
      </div>
      <Modal isOpen={isOpenSelector} onClose={() => setIsOpenSelector(false)}>
        <div className="flex gap-x-1 items-center py-3 px-3 bg-white-pure rounded-lg shadow-md">
          <SourceList data={MockSources} onSelect={handleSourceSelect} />
        </div>
      </Modal>
    </>
  )
}
