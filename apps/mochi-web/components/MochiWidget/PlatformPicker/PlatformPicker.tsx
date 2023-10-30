import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@consolelabs/ui-components'
import { PlatformList } from './PlatformList'
import { Platform } from './type'
import PlatformIcon from './PlatformIcon'

const Platforms: Platform[] = [
  {
    id: '1',
    platform: 'Discord',
  },
  {
    id: '2',
    platform: 'Telegram',
  },
  {
    id: '3',
    platform: 'Email',
  },
  {
    id: '4',
    platform: 'X',
  },
  {
    id: '5',
    platform: 'Github',
  },
  {
    id: '6',
    platform: 'Reddit',
  },
  {
    id: '7',
    platform: 'On-chain',
  },
]

interface Props {
  onSelect?: (item: Platform) => void
}

export const PlatformPicker: React.FC<Props> = ({ onSelect }) => {
  const [isOpenSelector, setIsOpenSelector] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    Platforms[0],
  )

  // TODO: Init selected platform. Maybe remove after data binding
  useEffect(() => {
    onSelect?.(Platforms[0])
  }, [])

  function handlePlatformSelect(platform: Platform) {
    setSelectedPlatform(platform)
    setIsOpenSelector(false)
    onSelect?.(platform)
  }

  return (
    <Popover open={isOpenSelector} onOpenChange={setIsOpenSelector}>
      <PopoverTrigger className="flex gap-x-2 items-center py-1.5 px-2 rounded-lg bg-white-pure">
        <PlatformIcon
          platform={selectedPlatform.platform}
          className="flex-shrink-0 w-[22px] h-[22px]"
        />
        <span className="text-sm font-medium">{selectedPlatform.platform}</span>
        <Icon
          icon="majesticons:chevron-down-line"
          className="w-4 h-4 text-[#ADACAA]"
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        alignOffset={-8}
        className="flex gap-x-1 items-center py-3 px-3 rounded-lg shadow-md bg-white-pure"
      >
        <PlatformList data={Platforms} onSelect={handlePlatformSelect} />
      </PopoverContent>
    </Popover>
  )
}
