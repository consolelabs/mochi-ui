import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FormLabel,
  IconButton,
  List,
  TextFieldInput,
  Typography,
} from '@mochi-ui/core'
import { Bag, ChevronDownLine, MenuSolid, TrashBinLine } from '@mochi-ui/icons'
import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { TokenAvatar } from '~cpn/TokenAvatar'
import { useWalletStore } from '~store'
import { ResponseGeneralSettingData } from '~types/mochi-schema'

export const TokenPriority = () => {
  const { control, watch } = useFormContext<ResponseGeneralSettingData>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'payment.prioritized_token',
  })
  const [tokenQuery, setTokenQuery] = React.useState('')
  const { wallets } = useWalletStore()
  const balances = wallets.flatMap((w) => w.balances)

  const currentTokenPriorityIds =
    watch('payment.prioritized_token')?.map((each) => each.id) || []
  const tokenList = balances.flatMap((each) => each.token || [])
  const filteredTokenList = tokenList
    .filter((token) => !currentTokenPriorityIds.includes(token.id))
    .filter(
      (token) => token.symbol?.toLowerCase().includes(tokenQuery.toLowerCase()),
    )

  return (
    <div className="flex flex-col w-full max-w-md space-y-2">
      <FormLabel>Default token prioirty</FormLabel>
      {fields.map((each, index) => (
        <Controller
          key={each.id}
          name={`payment.prioritized_token.${index}`}
          control={control}
          render={({ field }) => {
            const token = tokenList.find((t) => t.id === field.value.id)
            return (
              <div className="flex items-center h-10 border rounded-md border-divider shadow-input">
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
          <List
            rootClassName="max-h-[300px] overflow-y-auto"
            data={filteredTokenList}
            renderItem={(item) => (
              <DropdownMenuItem
                textValue=""
                onClick={() => append({ ...item, chain: undefined })}
              >
                {item.symbol}
              </DropdownMenuItem>
            )}
            ListEmpty={
              <div className="flex flex-col items-center justify-center py-10">
                <Bag className="w-14 h-14 text-neutral-500" />
                <Typography level="h7" color="textSecondary">
                  No tokens
                </Typography>
              </div>
            }
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
