import { Button, Typography, useLoginWidget } from '@mochi-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ROUTES } from '~constants/routes'
import { GeneralFormValue } from './types'
import { MoneySource } from './MoneySource'
import { ReceiverPlatform } from './ReceiverPlatform'
import { TokenPriority } from './TokenPriority'
import { DefaultMessage } from './DefaultMessage'

export const GeneralPage = () => {
  const form = useForm<GeneralFormValue>({
    mode: 'all',
    defaultValues: {
      defaultMoneySource: 'mochi',
      defaultReceiverPlatform: 'discord',
      defaultTokenPriority: [{ id: '941f0fb1-00da-49dc-a538-5e81fc874cb4' }],
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
          <Typography level="p2" fontWeight="md">
            Payment setting
          </Typography>

          <div className="flex gap-4">
            <MoneySource control={control} />
            <ReceiverPlatform control={control} />
          </div>

          <TokenPriority {...{ control, watch }} />
          <DefaultMessage {...{ control, watch }} />
        </div>
      </FormProvider>

      <div className="mt-8">
        <Button
          variant="outline"
          color="danger"
          onClick={() => {
            replace(ROUTES.HOME)
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
