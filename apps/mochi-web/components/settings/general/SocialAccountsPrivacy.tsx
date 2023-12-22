import { FormLabel } from '@mochi-ui/core'
import React from 'react'
import { PrivacySetting } from './PrivacySetting'

export const SocialAccountsPrivacy = () => {
  return (
    <div className="flex flex-col w-full max-w-md space-y-2">
      <FormLabel>Social Accounts</FormLabel>
      <PrivacySetting name="social_accounts" />
    </div>
  )
}
