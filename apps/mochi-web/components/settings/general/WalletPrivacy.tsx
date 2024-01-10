import {
  FormControl,
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderDescription,
  SectionHeaderTitle,
  Switch,
} from '@mochi-ui/core'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ResponseGeneralSettingData } from '~types/mochi-schema'

export const WalletPrivacy = () => {
  const { control } = useFormContext<ResponseGeneralSettingData>()

  return (
    <Controller
      name="privacy.show_destination_wallet"
      control={control}
      render={({ field: { value, onChange, ...rest } }) => (
        <FormControl>
          <SectionHeader
            wrapActionsOnMobile={false}
            className="!grid-cols-[1fr,auto]"
          >
            <SectionHeaderTitle className="font-normal">
              Show destination wallet
            </SectionHeaderTitle>
            <SectionHeaderDescription>
              Everyone can see the target address you specify when sending
              money.
            </SectionHeaderDescription>
            <SectionHeaderActions>
              <Switch {...rest} checked={value} onCheckedChange={onChange} />
            </SectionHeaderActions>
          </SectionHeader>
        </FormControl>
      )}
    />
  )
}
