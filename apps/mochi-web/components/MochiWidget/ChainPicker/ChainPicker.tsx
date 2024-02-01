import { useState } from 'react'
import { ChevronDownLine } from '@mochi-ui/icons'
import { BottomSheet, useBottomSheetContext } from '~cpn/BottomSheet'
import clsx from 'clsx'
import { ChainList } from './ChainList'
import { Chains } from './data'

type ChainPickerProps = {
  className?: string
}

export const ChainPicker: React.FC<ChainPickerProps> = ({ className }) => {
  const { setOpenSheets } = useBottomSheetContext()
  const [selectedChain, setSelectedChain] = useState(Chains[0])

  const Icon = selectedChain.icon

  function handleChainSelect(chain: any) {
    setSelectedChain(chain)
    setOpenSheets((sheets) => sheets.filter((s) => s !== 'ChainPicker'))
  }

  return (
    <BottomSheet
      name="ChainPicker"
      fixedHeight={false}
      title="Networks"
      trigger={
        <button
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
      }
    >
      <ChainList data={Chains} onSelect={handleChainSelect} />
      <span className="w-full text-xs text-text-disabled">
        Only supported tokens are shown
      </span>
    </BottomSheet>
  )
}
