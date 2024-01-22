import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  Typography,
} from '@mochi-ui/core'
import clsx from 'clsx'
import React, { useState } from 'react'
import { DraggingStyle } from 'react-beautiful-dnd'
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form'
import { TokenAvatar } from '~cpn/TokenAvatar'
import { DndItem, DndWrapper } from '~cpn/base/dnd'
import { useWalletStore } from '~store'
import { ModelPayToken, ResponseGeneralSettingData } from '~types/mochi-schema'

export const TokenPriorityModal = () => {
  const { watch, setValue } = useFormContext<ResponseGeneralSettingData>()
  const defaultValues = watch('payment.prioritized_token') || []

  const { control, getValues, reset } = useForm<{
    prioritizedTokens: ModelPayToken[]
  }>()
  const { fields, move } = useFieldArray({
    control,
    name: 'prioritizedTokens',
  })
  const [modalOffset, setModalOffset] = useState(0)
  const { wallets } = useWalletStore()
  const tokenList = wallets
    .flatMap((w) => w.balances)
    .flatMap((each) => each.token)

  const onSubmit = () => {
    setValue('payment.prioritized_token', getValues().prioritizedTokens, {
      shouldDirty: true,
    })
  }

  return (
    <Modal
      modal
      onOpenChange={(open) => {
        if (open) {
          reset({ prioritizedTokens: defaultValues })
        }
      }}
    >
      <ModalTrigger asChild>
        <Button variant="outline" color="neutral">
          Edit
        </Button>
      </ModalTrigger>
      <ModalPortal>
        <ModalOverlay />
        <ModalContent
          className="w-full max-w-sm"
          ref={(ref) => {
            if (ref) {
              const { top } = ref.getBoundingClientRect()
              setModalOffset(top)
            }
          }}
        >
          <ModalTitle className="text-center">
            Default token priority
          </ModalTitle>
          <ScrollArea className={clsx('mt-4', { 'h-96': fields.length > 8 })}>
            <ScrollAreaViewport>
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
                    className="h-12"
                    handleProps={(provided, snapshot) => ({
                      style: {
                        ...provided.draggableProps.style,
                        left: 'auto !important',
                        top: snapshot.isDragging
                          ? (provided.draggableProps.style as DraggingStyle)
                              .top - modalOffset
                          : 'auto !important',
                      },
                    })}
                  >
                    <Controller
                      key={each.id}
                      name={`prioritizedTokens.${index}`}
                      control={control}
                      render={({ field }) => {
                        const token = tokenList.find(
                          (t) => t.id === field.value.id,
                        )
                        return (
                          <div className="flex flex-1 items-center space-x-3.5 px-4">
                            <Typography level="p5" className="w-7">
                              {index + 1}
                            </Typography>
                            <TokenAvatar
                              src={token?.icon || ''}
                              name={token?.symbol || ''}
                              smallSrc={token?.chain?.icon}
                              chainName={token?.chain?.symbol}
                            />
                            <Typography level="p5" className="flex-1">
                              {token?.symbol}
                            </Typography>
                          </div>
                        )
                      }}
                    />
                  </DndItem>
                ))}
              </DndWrapper>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar>
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
          </ScrollArea>
          <div className="grid w-full grid-cols-2 gap-3 mt-8">
            <ModalTrigger asChild>
              <Button variant="outline" color="neutral">
                Cancel
              </Button>
            </ModalTrigger>
            <ModalTrigger asChild>
              <Button onClick={onSubmit}>Confirm</Button>
            </ModalTrigger>
          </div>
        </ModalContent>
      </ModalPortal>
    </Modal>
  )
}
