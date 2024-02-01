import clsx from 'clsx'
import { ChevronDownLine } from '@mochi-ui/icons'
import { BottomSheet, useBottomSheetContext } from '~cpn/BottomSheet'
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
}

export const PlatformPicker: React.FC<Props> = ({ onSelect, value }) => {
  const { openSheets, setOpenSheets } = useBottomSheetContext()

  function handlePlatformSelect(platform: Platform) {
    setOpenSheets([])
    onSelect?.(platform)
  }

  return (
    <BottomSheet
      name="PlatformPicker"
      title="Choose platform"
      trigger={
        <button
          type="button"
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
                'rotate-180': openSheets.includes('PlatformPicker'),
              },
            )}
          />
        </button>
      }
    >
      <PlatformList data={Platforms} onSelect={handlePlatformSelect} />
    </BottomSheet>
  )
}
