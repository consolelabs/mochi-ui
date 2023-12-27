import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@mochi-ui/core'
import { LinkLine } from '@mochi-ui/icons'
import { networkFilters } from '~constants/transactions'

export type ChainPickerProps = {
  value: string
  onChange: (value: string) => void
}

export const ChainPicker = (props: ChainPickerProps) => {
  const { value, onChange } = props

  const selectedNetwork = networkFilters.find(
    (network) => network.value === value,
  )

  return (
    <Select value={value} onChange={(v) => onChange(v === 'all' ? '' : v)}>
      <SelectTrigger
        leftIcon={
          // eslint-disable-next-line
          selectedNetwork ? (
            selectedNetwork.icon ? (
              <selectedNetwork.icon />
            ) : undefined
          ) : (
            <LinkLine />
          )
        }
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
