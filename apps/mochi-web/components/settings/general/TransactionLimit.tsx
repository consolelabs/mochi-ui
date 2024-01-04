import { Button, IconButton, Switch, Typography } from '@mochi-ui/core'
import { EditLine, TrashBinLine } from '@mochi-ui/icons'
import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { actionList } from '~constants/settings'
import { utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { ResponseGeneralSettingData } from '~types/mochi-schema'
import { TransactionLimitModal } from './TransactionLimitModal'

const excludedActionList = ['deposit']

export const TransactionLimit = () => {
  const { control, watch, setValue } =
    useFormContext<ResponseGeneralSettingData>()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'payment.tx_limit_settings',
  })
  const enableTransactionLimit = watch('payment.tx_limit_enable')
  const filteredActionList = actionList
    .filter((each) => !excludedActionList.includes(each.key))
    .filter((each) => !fields.some((field) => field.action === each.key))

  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex justify-between items-center">
        <Typography level="p4">Set the limit for transaction</Typography>
        <Controller
          name="payment.tx_limit_enable"
          control={control}
          render={({ field: { value, onChange, ...rest } }) =>
            fields.length > 0 ? (
              <Switch {...rest} checked={value} onCheckedChange={onChange} />
            ) : (
              <TransactionLimitModal
                actionList={filteredActionList}
                onConfirm={(data) => append(data)}
                onCancel={() => setValue('payment.tx_limit_enable', false)}
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
      {(enableTransactionLimit ? fields : []).map((each, index) => (
        <Controller
          key={each.id}
          name={`payment.tx_limit_settings.${index}`}
          control={control}
          render={({ field }) => (
            <div className="flex items-center rounded-md border border-divider shadow-input">
              <div className="overflow-hidden flex-1 py-2 px-4">
                <Typography level="h8">
                  {
                    actionList.find(
                      (action) => action.key === field.value.action,
                    )?.label
                  }
                </Typography>
                <div className="flex flex-wrap">
                  <Typography level="p5" className="mr-2">
                    Minimum value: $
                    {mochiUtils.formatDigit({ value: field.value.min || 0 })},
                  </Typography>
                  <Typography level="p5">
                    Maximum value: $
                    {mochiUtils.formatDigit({ value: field.value.max || 0 })}
                  </Typography>
                </div>
              </div>
              <TransactionLimitModal
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
                    setValue('payment.tx_limit_enable', false)
                  }
                }}
              >
                <TrashBinLine className="w-5 h-5 text-danger-solid" />
              </IconButton>
            </div>
          )}
        />
      ))}
      {!!enableTransactionLimit && (
        <TransactionLimitModal
          actionList={filteredActionList}
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
