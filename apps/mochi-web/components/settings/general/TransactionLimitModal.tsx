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
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ModelTxLimitSetting } from '~types/mochi-schema'
import { useDisclosure } from '@dwarvesf/react-hooks'

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
  actionList: { key: string; label: string }[]
  defaultValues?: ModelTxLimitSetting
  onConfirm: (data: ModelTxLimitSetting) => void
  trigger: React.ReactNode
  onCancel?: () => void
}

export const TransactionLimitModal = ({
  actionList,
  defaultValues = {},
  onConfirm,
  trigger,
  onCancel,
}: Props) => {
  const { isOpen, onOpenChange } = useDisclosure()
  const { control, handleSubmit, reset } = useForm<ModelTxLimitSetting>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: ModelTxLimitSetting) => {
    onConfirm(data)
    onOpenChange(false)
  }

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open)
        reset(defaultValues)
        if (!open) {
          onCancel?.()
        }
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
                    <SelectTrigger
                      appearance="form"
                      className="justify-between h-10"
                    >
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
                  <FormLabel>Minimum value</FormLabel>
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
                      className="w-1/2"
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
                  <FormLabel>Maximum value</FormLabel>
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
                      className="w-1/2"
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
