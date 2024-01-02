import { Typography } from '@mochi-ui/core'
import React from 'react'
import { targetGroupList } from '~constants/settings'
import { PrivacySetting } from './PrivacySetting'

export const SocialAccountsPrivacy = () => {
  return (
    <div className="flex flex-col w-full space-y-2">
      <Typography level="p4">Social Accounts</Typography>
      <PrivacySetting
        name="social_accounts"
        targetGroupList={targetGroupList.filter((each) =>
          ['all', 'friends'].includes(each.key),
        )}
      />
    </div>
  )
}
