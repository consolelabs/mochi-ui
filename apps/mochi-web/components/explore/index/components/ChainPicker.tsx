import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@mochi-ui/core'
import { LinkLine } from '@mochi-ui/icons'
import { useEffect, useState } from 'react'
import { API } from '~constants/api'
import { ModelChain } from '~types/mochi-pay-schema'

export type ChainPickerProps = {
  value: string
  onChange: (value: string) => void
}

export const ChainPicker = (props: ChainPickerProps) => {
  const { value = 'all', onChange } = props

  const [chains, setChains] = useState<ModelChain[]>([])
  useEffect(() => {
    API.MOCHI_PAY.get('/chains')
      .json((r) => r)
      .then((r) => {
        setChains(r.data)
      })
  }, [])

  const selectedChain = chains.find((c) => c.chain_id === value)

  return (
    <Select value={value} onChange={(v) => onChange(v === 'all' ? '' : v)}>
      <SelectTrigger
        appearance="form"
        color="white"
        hasPadding
        leftIcon={
          // eslint-disable-next-line
          selectedChain ? (
            selectedChain.icon ? (
              <img
                src={selectedChain.icon}
                alt={selectedChain.name}
                className="w-6 h-6"
              />
            ) : undefined
          ) : (
            <LinkLine />
          )
        }
        className="border border-divider !font-normal"
      >
        <SelectValue placeholder="All Networks" />
      </SelectTrigger>
      <SelectContent className="min-w-[250px] max-h-96">
        <SelectItem value="all" leftIcon={<LinkLine />}>
          All Networks
        </SelectItem>
        {chains.map((chain) => {
          return (
            <SelectItem
              key={chain.chain_id}
              value={chain.chain_id || ''}
              leftIcon={
                chain.icon ? (
                  <img src={chain.icon} alt={chain.name} className="w-6 h-6" />
                ) : undefined
              }
            >
              {chain.name}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
