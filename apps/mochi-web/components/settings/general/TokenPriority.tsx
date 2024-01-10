import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  List,
  TextFieldInput,
  Typography,
} from '@mochi-ui/core'
import { Bag, ChevronDownLine, TrashBin2Line } from '@mochi-ui/icons'
import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { TokenAvatar } from '~cpn/TokenAvatar'
import { DndItem, DndWrapper } from '~cpn/base/dnd'
import { useWalletStore } from '~store'
import { ResponseGeneralSettingData } from '~types/mochi-schema'

export const TokenPriority = () => {
  const { control, watch } = useFormContext<ResponseGeneralSettingData>()
  const { fields, append, remove, move } = useFieldArray({
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
    <div className="flex flex-col w-full space-y-2">
      <Typography level="p4">Default token prioirty</Typography>
      <DndWrapper
        componentProps={{
          context: {
            onDragEnd: ({ source, destination }) => {
              if (destination) {
                move(source.index, destination.index)
              }
            },
          },
          droppable: {
            droppableId: 'token-priority',
          },
        }}
      >
        {fields.map((each, index) => (
          <DndItem
            key={each.id}
            draggableId={each.id}
            index={index}
            className="py-2"
          >
            <Controller
              key={each.id}
              name={`payment.prioritized_token.${index}`}
              control={control}
              render={({ field }) => {
                const token = tokenList.find((t) => t.id === field.value.id)
                return (
                  <>
                    <div className="flex flex-1 items-center space-x-3.5 px-4">
                      <TokenAvatar
                        src={token?.icon || ''}
                        name={token?.symbol || ''}
                      />
                      <Typography level="p5" className="flex-1">
                        {token?.symbol}
                      </Typography>
                    </div>
                    <IconButton
                      label="Delete"
                      color="neutral"
                      variant="outline"
                      className="px-1.5 py-1.5 mx-4"
                      onClick={() => remove(index)}
                    >
                      <TrashBin2Line className="w-3 h-3" />
                    </IconButton>
                  </>
                )
              }}
            />
          </DndItem>
        ))}
      </DndWrapper>
      <DropdownMenu onOpenChange={() => setTokenQuery('')}>
        <DropdownMenuTrigger asChild>
          <Button color="neutral" variant="outline" className="pl-2 pr-2 w-fit">
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
