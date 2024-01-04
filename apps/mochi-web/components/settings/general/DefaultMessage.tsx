import { Button, IconButton, Switch, Typography } from '@mochi-ui/core'
import { EditLine, TrashBinLine } from '@mochi-ui/icons'
import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { actionList } from '~constants/settings'
import { ResponseGeneralSettingData } from '~types/mochi-schema'
import { MessageModal } from './MessageModal'

const excludedActionList = ['deposit', 'withdraw']

export const DefaultMessage = () => {
  const { control, watch, setValue } =
    useFormContext<ResponseGeneralSettingData>()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'payment.default_message_settings',
  })
  const enableDefaultMessage = watch('payment.default_message_enable')
  const filteredActionList = actionList
    .filter((each) => !excludedActionList.includes(each.key))
    .filter((each) => !fields.some((field) => field.action === each.key))

  return (
    <div className="flex flex-col w-full space-y-2">
      <div className="flex items-center justify-between">
        <Typography level="p4">Default message</Typography>
        <Controller
          name="payment.default_message_enable"
          control={control}
          render={({ field: { value, onChange, ...rest } }) =>
            fields.length > 0 ? (
              <Switch {...rest} checked={value} onCheckedChange={onChange} />
            ) : (
              <MessageModal
                actionList={filteredActionList}
                onConfirm={(data) => append(data)}
                onCancel={() =>
                  setValue('payment.default_message_enable', false)
                }
                trigger={
                  <div>
                    <Switch
                      {...rest}
                      checked={value}
                      onCheckedChange={onChange}
                    />
                  </div>
                }
              />
            )
          }
        />
      </div>
      {(enableDefaultMessage ? fields : []).map((each, index) => (
        <Controller
          key={each.id}
          name={`payment.default_message_settings.${index}`}
          control={control}
          render={({ field }) => (
            <div className="flex items-center border rounded-md border-divider shadow-input">
              <div className="flex-1 px-4 py-2 overflow-hidden">
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
                actionList={[
                  ...filteredActionList,
                  actionList.find(
                    (action) => action.key === field.value.action,
                  ) || { key: '', label: '' },
                ]}
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
                onClick={() => {
                  remove(index)
                  if (fields.length === 1) {
                    setValue('payment.default_message_enable', false)
                  }
                }}
              >
                <TrashBinLine className="w-5 h-5 text-danger-solid" />
              </IconButton>
            </div>
          )}
        />
      ))}
      {!!enableDefaultMessage && !!filteredActionList.length && (
        <MessageModal
          actionList={filteredActionList}
          onConfirm={(data) => append(data)}
          trigger={
            <Button color="white" className="w-fit">
              Add a new default message
            </Button>
          }
        />
      )}
    </div>
  )
}
