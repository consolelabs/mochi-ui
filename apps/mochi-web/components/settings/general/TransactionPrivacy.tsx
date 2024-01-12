import {
  FormControl,
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@mochi-ui/core'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ResponseGeneralSettingData } from '~types/mochi-schema'
import { targetGroupList } from '~constants/settings'

export const TransactionPrivacy = () => {
  const { control } = useFormContext<ResponseGeneralSettingData>()

  return (
    <SectionHeader
      wrapActionsOnMobile={false}
      className="!grid-cols-[1fr,auto]"
    >
      <SectionHeaderTitle className="font-normal">
        Who can see your transaction
      </SectionHeaderTitle>
      <SectionHeaderActions>
        <Controller
          name="privacy.tx_target_group"
          control={control}
          render={({ field }) => (
            <FormControl className="flex-1 min-w-[200px]">
              <Select {...field}>
                <SelectTrigger
                  appearance="form"
                  className="justify-between h-10 w-56"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  {targetGroupList.map((each) => (
                    <SelectItem key={each.key} value={each.key}>
                      {each.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          )}
        />
      </SectionHeaderActions>
    </SectionHeader>
  )
}
