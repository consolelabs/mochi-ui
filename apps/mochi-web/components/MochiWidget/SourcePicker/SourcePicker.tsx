import { useState } from 'react'
import { Icon } from '@iconify/react'
import { SourceList } from './SourceList'
import { SourceType } from './type'
import { formatNumber } from '~utils/number'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@consolelabs/ui-components'

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
    <Popover open={isOpenSelector} onOpenChange={setIsOpenSelector}>
      <PopoverTrigger className="flex gap-x-3 items-center py-3 px-2 bg-blue-50 rounded-lg text-left">
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
          ${formatNumber(selectedSource.total_amount)}
        </span>
        <Icon
          icon="majesticons:chevron-down-line"
          className="w-4 h-4 text-[#ADACAA]"
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[414px] flex gap-x-1 items-center py-3 px-3 bg-white-pure rounded-lg shadow-md focus-visible:outline-none"
      >
        <SourceList data={MockSources} onSelect={handleSourceSelect} />
      </PopoverContent>
    </Popover>
  )
}
