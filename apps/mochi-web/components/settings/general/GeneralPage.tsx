import { API, GET_PATHS, apiLogout } from '~constants/api'
import { api } from '~constants/mochi'
import { Button, Separator, Typography, toast } from '@mochi-ui/core'
import { useLoginWidget } from '@mochi-web3/login-widget'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ROUTES } from '~constants/routes'
import { useFetchGeneralSettings } from '~hooks/settings/useFetchGeneralSettings'
import {
  ResponseGeneralSettingData,
  ResponseUserGeneralSettingResponse,
} from '~types/mochi-schema'
import { SaveBar } from '~cpn/SaveBar'
import { defaultMoneySource } from '~constants/settings'
import { utils } from '@consolelabs/mochi-formatter'
import { MoneySource } from './MoneySource'
import { ReceiverPlatform } from './ReceiverPlatform'
import { TokenPriority } from './TokenPriority'
import { DefaultMessage } from './DefaultMessage'
import { TransactionLimit } from './TransactionLimit'
import { TransactionPrivacy } from './TransactionPrivacy'
import { WalletPrivacy } from './WalletPrivacy'

const SETTINGS_GENERAL_FORM_ID = 'settings-general-form'

export const GeneralPage = () => {
  const form = useForm<ResponseGeneralSettingData>({
    mode: 'all',
  })
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = form

  const { profile, logout } = useLoginWidget()
  const { replace } = useRouter()
  const { data: settings } = useFetchGeneralSettings(profile?.id)

  const resetData = useCallback(
    (data?: ResponseGeneralSettingData) => {
      if (!data) return
      reset({
        ...data,
        payment: {
          ...data.payment,
          default_money_source:
            data.payment?.default_money_source || defaultMoneySource,
          prioritized_token: data.payment?.prioritized_token_ids?.map((id) => ({
            id,
          })),
          // FIXME: convert number value to string
          tx_limit_settings: data.payment?.tx_limit_settings?.map((each) => ({
            ...each,
            min: utils.formatDigit({
              value: each.min || 0,
              scientificFormat: false,
              withoutCommas: true,
            }),
            max: utils.formatDigit({
              value: each.max || 0,
              scientificFormat: false,
              withoutCommas: true,
            }),
          })) as any,
        },
      })
    },
    [reset],
  )

  const onUpdateSettings = (data: ResponseGeneralSettingData) => {
    if (!profile?.id) return
    const payload = {
      ...data,
      payment: {
        ...data.payment,
        token_priorities:
          data.payment?.prioritized_token?.map((each) => each.id) || [],
        tx_limit_settings: data.payment?.tx_limit_settings?.map((each) => ({
          ...each,
          min: Number(each.min),
          max: Number(each.max),
        })),
      },
    }
    return API.MOCHI.put(payload, GET_PATHS.UPDATE_GENERAL_SETTINGS(profile.id))
      .json((r: ResponseUserGeneralSettingResponse) => {
        resetData(r.data)
      })
      .catch((e) => {
        const err = JSON.parse(e.message || '{}')
        toast({
          description: err.msg || 'Something went wrong, please try again.',
          scheme: 'danger',
        })
      })
  }

  useEffect(() => {
    resetData(settings)
  }, [resetData, settings])

  return (
    <FormProvider {...form}>
      <form
        id={SETTINGS_GENERAL_FORM_ID}
        onSubmit={handleSubmit(onUpdateSettings)}
      />
      <div className="space-y-4 sm:max-w-[600px]">
        <Typography level="h6">Payment setting</Typography>
        <MoneySource />
        <ReceiverPlatform />
        <TokenPriority />
        <Separator />
        <DefaultMessage />
        <Separator />
        <TransactionLimit />
        <Separator className="!mb-8" />

        <Typography level="h6">Privacy</Typography>
        <WalletPrivacy />
        <Separator />
        <TransactionPrivacy />

        <Separator />
      </div>
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
      <SaveBar
        open={isDirty}
        isLoading={isSubmitting}
        onConfirm={handleSubmit(onUpdateSettings)}
        onCancel={() => reset()}
      />
    </FormProvider>
  )
}
