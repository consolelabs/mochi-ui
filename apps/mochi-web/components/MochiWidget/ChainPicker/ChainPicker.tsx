import { useState } from 'react'
import { ChevronDownLine } from '@mochi-ui/icons'
import { BottomSheet } from '~cpn/BottomSheet'
import { useDisclosure } from '@dwarvesf/react-hooks'
import clsx from 'clsx'
import { ChainList } from './ChainList'
import { Chains } from './data'

type ChainPickerProps = {
  className?: string
}

export const ChainPicker: React.FC<ChainPickerProps> = ({ className }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedChain, setSelectedChain] = useState(Chains[0])

  const Icon = selectedChain.icon

  function handleChainSelect(chain: any) {
    setSelectedChain(chain)
    onClose()
  }

  return (
    <>
      <button
        onClick={onOpen}
        type="button"
        className={clsx(
          'outline-none flex gap-x-2 items-center py-1 px-1 rounded-md bg-[#F2F2F0]',
          className,
        )}
      >
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{selectedChain.name}</span>
        <ChevronDownLine className="w-4 h-4 text-[#ADACAA]" />
      </button>
      <BottomSheet
        isOpen={isOpen}
        onClose={onClose}
        dynamic={false}
        title="Networks"
      >
        <ChainList data={Chains} onSelect={handleChainSelect} />
        <span className="w-full text-xs text-neutral-500">
          Only supported tokens are shown
        </span>
      </BottomSheet>
    </>
  )
}
