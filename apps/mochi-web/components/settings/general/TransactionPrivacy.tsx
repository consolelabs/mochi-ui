import { Typography } from '@mochi-ui/core'
import React from 'react'
import { PrivacySetting } from './PrivacySetting'

export const TransactionPrivacy = () => {
  return (
    <div className="flex flex-col w-full space-y-2">
      <Typography level="p4">Transaction Privacy</Typography>
      <PrivacySetting name="tx" />
    </div>
  )
}
