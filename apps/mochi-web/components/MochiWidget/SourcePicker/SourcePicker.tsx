import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { formatNumber } from '~utils/number'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@consolelabs/ui-components'
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

const DefaultSource: SourceType = {
  id: '-1',
  source: 'Mochi Wallet',
  source_icon: '/logo.png',
  profile_id: 'Not connected',
  total_amount: '0',
}

interface Props {
  accessToken: string | null
  onLoginRequest?: () => void
  onSelect?: (item: SourceType) => void
}

export const SourcePicker: React.FC<Props> = ({
  accessToken,
  onLoginRequest,
  onSelect,
}) => {
  const [isOpenSelector, setIsOpenSelector] = useState(false)
  const [sources, setSources] = useState<SourceType[]>([])
  const [selectedSource, setSelectedSource] =
    useState<SourceType>(DefaultSource)

  useEffect(() => {
    if (!accessToken) {
      setSelectedSource(DefaultSource)
    } else {
      // TODO: Fetch sources by token
      setSources(MockSources)
      setSelectedSource(MockSources[0])
    }
  }, [accessToken])

  function handleSourceSelect(source: SourceType) {
    setSelectedSource(source)
    setIsOpenSelector(false)
    onSelect?.(source)
  }

  function handleTriggerClick() {
    if (!accessToken) {
      onLoginRequest?.()
    }
  }

  return (
    <Popover open={isOpenSelector} onOpenChange={setIsOpenSelector}>
      <PopoverTrigger
        className="flex gap-x-3 items-center py-2.5 px-4 bg-[#017AFF] bg-opacity-10 rounded-lg text-left"
        onClick={handleTriggerClick}
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
        {accessToken && (
          <>
            <span className="flex-shrink-0 text-sm font-medium text-blue-700">
              ${formatNumber(selectedSource.total_amount)}
            </span>
            <Icon
              icon="majesticons:chevron-down-line"
              className="w-4 h-4 text-[#ADACAA]"
            />
          </>
        )}
      </PopoverTrigger>
      {accessToken && (
        <PopoverContent
          align="start"
          className="w-[414px] flex gap-x-1 items-center py-3 px-3 bg-white-pure rounded-lg shadow-md focus-visible:outline-none"
        >
          <SourceList data={sources} onSelect={handleSourceSelect} />
        </PopoverContent>
      )}
    </Popover>
  )
}
