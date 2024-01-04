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
  TextFieldInput,
  TextFieldRoot,
  Typography,
} from '@mochi-ui/core'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ModelDefaultMessageSetting } from '~types/mochi-schema'
import { useDisclosure } from '@dwarvesf/react-hooks'

const schema = z.object({
  action: z.string().min(1, 'This field is required'),
  message: z.string().min(1, 'This field is required'),
})

interface Props {
  actionList: { key: string; label: string }[]
  defaultValues?: ModelDefaultMessageSetting
  onConfirm: (data: ModelDefaultMessageSetting) => void
  trigger: React.ReactNode
  onCancel?: () => void
}

export const MessageModal = ({
  actionList,
  defaultValues = { action: '', message: '' },
  onConfirm,
  trigger,
  onCancel,
}: Props) => {
  const { isOpen, onOpenChange } = useDisclosure()
  const { control, handleSubmit, reset } = useForm<ModelDefaultMessageSetting>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: ModelDefaultMessageSetting) => {
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
              {defaultValues.message ? 'Edit' : 'Add'} Default Message
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
              name="message"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} className="w-full mt-4">
                  <FormLabel>Default message</FormLabel>
                  <TextFieldRoot>
                    <TextFieldInput
                      {...field}
                      placeholder="Enter message"
                      autoComplete="off"
                    />
                  </TextFieldRoot>
                  <FormErrorMessage>
                    {fieldState.error?.message}
                  </FormErrorMessage>
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
