import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalPortal,
  ModalTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TextFieldDecorator,
  TextFieldInput,
  TextFieldRoot,
  Typography,
} from '@mochi-ui/core'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { actionList } from '~constants/settings'
import { ModelToken } from '~types/mochi-pay-schema'
import { TokenAvatar } from '~cpn/TokenAvatar'
import { TransactionLimit } from './types'

const schema = z
  .object({
    action: z.string().min(1, 'This field is required'),
    minAmount: z
      .string()
      .min(1, 'Amount is required')
      .refine((value) => !Number.isNaN(Number(value)), {
        path: ['minAmount'],
        message: 'Amount must be a number',
      }),
    minToken: z.string().min(1, 'Token is required'),
    maxAmount: z
      .string()
      .min(1, 'Amount is required')
      .refine((value) => !Number.isNaN(Number(value)), {
        path: ['maxAmount'],
        message: 'Amount must be a number',
      }),
    maxToken: z.string().min(1, 'Token is required'),
  })
  .refine((data) => Number(data.maxAmount) > Number(data.minAmount), {
    path: ['maxAmount'],
    message: 'Max amount must be greater than min amount',
  })

interface Props {
  defaultValues?: TransactionLimit
  onConfirm: (data: TransactionLimit) => void
  trigger: React.ReactNode
  tokenList: ModelToken[]
}

export const TransactionLimitModal = ({
  defaultValues = {
    action: '',
    minAmount: '',
    maxAmount: '',
    minToken: '',
    maxToken: '',
  },
  onConfirm,
  trigger,
  tokenList,
}: Props) => {
  const [open, setOpen] = useState(false)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionLimit>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: TransactionLimit) => {
    setOpen(false)
    onConfirm(data)
  }

  return (
    <Modal
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        reset(defaultValues)
      }}
    >
      <ModalTrigger asChild>{trigger}</ModalTrigger>
      <ModalPortal>
        <ModalOverlay />
        <ModalContent className="w-full max-w-sm">
          <form
            className="flex flex-col items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography level="h6">
              {defaultValues.action ? 'Edit' : 'Add'} a new limit
            </Typography>
            <Controller
              name="action"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} className="mt-8 w-full">
                  <FormLabel>Action</FormLabel>
                  <Select {...field}>
                    <SelectTrigger className="justify-between h-10 border border-divider">
                      <SelectValue placeholder="Choose action" />
                    </SelectTrigger>
                    <SelectContent>
                      {actionList.map((each) => (
                        <SelectItem key={each.key} value={each.key}>
                          {each.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormErrorMessage>
                    {fieldState.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              name="minAmount"
              control={control}
              render={({ field }) => (
                <FormControl
                  error={
                    !!errors.minAmount?.message || !!errors.minToken?.message
                  }
                  className="mt-4 w-full"
                >
                  <FormLabel>Minimun value</FormLabel>
                  <TextFieldRoot className="pr-0">
                    <TextFieldInput
                      {...field}
                      placeholder="Enter amount"
                      autoComplete="off"
                      type="number"
                      min={0}
                      step="any"
                    />
                    <TextFieldDecorator>
                      <Controller
                        name="minToken"
                        control={control}
                        render={({ field, fieldState }) => (
                          <FormControl error={!!fieldState.error}>
                            <Select {...field}>
                              <SelectTrigger className="justify-between h-10 border-l min-w-[140px] border-divider">
                                <SelectValue placeholder="Choose token" />
                              </SelectTrigger>
                              <SelectContent>
                                {tokenList.map((each) => (
                                  <SelectItem
                                    key={each.id}
                                    value={String(each.id)}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <TokenAvatar
                                        src={each.icon || ''}
                                        name={each.symbol || ''}
                                      />
                                      <Typography level="p5">
                                        {each.symbol}
                                      </Typography>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        )}
                      />
                    </TextFieldDecorator>
                  </TextFieldRoot>
                  <FormErrorMessage>
                    {errors.minAmount?.message || errors.minToken?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              name="maxAmount"
              control={control}
              render={({ field }) => (
                <FormControl
                  error={
                    !!errors.maxAmount?.message || !!errors.maxToken?.message
                  }
                  className="mt-4 w-full"
                >
                  <FormLabel>Maximun value</FormLabel>
                  <TextFieldRoot className="pr-0">
                    <TextFieldInput
                      {...field}
                      placeholder="Enter amount"
                      autoComplete="off"
                      type="number"
                      min={0}
                      step="any"
                    />
                    <TextFieldDecorator>
                      <Controller
                        name="maxToken"
                        control={control}
                        render={({ field, fieldState }) => (
                          <FormControl error={!!fieldState.error}>
                            <Select {...field}>
                              <SelectTrigger className="justify-between h-10 border-l min-w-[140px] border-divider">
                                <SelectValue placeholder="Choose token" />
                              </SelectTrigger>
                              <SelectContent>
                                {tokenList.map((each) => (
                                  <SelectItem
                                    key={each.id}
                                    value={String(each.id)}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <TokenAvatar
                                        src={each.icon || ''}
                                        name={each.symbol || ''}
                                      />
                                      <Typography level="p5">
                                        {each.symbol}
                                      </Typography>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        )}
                      />
                    </TextFieldDecorator>
                  </TextFieldRoot>
                  <FormErrorMessage>
                    {errors.maxAmount?.message || errors.maxToken?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <div className="grid grid-cols-2 gap-3 mt-8 w-full">
              <ModalTrigger asChild>
                <Button color="white">Cancel</Button>
              </ModalTrigger>
              <Button type="submit">Confirm</Button>
            </div>
          </form>
        </ModalContent>
      </ModalPortal>
    </Modal>
  )
}
