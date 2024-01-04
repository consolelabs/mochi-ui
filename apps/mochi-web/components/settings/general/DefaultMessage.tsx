import { Button, IconButton, Switch, Typography } from '@mochi-ui/core'
import { EditLine, TrashBin2Line } from '@mochi-ui/icons'
import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { actionList } from '~constants/settings'
import { ResponseGeneralSettingData } from '~types/mochi-schema'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { MessageModal } from './MessageModal'

export const DefaultMessage = () => {
  const { isOpen: isOpenMessageModal, onOpenChange: onOpenChangeMessageModal } =
    useDisclosure()
  const { control, watch, setValue } =
    useFormContext<ResponseGeneralSettingData>()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'payment.default_message_settings',
  })
  const enableDefaultMessage = watch('payment.default_message_enable')

  return (
    <div className="flex flex-col w-full space-y-2">
      <div className="flex items-center justify-between">
        <Typography level="p4">Default message</Typography>
        <Controller
          name="payment.default_message_enable"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => (
            <Switch
              {...rest}
              checked={value}
              onCheckedChange={(checked) => {
                onChange(checked)
                if (checked && !fields.length) {
                  onOpenChangeMessageModal(true)
                }
              }}
            />
          )}
        />
      </div>
      {(enableDefaultMessage ? fields : []).map((each, index) => (
        <Controller
          key={each.id}
          name={`payment.default_message_settings.${index}`}
          control={control}
          render={({ field }) => (
            <div className="flex items-center border rounded-md border-divider shadow-input space-x-2 px-4">
              <div className="flex-1 py-2 overflow-hidden">
                <Typography level="h8">
                  {
                    actionList.find(
                      (action) => action.key === field.value.action,
                    )?.label
                  }
                </Typography>
                <Typography level="p5" noWrap>
                  {field.value.message}
                </Typography>
              </div>
              <MessageModal
                defaultValues={field.value}
                onConfirm={(data) => update(index, data)}
                trigger={
                  <IconButton label="Edit" color="white" className="px-1 py-1">
                    <EditLine className="w-4 h-4" />
                  </IconButton>
                }
                open={isOpenMessageModal}
                onOpenChange={onOpenChangeMessageModal}
              />
              <IconButton
                label="Delete"
                color="white"
                className="px-1.5 py-1.5"
                onClick={() => {
                  remove(index)
                  if (fields.length === 1) {
                    setValue('payment.default_message_enable', false)
                  }
                }}
              >
                <TrashBin2Line className="w-3 h-3" />
              </IconButton>
            </div>
          )}
        />
      ))}
      {!!enableDefaultMessage && (
        <MessageModal
          onConfirm={(data) => {
            append(data)
            onOpenChangeMessageModal(false)
          }}
          trigger={
            <Button color="white" className="w-fit">
              Add a new default message
            </Button>
          }
          open={isOpenMessageModal}
          onOpenChange={(open) => {
            onOpenChangeMessageModal(open)
            if (!open && !fields.length) {
              setValue('payment.default_message_enable', false)
            }
          }}
        />
      )}
    </div>
  )
}
