import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@mochi-ui/core'
import { LinkLine } from '@mochi-ui/icons'
import { networkFilters } from '~constants/transactions'
import { Chains } from '~cpn/MochiWidget/ChainPicker/data'

export type ChainPickerProps = {
  value: string
  onChange: (value: string) => void
}

export const ChainPicker = (props: ChainPickerProps) => {
  const { value, onChange } = props

  const selectedChain = Chains.find((chain) => chain.id === Number(value))

  return (
    <Select value={value} onChange={(v) => onChange(v === 'all' ? '' : v)}>
      <SelectTrigger
        leftIcon={selectedChain ? <selectedChain.icon /> : <LinkLine />}
        className="border border-divider !font-normal"
      >
        <SelectValue placeholder="All Networks" />
      </SelectTrigger>
      <SelectContent className="min-w-[250px]">
        {networkFilters.map((network) => {
          return (
            <SelectItem
              key={network.value}
              value={network.value}
              leftIcon={network.icon ? <network.icon /> : undefined}
            >
              {network.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
