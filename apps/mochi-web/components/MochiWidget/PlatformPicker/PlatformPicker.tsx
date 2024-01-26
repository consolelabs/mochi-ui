import clsx from 'clsx'
import { ChevronDownLine } from '@mochi-ui/icons'
import { BottomSheet } from '~cpn/BottomSheet'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { PlatformList } from './PlatformList'
import { Platform } from './type'
import PlatformIcon from './PlatformIcon'

export const Platforms: Platform[] = [
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
    platform: 'facebook',
  },
  {
    id: '6',
    platform: 'github',
  },
  {
    id: '7',
    platform: 'reddit',
  },
  {
    id: '8',
    platform: 'on-chain',
  },
]

interface Props {
  onSelect?: (item: Platform) => void
  value: Platform
  authorized: boolean
  unauthorizedContent: React.ReactNode
}

export const PlatformPicker: React.FC<Props> = ({
  authorized,
  unauthorizedContent,
  onSelect,
  value,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  function handlePlatformSelect(platform: Platform) {
    onClose()
    onSelect?.(platform)
  }

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="flex gap-x-2 items-center py-1.5 px-3 rounded-lg border outline-none bg-primary-soft  border-primary-outline-border"
        tabIndex={-1}
      >
        <PlatformIcon
          platform={value.platform}
          className="flex-shrink-0 text-primary-soft-fg w-[22px] h-[22px]"
        />
        <span className="text-sm font-medium capitalize whitespace-nowrap">
          {value.platform}
        </span>
        <ChevronDownLine
          className={clsx(
            'w-4 h-4 text-primary-soft-fg opacity-80 transition',
            {
              'rotate-180': isOpen,
            },
          )}
        />
      </button>
      <BottomSheet
        isOpen={isOpen}
        onClose={onClose}
        title={authorized ? 'Choose platform' : ''}
        dynamic={!authorized}
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
