import clsx from 'clsx'
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
  triggerId?: string
  contentId?: string
  onSelect?: (item: Platform) => void
  focusOnOpen?: boolean
}

export const PlatformPicker: React.FC<Props> = ({
  triggerId = 'platform-picker-trigger',
  contentId = 'platform-picker-content',
  onSelect,
  focusOnOpen = false,
}) => {
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

  function handleOpenAutoFocus(event: Event) {
    if (!focusOnOpen) {
      event.preventDefault()
    }
  }

  return (
    <Popover open={isOpenSelector} onOpenChange={setIsOpenSelector}>
      <PopoverTrigger asChild>
        <button
          id={triggerId}
          className="flex gap-x-2 items-center py-1.5 px-3 rounded-lg bg-neutral-100"
        >
          <PlatformIcon
            platform={selectedPlatform.platform}
            className="flex-shrink-0 w-[22px] h-[22px]"
          />
          <span className="text-sm font-medium capitalize whitespace-nowrap">
            {selectedPlatform.platform}
          </span>
          <IconChevronDown
            className={clsx('w-4 h-4 text-[#ADACAA] transition', {
              'rotate-180': isOpenSelector,
            })}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        id={contentId}
        align="start"
        avoidCollisions={false}
        className="flex gap-x-1 items-center py-3 px-3 rounded-lg shadow-md bg-white-pure"
        onOpenAutoFocus={handleOpenAutoFocus}
      >
        <PlatformList data={Platforms} onSelect={handlePlatformSelect} />
      </PopoverContent>
    </Popover>
  )
}
