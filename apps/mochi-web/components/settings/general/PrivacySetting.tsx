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
import React, { useEffect } from 'react'
import {
  Control,
  Controller,
  UseFormWatch,
  useFieldArray,
} from 'react-hook-form'
import {
  platformGroupList,
  platformList,
  targetGroupList,
} from '~constants/settings'
import { GeneralFormValue } from './types'

interface Props {
  name: 'transactionPrivacy' | 'socialAccountsPrivacy' | 'walletsPrivacy'
  control: Control<GeneralFormValue>
  watch: UseFormWatch<GeneralFormValue>
}

export const PrivacySetting = ({ name, control, watch }: Props) => {
  const isCustom = watch(`${name}.general_platform_group`) === 'custom'
  const { fields, replace } = useFieldArray({
    control,
    name: `${name}.custom_settings`,
  })

  useEffect(() => {
    if (!isCustom) {
      replace([])
      return
    }
    replace(
      platformList.map((each) => ({
        target_group: targetGroupList[0].key,
        platform: each.key,
      })),
    )
  }, [isCustom, replace])

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Controller
          name={`${name}.general_target_group`}
          control={control}
          render={({ field, fieldState }) => (
            <FormControl
              error={!!fieldState.error}
              className="flex-1 min-w-[200px]"
            >
              <Select {...field}>
                <SelectTrigger className="justify-between h-10 border border-divider">
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
          name={`${name}.general_platform_group`}
          control={control}
          render={({ field, fieldState }) => (
            <FormControl
              error={!!fieldState.error}
              className="flex-1 min-w-[215px]"
            >
              <Select {...field}>
                <SelectTrigger className="justify-between h-10 border border-divider">
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
                name={`${name}.custom_settings.${index}.target_group`}
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl
                    error={!!fieldState.error}
                    className="flex-1 min-w-[200px]"
                  >
                    <Select {...field}>
                      <SelectTrigger className="justify-between h-10 border border-divider">
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
