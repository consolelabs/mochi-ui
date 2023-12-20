import { FormLabel } from '@mochi-ui/core'
import React from 'react'
import { Control, UseFormWatch } from 'react-hook-form'
import { GeneralFormValue } from './types'
import { PrivacySetting } from './PrivacySetting'

interface Props {
  control: Control<GeneralFormValue>
  watch: UseFormWatch<GeneralFormValue>
}

export const WalletsPrivacy = ({ control, watch }: Props) => {
  return (
    <div className="flex flex-col w-full max-w-md space-y-2">
      <FormLabel>Wallets</FormLabel>
      <PrivacySetting {...{ control, watch }} name="walletsPrivacy" />
    </div>
  )
}
