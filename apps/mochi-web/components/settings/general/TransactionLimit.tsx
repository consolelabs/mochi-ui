import { Button, IconButton, Switch, Typography } from '@mochi-ui/core'
import { EditLine, TrashBin2Line } from '@mochi-ui/icons'
import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { actionList } from '~constants/settings'
import { utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { ResponseGeneralSettingData } from '~types/mochi-schema'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { TransactionLimitModal } from './TransactionLimitModal'

export const TransactionLimit = () => {
  const {
    isOpen: isOpenTransactionLimit,
    onOpenChange: onOpenChangeTransactionLimit,
  } = useDisclosure()
  const { control, watch, setValue } =
    useFormContext<ResponseGeneralSettingData>()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'payment.tx_limit_settings',
  })
  const enableTransactionLimit = watch('payment.tx_limit_enable')

  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex justify-between items-center">
        <Typography level="p4">Set the limit for transaction</Typography>
        <Controller
          name="payment.tx_limit_enable"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => (
            <Switch
              {...rest}
              checked={value}
              onCheckedChange={(checked) => {
                onChange(checked)
                if (checked && !fields.length) {
                  onOpenChangeTransactionLimit(true)
                }
              }}
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
            <div className="flex items-center rounded-md border border-divider shadow-input space-x-2 px-4">
              <div className="overflow-hidden flex-1 py-2">
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
                  <IconButton label="Edit" color="white" className="px-1 py-1">
                    <EditLine className="w-4 h-4" />
                  </IconButton>
                }
                open={isOpenTransactionLimit}
                onOpenChange={onOpenChangeTransactionLimit}
              />
              <IconButton
                label="Delete"
                color="white"
                className="px-1.5 py-1.5"
                onClick={() => {
                  remove(index)
                  if (fields.length === 1) {
                    setValue('payment.tx_limit_enable', false)
                  }
                }}
              >
                <TrashBin2Line className="w-3 h-3" />
              </IconButton>
            </div>
          )}
        />
      ))}
      {!!enableTransactionLimit && (
        <TransactionLimitModal
          onConfirm={(data) => {
            append(data)
            onOpenChangeTransactionLimit(false)
          }}
          trigger={
            <Button color="white" className="w-fit">
              Add a new limit
            </Button>
          }
          open={isOpenTransactionLimit}
          onOpenChange={(open) => {
            onOpenChangeTransactionLimit(open)
            if (!open && !fields.length) {
              setValue('payment.tx_limit_enable', false)
            }
          }}
        />
      )}
    </div>
  )
}
