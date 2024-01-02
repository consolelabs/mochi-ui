import React, { useEffect, useId, useState } from 'react'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderDescription,
  SectionHeaderTitle,
  Switch,
  SwitchProps,
  Typography,
  toast,
} from '@mochi-ui/core'
import { useLoginWidget } from '@mochi-web3/login-widget'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { useFetchNotificationSettings } from '~hooks/settings/useFetchNotificationSettings'
import clsx from 'clsx'
import { API, GET_PATHS } from '~constants/api'
import {
  RequestUpdateNotificationSettingPayloadRequest,
  ResponseUserNotificationSettingResponse,
} from '~types/mochi-schema'
import { SaveBar } from '~cpn/SaveBar'
import {
  NotificationFlags,
  NotificationPlatform,
  NotificationWalletFlags,
} from './type'

type NotificationFormValue = NotificationFlags & {
  enable?: boolean
} & Record<NotificationPlatform, boolean>

const NotificationSwitcherField = (
  props: Omit<SwitchProps, 'name'> & {
    label: string
    description?: string
    name: keyof NotificationFormValue
  },
) => {
  const { label, name, description, className, ...restProps } = props
  const id = useId()
  return (
    <Controller<NotificationFormValue>
      name={name}
      render={({ field: { value, onChange, ...restFields } }) => (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
          htmlFor={id}
          className={clsx('block cursor-pointer select-none', className)}
        >
          <SectionHeader className="!py-4" wrapActionsOnMobile={false}>
            <SectionHeaderTitle
              className={clsx('!col-span-2 !col-end-3 pr-14 font-normal', {
                '!py-0': !description,
              })}
            >
              {label}
            </SectionHeaderTitle>
            {description && (
              <SectionHeaderDescription className="!col-span-2 !col-end-3 pr-14">
                {description}
              </SectionHeaderDescription>
            )}
            <SectionHeaderActions>
              <Switch
                id={id}
                key="switch"
                {...restFields}
                {...restProps}
                checked={value}
                onCheckedChange={onChange}
              />
            </SectionHeaderActions>
          </SectionHeader>
        </label>
      )}
    />
  )
}

const Divider = () => <div className="w-full h-px my-8 bg-neutral-200" />

