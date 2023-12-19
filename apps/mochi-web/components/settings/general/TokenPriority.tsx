import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FormLabel,
  IconButton,
  TextFieldInput,
  Typography,
} from '@mochi-ui/core'
import { ChevronDownLine, MenuSolid, TrashBinLine } from '@mochi-ui/icons'
import React from 'react'
import {
  Control,
  Controller,
  UseFormWatch,
  useFieldArray,
} from 'react-hook-form'
import { TokenAvatar } from '~cpn/base/token-avatar'
import { GeneralFormValue } from './types'

const tokenList = [
  {
    id: '941f0fb1-00da-49dc-a538-5e81fc874cb4',
    name: 'Icy',
    symbol: 'ICY',
    decimal: 18,
    chain_id: '137',
    native: false,
    address: '0x8D57d71B02d71e1e449a0E459DE40473Eb8f4a90',
    icon: 'https://cdn.discordapp.com/emojis/1049620715374133288.webp?size=240&quality=lossless',
    coin_gecko_id: 'icy',
    price: 1.5,
    chain: {
      id: '7303f2f8-b6d9-454d-aa92-880569fa5295',
      chain_id: '137',
      name: 'Polygon Mainnet',
      symbol: 'MATIC',
      rpc: 'https://polygon.llamarpc.com',
      explorer: 'https://polygonscan.com',
      icon: 'https://cdn.discordapp.com/emojis/928216430535671818.png?size=240&quality=lossless',
      type: 'evm',
    },
  },
  {
    id: 'd0bf0f44-e951-4f81-8643-3e6b9b0841d8',
    name: 'Ethereum',
    symbol: 'ETH',
    decimal: 18,
    chain_id: '42161',
    native: true,
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    icon: '',
    coin_gecko_id: 'ethereum',
    price: 2129.75,
    chain: {
      id: 'b1065911-fd00-4424-bc7c-03868e6d1ed1',
      chain_id: '42161',
      name: 'Arbitrum',
      symbol: 'ARB',
      rpc: 'https://arbitrum.llamarpc.com',
      explorer: 'https://arbiscan.io',
      icon: '',
      type: 'evm',
    },
  },
  {
    id: '61388b7c-5505-4fdf-8084-077422369a93',
    name: 'Fantom',
    symbol: 'FTM',
    decimal: 18,
    chain_id: '250',
    native: true,
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    icon: '',
    coin_gecko_id: 'fantom',
    price: 0.380276,
    chain: {
      id: '7303f2f8-b6d9-454d-aa92-880569fa5296',
      chain_id: '250',
      name: 'Fantom Opera',
      symbol: 'FTM',
      rpc: 'https://rpc.ftm.tools',
      explorer: 'https://ftmscan.com',
      icon: 'https://cdn.discordapp.com/emojis/928216448902508564.png?size=240&quality=lossless',
      type: 'evm',
    },
  },
]

interface Props {
  control: Control<GeneralFormValue>
  watch: UseFormWatch<GeneralFormValue>
}

export const TokenPriority = ({ control, watch }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'defaultTokenPriority',
  })
  const [tokenQuery, setTokenQuery] = React.useState('')

  const currentTokenPriority = watch('defaultTokenPriority')
  const currentTokenPriorityIds = currentTokenPriority.map((token) => token.id)
  const filteredTokenList = tokenList
    .filter((token) => !currentTokenPriorityIds.includes(token.id))
    .filter((token) =>
      token.symbol.toLowerCase().includes(tokenQuery.toLowerCase()),
    )

  return (
    <div className="flex flex-col space-y-2">
      <FormLabel>Default token prioirty</FormLabel>
      {fields.map((each, index) => (
        <Controller
          key={each.id}
          name={`defaultTokenPriority.${index}`}
          control={control}
          render={({ field }) => {
            const token = tokenList.find((token) => token.id === field.value.id)
            return (
              <div className="min-w-[400px] border border-divider w-fit rounded-md shadow-input h-10 flex items-center">
                <IconButton
                  label="Move"
                  variant="ghost"
                  color="white"
                  className="cursor-grab active:cursor-grabbing"
                >
                  <MenuSolid className="w-5 h-5" />
                </IconButton>
                <TokenAvatar
                  src={token?.icon || ''}
                  name={token?.symbol || ''}
                />
                <Typography level="p5" className="flex-1 ml-2">
                  {token?.symbol}
                </Typography>
                <IconButton
                  label="Delete"
                  variant="ghost"
                  color="white"
                  onClick={() => remove(index)}
                >
                  <TrashBinLine className="w-5 h-5 text-danger-solid" />
                </IconButton>
              </div>
            )
          }}
        />
      ))}
      <DropdownMenu onOpenChange={() => setTokenQuery('')}>
        <DropdownMenuTrigger asChild>
          <Button color="white" className="pl-2 pr-2 w-fit">
            Add a default token
            <ChevronDownLine />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <TextFieldInput
            autoFocus
            value={tokenQuery}
            onChange={(e) => setTokenQuery(e.target.value)}
          />
          {filteredTokenList.map((token) => (
            <DropdownMenuItem
              key={token.id}
              textValue=""
              onClick={() => append({ id: token.id })}
            >
              {token.symbol}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
