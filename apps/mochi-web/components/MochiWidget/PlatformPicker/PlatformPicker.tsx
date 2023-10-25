import { useState } from 'react'
import { Icon } from '@iconify/react'
import Modal from '~components/Modal'
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

export const PlatformPicker = () => {
  const [isOpenSelector, setIsOpenSelector] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    Platforms[0],
  )

  function handlePlatformSelect(platform: Platform) {
    setSelectedPlatform(platform)
    setIsOpenSelector(false)
  }

  return (
    <>
      <button
        className="flex gap-x-2 items-center py-1 px-3 rounded-lg bg-white-pure"
        onClick={() => setIsOpenSelector(true)}
      >
        <PlatformIcon
          platform={selectedPlatform.platform}
          className="flex-shrink-0 w-4 h-4"
        />
        <span className="text-sm font-medium">{selectedPlatform.platform}</span>
        <Icon icon="majesticons:chevron-down-line" className="w-4 h-4" />
      </button>
      <Modal isOpen={isOpenSelector} onClose={() => setIsOpenSelector(false)}>
        <PlatformList data={Platforms} onSelect={handlePlatformSelect} />
      </Modal>
    </>
  )
}
