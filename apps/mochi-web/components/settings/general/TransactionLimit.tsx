import {
  Button,
  FormLabel,
  IconButton,
  Switch,
  Typography,
} from '@mochi-ui/core'
import { EditLine, TrashBinLine } from '@mochi-ui/icons'
import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { actionList } from '~constants/settings'
import { utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { ResponseGeneralSettingData } from '~types/mochi-schema'
import { TransactionLimitModal } from './TransactionLimitModal'

export const TransactionLimit = () => {
  const { control, watch } = useFormContext<ResponseGeneralSettingData>()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'payment.tx_limit_settings',
  })
  const enableTransactionLimit = watch('payment.tx_limit_enable')

  return (
    <div className="flex flex-col space-y-2 w-full max-w-md">
      <div className="flex justify-between items-center">
        <FormLabel>Set the limit for transaction</FormLabel>
        <Controller
          name="payment.tx_limit_enable"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => (
            <Switch
              {...rest}
              checked={value}
              onCheckedChange={(checked) => onChange(checked)}
            />
          )}
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
                onClick={() => remove(index)}
              >
                <TrashBinLine className="w-5 h-5 text-danger-solid" />
              </IconButton>
            </div>
          )}
        />
      ))}
      {!!enableTransactionLimit && (
        <TransactionLimitModal
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
