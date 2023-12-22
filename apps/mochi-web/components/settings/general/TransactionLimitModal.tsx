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
import { ModelTxLimitSetting } from '~types/mochi-schema'

const schema = z
  .object({
    action: z
      .string({ required_error: 'This field is required' })
      .min(1, 'This field is required'),
    min: z
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .min(0, 'Amount must be greater than 0'),
    max: z
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .min(0, 'Amount must be greater than 0'),
  })
  .refine((data) => Number(data.max) > Number(data.min), {
    path: ['max'],
    message: 'Max amount must be greater than min amount',
  })

interface Props {
  defaultValues?: ModelTxLimitSetting
  onConfirm: (data: ModelTxLimitSetting) => void
  trigger: React.ReactNode
}

export const TransactionLimitModal = ({
  defaultValues = {},
  onConfirm,
  trigger,
}: Props) => {
  const [open, setOpen] = useState(false)
  const { control, handleSubmit, reset } = useForm<ModelTxLimitSetting>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: ModelTxLimitSetting) => {
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
                <FormControl error={!!fieldState.error} className="w-full mt-8">
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
              name="min"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl error={!!error?.message} className="w-full mt-4">
                  <FormLabel>Minimun value</FormLabel>
                  <TextFieldRoot>
                    <TextFieldInput
                      {...field}
                      placeholder="Enter amount"
                      autoComplete="off"
                      type="number"
                      step="any"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : '',
                        )
                      }
                    />
                    <TextFieldDecorator>
                      <Typography level="p5">USD</Typography>
                    </TextFieldDecorator>
                  </TextFieldRoot>
                  <FormErrorMessage>{error?.message}</FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              name="max"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl error={!!error?.message} className="w-full mt-4">
                  <FormLabel>Maximun value</FormLabel>
                  <TextFieldRoot>
                    <TextFieldInput
                      {...field}
                      placeholder="Enter amount"
                      autoComplete="off"
                      type="number"
                      step="any"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : '',
                        )
                      }
                    />
                    <TextFieldDecorator>
                      <Typography level="p5">USD</Typography>
                    </TextFieldDecorator>
                  </TextFieldRoot>
                  <FormErrorMessage>{error?.message}</FormErrorMessage>
                </FormControl>
              )}
            />
            <div className="grid w-full grid-cols-2 gap-3 mt-8">
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
