import { apiLogout } from '~constants/api'
import { api } from '~constants/mochi'
import { Button, Separator, Typography, useLoginWidget } from '@mochi-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ROUTES } from '~constants/routes'
import { platformGroupList, targetGroupList } from '~constants/settings'
import { GeneralFormValue } from './types'
import { MoneySource } from './MoneySource'
import { ReceiverPlatform } from './ReceiverPlatform'
import { TokenPriority } from './TokenPriority'
import { DefaultMessage } from './DefaultMessage'
import { TransactionLimit } from './TransactionLimit'
import { TransactionPrivacy } from './TransactionPrivacy'
import { SocialAccountsPrivacy } from './SocialAccountsPrivacy'
import { WalletsPrivacy } from './WalletsPrivacy'

export const GeneralPage = () => {
  const form = useForm<GeneralFormValue>({
    mode: 'all',
    defaultValues: {
      defaultMoneySource: 'mochi',
      defaultReceiverPlatform: 'discord',
      defaultTokenPriority: [{ id: '941f0fb1-00da-49dc-a538-5e81fc874cb4' }],
      transactionPrivacy: {
        general_target_group: targetGroupList[0].key,
        general_platform_group: platformGroupList[0].key,
        custom_settings: [],
      },
      socialAccountsPrivacy: {
        general_target_group: targetGroupList[0].key,
        general_platform_group: platformGroupList[0].key,
        custom_settings: [],
      },
      walletsPrivacy: {
        general_target_group: targetGroupList[0].key,
        general_platform_group: platformGroupList[0].key,
        custom_settings: [],
      },
    },
  })
  const { handleSubmit, control, watch } = form

  const { logout } = useLoginWidget()
  const { replace } = useRouter()

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data))
  }

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} />
        <div className="space-y-4">
          <Typography level="h6">Payment setting</Typography>

          <div className="flex gap-4">
            <MoneySource control={control} />
            <ReceiverPlatform control={control} />
          </div>

          <TokenPriority {...{ control, watch }} />
          <DefaultMessage {...{ control, watch }} />
          <TransactionLimit {...{ control, watch }} />

          <Separator className="w-full max-w-md" />

          <Typography level="h6">Privacy</Typography>

          <TransactionPrivacy {...{ control, watch }} />
          <SocialAccountsPrivacy {...{ control, watch }} />
          <WalletsPrivacy {...{ control, watch }} />
        </div>
      </FormProvider>

      <div className="mt-8">
        <Button
          variant="outline"
          color="danger"
          onClick={() => {
            replace(ROUTES.HOME)
            apiLogout()
            api.token(null)
            setTimeout(() => {
              logout()
            }, 500)
          }}
        >
          Log out
        </Button>
      </div>
    </>
  )
}
