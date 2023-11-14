import { useEffect, useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@consolelabs/core'
import { IconChevronDown } from '@consolelabs/icons'
import { PlatformList } from './PlatformList'
import { Platform } from './type'
import PlatformIcon from './PlatformIcon'

const Platforms: Platform[] = [
  {
    id: '1',
    platform: 'discord',
  },
  {
    id: '2',
    platform: 'telegram',
  },
  {
    id: '3',
    platform: 'email',
  },
  {
    id: '4',
    platform: 'x',
  },
  {
    id: '5',
    platform: 'github',
  },
  {
    id: '6',
    platform: 'reddit',
  },
  {
    id: '7',
    platform: 'on-chain',
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
      <PopoverTrigger className="flex gap-x-2 items-center py-1.5 px-3 rounded-lg bg-neutral-100">
        <PlatformIcon
          platform={selectedPlatform.platform}
          className="flex-shrink-0 w-[22px] h-[22px]"
        />
        <span className="text-sm font-medium capitalize">
          {selectedPlatform.platform}
        </span>
        <IconChevronDown className="w-4 h-4 text-[#ADACAA]" />
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
