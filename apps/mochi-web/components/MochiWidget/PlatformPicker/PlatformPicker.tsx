import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { ChevronDownLine } from '@mochi-ui/icons'
import { BottomSheet } from '~cpn/BottomSheet'
import { useDisclosure } from '@dwarvesf/react-hooks'
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
  authorized: boolean
  unauthorizedContent: React.ReactNode
}

export const PlatformPicker: React.FC<Props> = ({
  authorized,
  unauthorizedContent,
  onSelect,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    Platforms[0],
  )

  // TODO: Init selected platform. Maybe remove after data binding
  useEffect(() => {
    onSelect?.(Platforms[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handlePlatformSelect(platform: Platform) {
    setSelectedPlatform(platform)
    onClose()
    onSelect?.(platform)
  }

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="flex gap-x-2 items-center py-1.5 px-3 rounded-lg outline-none bg-neutral-100"
        tabIndex={-1}
      >
        <PlatformIcon
          platform={selectedPlatform.platform}
          className="flex-shrink-0 w-[22px] h-[22px]"
        />
        <span className="text-sm font-medium capitalize whitespace-nowrap">
          {selectedPlatform.platform}
        </span>
        <ChevronDownLine
          className={clsx('w-4 h-4 text-[#ADACAA] transition', {
            'rotate-180': isOpen,
          })}
        />
      </button>
      <BottomSheet
        isOpen={isOpen}
        onClose={onClose}
        title={authorized ? 'Choose platform' : ''}
      >
        {authorized ? (
          <PlatformList data={Platforms} onSelect={handlePlatformSelect} />
        ) : (
          unauthorizedContent
        )}
      </BottomSheet>
    </>
  )
}
