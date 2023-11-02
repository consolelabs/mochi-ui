import { useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  InputField,
} from '@consolelabs/ui-components'
import { ChainList } from './ChainList'
import { Chains } from './data'
import { Chain } from './type'

export const ChainPicker = () => {
  const [isOpenSelector, setIsOpenSelector] = useState(false)
  const [selectedChain, setSelectedChain] = useState<Chain>(Chains[0])
  const [searchTerm, setSearchTerm] = useState('')
  const filteredChains = useMemo(() => {
    return Chains.filter(
      (chain) => chain.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  function onOpenChange(isOpen: boolean) {
    setIsOpenSelector(isOpen)
    setSearchTerm('')
  }

  function handleChainSelect(chain: Chain) {
    setSelectedChain(chain)
    setIsOpenSelector(false)
  }

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
  }

  return (
    <Popover open={isOpenSelector} onOpenChange={onOpenChange}>
      <PopoverTrigger className="flex gap-x-2 items-center py-1.5 rounded-lg bg-[#FAF9F7]">
        <span className="text-base" role="img">
          <img
            alt={`${selectedChain.name} icon`}
            className="w-[22px] h-[22px] rounded-full object-contain"
            src={selectedChain.icon}
          />
        </span>
        <span className="text-sm font-medium">{selectedChain.name}</span>
        <Icon
          icon="majesticons:chevron-down-line"
          className="w-4 h-4 text-[#ADACAA]"
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        alignOffset={-16}
        className="flex flex-col gap-y-2 items-center w-[414px] h-[477px] bg-white-pure"
      >
        <InputField
          className="w-full"
          placeholder="Search"
          startAdornment={
            <div className="pl-2">
              <Icon icon="ion:search" className="w-5 h-5 text-gray-500" />
            </div>
          }
          onChange={onSearchChange}
        />
        <ChainList data={filteredChains} onSelect={handleChainSelect} />
        <span className="w-full text-xs text-[#ADACAA]">
          Only supported tokens are shown
        </span>
      </PopoverContent>
    </Popover>
  )
}
