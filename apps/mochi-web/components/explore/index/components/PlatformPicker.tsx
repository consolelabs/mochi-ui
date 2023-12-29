import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@mochi-ui/core'
import { WebSolid } from '@mochi-ui/icons'
import { platformFilters } from '~constants/transactions'

export type PlatformPickerProps = {
  value: string
  onChange: (value: string) => void
}

export const PlatformPicker = (props: PlatformPickerProps) => {
  const { value, onChange } = props

  const selectedPlatform = platformFilters.find(
    (platform) => platform.value === value,
  )

  return (
    <Select value={value} onChange={(v) => onChange(v === 'all' ? '' : v)}>
      <SelectTrigger
        appearance="form"
        color="white"
        leftIcon={selectedPlatform ? <selectedPlatform.icon /> : <WebSolid />}
        className="border border-divider !font-normal capitalize"
      >
        <SelectValue placeholder="All Platforms" />
      </SelectTrigger>
      <SelectContent className="min-w-[250px]">
        {platformFilters.map((platform) => {
          return (
            <SelectItem
              key={platform.value}
              value={platform.value}
              leftIcon={<platform.icon />}
              className="capitalize"
            >
              {platform.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
