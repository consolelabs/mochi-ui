import {
  IconButton,
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderDescription,
  SectionHeaderTitle,
  Switch,
  Typography,
} from '@mochi-ui/core'
import { EditLine } from '@mochi-ui/icons'
import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { actionList, defaultMessages } from '~constants/settings'
import { ResponseGeneralSettingData } from '~types/mochi-schema'
import { useLoginWidget } from '@mochi-web3/login-widget'
import { truncateWallet } from '~utils/string'
import { MessageModal } from './MessageModal'

const excludedActionList = ['deposit', 'withdraw']

export const DefaultMessage = () => {
  const { profile } = useLoginWidget()
  const { control, watch, setValue } =
    useFormContext<ResponseGeneralSettingData>()
  const { fields, update } = useFieldArray({
    control,
    name: 'payment.default_message_settings',
  })
  const enableDefaultMessage = watch('payment.default_message_enable')
  const filteredActionList = actionList
    .filter((each) => !excludedActionList.includes(each.key))
    .filter((each) => !fields.some((field) => field.action === each.key))

  return (
    <div className="flex flex-col w-full space-y-2">
      <Controller
        name="payment.default_message_enable"
        control={control}
        render={({ field: { value, onChange, ...rest } }) => (
          <SectionHeader
            wrapActionsOnMobile={false}
            className="!grid-cols-[1fr,auto]"
          >
            <SectionHeaderTitle className="font-normal">
              Default message
            </SectionHeaderTitle>
            <SectionHeaderDescription>
              Allows you to pre-define messages that will automatically be
              displayed.
            </SectionHeaderDescription>
            <SectionHeaderActions>
              <Switch
                {...rest}
                checked={value}
                onCheckedChange={(checked) => {
                  onChange(checked)
                  setValue(
                    'payment.default_message_settings',
                    checked
                      ? defaultMessages(
                          truncateWallet(profile?.profile_name) || 'unknown',
                        )
                      : [],
                    { shouldDirty: true },
                  )
                }}
              />
            </SectionHeaderActions>
          </SectionHeader>
        )}
      />
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
              <Controller
                name={`payment.default_message_settings.${index}.enable`}
                control={control}
                render={({ field: { value, onChange, ...rest } }) => (
                  <Switch
                    {...rest}
                    checked={value}
                    onCheckedChange={onChange}
                  />
                )}
              />
            </div>
          )}
        />
      ))}
    </div>
  )
}
