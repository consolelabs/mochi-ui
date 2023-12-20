import {
  Button,
  FormLabel,
  IconButton,
  Switch,
  Typography,
} from '@mochi-ui/core'
import { EditLine, TrashBinLine } from '@mochi-ui/icons'
import React from 'react'
import {
  Control,
  Controller,
  UseFormWatch,
  useFieldArray,
} from 'react-hook-form'
import { actionList } from '~constants/settings'
import { utils as mochiUtils } from '@consolelabs/mochi-ui'
import { GeneralFormValue } from './types'
import { TransactionLimitModal } from './TransactionLimitModal'

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

export const TransactionLimit = ({ control, watch }: Props) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'transactionLimit',
  })
  const enableTransactionLimit = watch('enableTransactionLimit')

  return (
    <div className="flex flex-col w-full max-w-md space-y-2">
      <div className="flex items-center justify-between">
        <FormLabel>Set the limit for transaction</FormLabel>
        <Controller
          name="enableTransactionLimit"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => (
            <Switch
              {...rest}
              checked={value}
              onCheckedChange={(checked) => onChange(checked)}
            />
          )}
        />
      </div>
      {(enableTransactionLimit ? fields : []).map((each, index) => (
        <Controller
          key={each.id}
          name={`transactionLimit.${index}`}
          control={control}
          render={({ field }) => {
            const minToken = tokenList.find(
              (token) => token.id === field.value.minToken,
            )
            const minAmount = mochiUtils.formatDigit({
              value: field.value.minAmount,
            })
            const minUsd =
              Number(field.value.minAmount) * (minToken?.price || 0)
            const minUsdValue = mochiUtils.formatUsdDigit(minUsd)
            const maxToken = tokenList.find(
              (token) => token.id === field.value.maxToken,
            )
            const maxAmount = mochiUtils.formatDigit({
              value: field.value.maxAmount,
            })
            const maxUsd =
              Number(field.value.maxAmount) * (maxToken?.price || 0)
            const maxUsdValue = mochiUtils.formatUsdDigit(maxUsd)
            return (
              <div className="flex items-center border rounded-md border-divider shadow-input">
                <div className="flex-1 px-4 py-2 overflow-hidden">
                  <Typography level="h8">
                    {
                      actionList.find(
                        (action) => action.key === field.value.action,
                      )?.label
                    }
                  </Typography>
                  <div className="flex flex-wrap">
                    <Typography level="p5" className="mr-2">
                      Minimum value: {minAmount} {minToken?.symbol} (&#8776;{' '}
                      {minUsdValue}),
                    </Typography>
                    <Typography level="p5">
                      Maximum value: {maxAmount} {maxToken?.symbol} (&#8776;{' '}
                      {maxUsdValue})
                    </Typography>
                  </div>
                </div>
                <TransactionLimitModal
                  tokenList={tokenList}
                  defaultValues={field.value}
                  onConfirm={(data) => update(index, data)}
                  trigger={
                    <IconButton label="Edit" variant="ghost" color="white">
                      <EditLine className="w-5 h-5" />
                    </IconButton>
                  }
                />
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
      {!!enableTransactionLimit && (
        <TransactionLimitModal
          tokenList={tokenList}
          onConfirm={(data) => append(data)}
          trigger={
            <Button color="white" className="w-fit">
              Add a new limit
            </Button>
          }
        />
      )}
    </div>
  )
}
