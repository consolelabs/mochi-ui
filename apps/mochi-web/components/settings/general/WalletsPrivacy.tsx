import { FormLabel } from '@mochi-ui/core'
import React from 'react'
import { PrivacySetting } from './PrivacySetting'

export const WalletsPrivacy = () => {
  return (
    <div className="flex flex-col w-full max-w-md space-y-2">
      <FormLabel>Wallets</FormLabel>
      <PrivacySetting name="wallets" />
    </div>
  )
}
