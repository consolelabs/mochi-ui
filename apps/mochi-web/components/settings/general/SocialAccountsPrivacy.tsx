import { FormLabel } from '@mochi-ui/core'
import React from 'react'
import { Control, UseFormWatch } from 'react-hook-form'
import { GeneralFormValue } from './types'
import { PrivacySetting } from './PrivacySetting'

interface Props {
  control: Control<GeneralFormValue>
  watch: UseFormWatch<GeneralFormValue>
}

export const SocialAccountsPrivacy = ({ control, watch }: Props) => {
  return (
    <div className="flex flex-col w-full max-w-md space-y-2">
      <FormLabel>Social Accounts</FormLabel>
      <PrivacySetting {...{ control, watch }} name="socialAccountsPrivacy" />
    </div>
  )
}
