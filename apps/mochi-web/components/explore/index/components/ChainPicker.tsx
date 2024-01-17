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

const sortOrder = ['SOL']

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
        color="neutral"
        variant="plain"
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
        className="border border-divider !font-normal bg-background-body"
      >
        <SelectValue placeholder="All Networks" />
      </SelectTrigger>
      <SelectContent className="max-h-96 min-w-[250px]">
        <SelectItem value="all" leftIcon={<LinkLine />}>
          All Networks
        </SelectItem>
        {chains
          .sort((a, b) => {
            const indexA = sortOrder.findIndex((symbol) => symbol === a.symbol)
            const indexB = sortOrder.findIndex((symbol) => symbol === b.symbol)

            if (indexA === -1) return 1
            if (indexB === -1) return -1

            if (indexA > indexB) return 1
            if (indexA < indexB) return -1
            return 0
          })
          .map((chain) => {
            return (
              <SelectItem
                key={chain.chain_id}
                value={chain.chain_id || ''}
                leftIcon={
                  chain.icon ? (
                    <img
                      src={chain.icon}
                      alt={chain.name}
                      className="w-6 h-6"
                    />
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
