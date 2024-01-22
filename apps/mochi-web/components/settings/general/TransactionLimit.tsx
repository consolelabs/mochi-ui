import {
  Button,
  IconButton,
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderDescription,
  SectionHeaderTitle,
  Switch,
  Typography,
} from '@mochi-ui/core'
import { EditLine, TrashBin2Line } from '@mochi-ui/icons'
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
      <Controller
        name="payment.tx_limit_enable"
        control={control}
        render={({ field: { value, onChange, ...rest } }) => (
          <SectionHeader
            wrapActionsOnMobile={false}
            className="!grid-cols-[1fr,auto]"
          >
            <SectionHeaderTitle className="font-normal">
              Set the limit for transaction
            </SectionHeaderTitle>
            <SectionHeaderDescription>
              Tailor transaction limits to your preferences through convenient
              settings.
            </SectionHeaderDescription>
            <SectionHeaderActions>
              {fields.length > 0 ? (
                <Switch {...rest} checked={value} onCheckedChange={onChange} />
              ) : (
                <TransactionLimitModal
                  actionList={filteredActionList}
                  onConfirm={(data) => append(data)}
                  onCancel={() =>
                    setValue('payment.tx_limit_enable', false, {
                      shouldDirty: true,
                    })
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
              )}
            </SectionHeaderActions>
          </SectionHeader>
        )}
      />
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
                    {mochiUtils.formatDigit({ value: field.value.min || 0 })};
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
                  <IconButton
                    label="Edit"
                    color="neutral"
                    variant="outline"
                    className="px-1 py-1"
                  >
                    <EditLine className="w-4 h-4" />
                  </IconButton>
                }
              />
              <IconButton
                label="Delete"
                color="neutral"
                variant="outline"
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
          actionList={filteredActionList}
          onConfirm={(data) => append(data)}
          trigger={
            <Button color="neutral" variant="outline" className="w-fit">
              Add a new limit
            </Button>
          }
        />
      )}
    </div>
  )
}
