import {
  Card,
  FormControl,
  FormErrorMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Typography,
} from '@mochi-ui/core'
import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import {
  platformGroupList,
  platformList,
  targetGroupList,
} from '~constants/settings'
import { ResponseGeneralSettingData } from '~types/mochi-schema'

interface Props {
  name: 'tx' | 'social_accounts' | 'wallets'
}

export const PrivacySetting = ({ name }: Props) => {
  const { control, watch } = useFormContext<ResponseGeneralSettingData>()
  const isCustom = watch(`privacy.${name}.general_platform_group`) === 'custom'
  const { fields, replace } = useFieldArray({
    control,
    name: `privacy.${name}.custom_settings`,
  })

  const onPlatformGroupChange = (value: string) => {
    if (value === 'all') {
      replace([])
    } else {
      replace(
        platformList.map((each) => ({
          target_group: targetGroupList[0].key,
          platform: each.key,
        })),
      )
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Controller
          name={`privacy.${name}.general_target_group`}
          control={control}
          render={({ field, fieldState }) => (
            <FormControl
              error={!!fieldState.error}
              className="flex-1 min-w-[200px]"
            >
              <Select {...field}>
                <SelectTrigger
                  appearance="form"
                  className="justify-between h-10"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {targetGroupList.map((each) => (
                    <SelectItem key={each.key} value={each.key}>
                      {each.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <Typography level="p5">on</Typography>
        <Controller
          name={`privacy.${name}.general_platform_group`}
          control={control}
          render={({ field, fieldState }) => (
            <FormControl
              error={!!fieldState.error}
              className="flex-1 min-w-[215px]"
            >
              <Select
                {...field}
                onChange={(value) => {
                  field.onChange(value)
                  onPlatformGroupChange(value)
                }}
              >
                <SelectTrigger
                  appearance="form"
                  className="justify-between h-10"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platformGroupList.map((each) => (
                    <SelectItem key={each.key} value={each.key}>
                      {each.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
      </div>
      {isCustom && (
        <Card className="space-y-2">
          {fields.map((each, index) => (
            <div key={each.id} className="flex flex-wrap items-center gap-2">
              <Controller
                name={`privacy.${name}.custom_settings.${index}.target_group`}
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl
                    error={!!fieldState.error}
                    className="flex-1 min-w-[200px]"
                  >
                    <Select {...field}>
                      <SelectTrigger
                        appearance="form"
                        className="justify-between h-10"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {targetGroupList.map((each) => (
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
              <Typography level="p5">on</Typography>
              <div className="flex items-center flex-1 h-10 px-2 border rounded-md border-divider">
                <Typography level="p5">
                  {platformList.find(({ key }) => key === each.platform)?.label}
                </Typography>
              </div>
            </div>
          ))}
        </Card>
      )}
    </>
  )
}