export function NotificationPage() {
  const form = useForm<NotificationFormValue>({
    mode: 'all',
  })
  const { profile } = useLoginWidget()
  const { handleSubmit, watch, reset, formState } = form
  const { isDirty } = formState
  const {
    settings,
    isLoading: isFirstLoading,
    mutate,
  } = useFetchNotificationSettings(profile?.id)
  const [isUpdating, setIsUpdating] = useState(false)

  const enableNotification = watch('enable')
  const switchTabIndex = enableNotification ? undefined : -1
  const isDisabledSwitch = !enableNotification || isFirstLoading || isUpdating

  const onSubmit = async (data: NotificationFormValue) => {
    const { enable, discord, telegram, website, ...restData } = data
    const platformObj: Record<string, boolean> = {
      discord,
      telegram,
      website,
    }
    const platforms = Object.keys(platformObj).filter((p: any) =>
      Boolean(platformObj[p]),
    )
    const body: RequestUpdateNotificationSettingPayloadRequest = {
      enable: enable ?? false,
      platforms,
      flags: restData as Record<string, boolean>,
    }
    try {
      setIsUpdating(true)
      const { data: newSettings }: ResponseUserNotificationSettingResponse =
        await API.MOCHI.put(
          body,
          GET_PATHS.UPDATE_PROFILE_SETTING_NOTIFICATION(profile?.id as string),
        ).json((r) => r)
      const flags = newSettings?.flags as NotificationWalletFlags | undefined
      const platforms = newSettings?.platforms as
        | NotificationPlatform[]
        | undefined
      reset({
        enable: newSettings?.enable,
        discord: platforms?.includes('discord'),
        telegram: platforms?.includes('telegram'),
        website: platforms?.includes('website'),
        ...flags,
      })
      await mutate()
    } catch (e) {
      reset()
      toast({
        scheme: 'danger',
        title: 'Some thing wrong',
        description: 'Error during update notification settings',
      })
    } finally {
      setIsUpdating(false)
    }
  }

  useEffect(() => {
    if (isFirstLoading) return
    const flags = settings?.flags as NotificationWalletFlags | undefined
    const platforms = settings?.platforms as NotificationPlatform[] | undefined
    reset({
      enable: settings?.enable,
      discord: platforms?.includes('discord'),
      telegram: platforms?.includes('telegram'),
      website: platforms?.includes('website'),
      ...flags,
    })
  }, [isFirstLoading, reset, settings])

  return (
    <FormProvider {...form}>
      <div className="sm:max-w-[600px]">
        <Typography level="h6">Notify Event</Typography>
        <Controller<NotificationFormValue>
          name="enable"
          render={({ field: { value, onChange, ...restFields } }) => (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label
              htmlFor="enable"
              className="block -mb-4 cursor-pointer select-none"
            >
              <SectionHeader className="!py-4" wrapActionsOnMobile={false}>
                <SectionHeaderTitle className="!col-span-2 !col-end-3 pr-14 font-normal">
                  Notification
                </SectionHeaderTitle>
                <SectionHeaderDescription className="!col-span-2 !col-end-3 pr-14">
                  Select the event you want to receive notifications for
                </SectionHeaderDescription>
                <SectionHeaderActions>
                  <Switch
                    id="enable"
                    key="switch"
                    {...restFields}
                    checked={value}
                    onCheckedChange={onChange}
                    disabled={isFirstLoading || isUpdating}
                  />
                </SectionHeaderActions>
              </SectionHeader>
            </label>
          )}
        />
        <Divider />
        <div
          className={clsx('transitionw -mt-4', {
            'opacity-30': !enableNotification,
          })}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="border-b">
            <Typography className="py-4" level="h6">
              Wallet Activity
            </Typography>
            <div className="divide-y">
              <NotificationSwitcherField
                className="-mt-3"
                tabIndex={switchTabIndex}
                name="disable_all"
                label="Disable all notification wallets"
                description="Your existing notification wallet activity settings will be preserved."
                disabled={isDisabledSwitch}
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Receive a tip"
                name="receive_tip_success"
                disabled={isDisabledSwitch}
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Payment request completed"
                name="receive_payme_success"
                disabled={isDisabledSwitch}
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Receive airdrops"
                name="receive_airdrop_success"
                disabled={isDisabledSwitch}
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Payment request expired"
                name="*_payme_expired"
                disabled={isDisabledSwitch}
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Deposit completed"
                name="receive_deposit_success"
                disabled={isDisabledSwitch}
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Pay link has expired"
                name="*_paylink_expired"
                disabled={isDisabledSwitch}
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Withdrawal completed"
                name="send_withdraw_success"
                disabled={isDisabledSwitch}
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Pay link claimed by another"
                name="send_paylink_success"
                disabled={isDisabledSwitch}
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Claim a pay link"
                name="receive_paylink_success"
                disabled={isDisabledSwitch}
              />
              {/* FIXME: not support yet */}
              {/* <NotificationSwitcherField
              tabIndex={switchTabIndex}
              label="Wallet transactions"
              name="walletTransactions"
            /> */}
            </div>
          </div>
          <div className="mt-4 -mb-4">
            <Typography className="py-4" level="h6">
              Communities Activity
            </Typography>
            <NotificationSwitcherField
              className="-mt-3"
              tabIndex={switchTabIndex}
              label="New Configuration"
              description="Change in communities's configuration"
              name="new_configuration"
              disabled={isDisabledSwitch}
            />
          </div>
          <Divider />
          <div className="-mt-4 border-b">
            <Typography className="py-4" level="h6">
              Apps Activity
            </Typography>
            <div className="divide-y">
              <NotificationSwitcherField
                className="-mt-3"
                tabIndex={switchTabIndex}
                description="A new transaction of the vault is made."
                label="New Vault Transactions"
                name="new_vault_tx"
                disabled={isDisabledSwitch}
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="New API call"
                name="new_api_call"
                description="An API is called with the app keys."
                disabled={isDisabledSwitch}
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Information Changed"
                name="info_updated"
                description="App’s information is changed."
                disabled={isDisabledSwitch}
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="New Member"
                name="new_member"
                disabled={isDisabledSwitch}
                description="A new member is added to the apps."
              />
            </div>
          </div>
          <div className="mt-4">
            <Typography className="py-4" level="h6">
              Platform Notification
            </Typography>
            <Typography level="p5" color="textSecondary" className="pb-2 -mt-2">
              Select the platform you want to receive the notification
            </Typography>
            <div className="divide-y">
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Discord"
                name="discord"
                disabled={isDisabledSwitch}
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Telegram"
                name="telegram"
                disabled={isDisabledSwitch}
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Website"
                name="website"
                disabled={isDisabledSwitch}
              />
            </div>
          </div>
        </div>
      </div>
      <SaveBar
        open={isDirty || isUpdating}
        isLoading={isUpdating || isFirstLoading}
        onConfirm={handleSubmit(onSubmit)}
        onCancel={() => reset()}
      />
    </FormProvider>
  )
}
