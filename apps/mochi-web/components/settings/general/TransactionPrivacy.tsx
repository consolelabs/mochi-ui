import { FormLabel } from '@mochi-ui/core'
import React from 'react'
import { PrivacySetting } from './PrivacySetting'

export const TransactionPrivacy = () => {
  return (
    <div className="flex flex-col w-full max-w-md space-y-2">
      <FormLabel>Transaction Privacy</FormLabel>
      <PrivacySetting name="tx" />
    </div>
  )
}
