import React, { useEffect, useId } from 'react'
import {
  ActionBar,
  ActionBarActionGroup,
  ActionBarBody,
  ActionBarCancelButton,
  ActionBarConfirmButton,
  ActionBarContent,
  ActionBarIcon,
  ActionBarTitle,
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderDescription,
  SectionHeaderTitle,
  Skeleton,
  Switch,
  SwitchProps,
  Typography,
  toast,
  useLoginWidget,
} from '@mochi-ui/core'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { useFetchNotificationSettings } from '~hooks/settings/useFetchNotificationSettings'
import clsx from 'clsx'
import { API, GET_PATHS } from '~constants/api'
import {
  RequestUpdateNotificationSettingPayloadRequest,
  ResponseUserNotificationSettingResponse,
} from '~types/mochi-schema'
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
          <SectionHeader className="!py-3" wrapActionsOnMobile={false}>
            <SectionHeaderTitle
              wrapperClassName="!col-span-2 !col-end-3 pr-14"
              className={clsx('!text-sm font-normal', {
                '!py-0': !description,
              })}
            >
              {label}
            </SectionHeaderTitle>
            <SectionHeaderDescription wrapperClassName="!col-span-2 !col-end-3 pr-14">
              {description}
            </SectionHeaderDescription>
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

export function NotificationPage() {
  const form = useForm<NotificationFormValue>({
    mode: 'all',
  })
  const { profile } = useLoginWidget()
  const { handleSubmit, watch, reset, formState } = form
  const { isDirty } = formState
  const { settings, isLoading, mutate } = useFetchNotificationSettings(
    profile?.id,
  )

  const enableNotification = watch('enable')
  const switchTabIndex = enableNotification ? undefined : -1

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
      flag: restData as Record<string, boolean | any>,
    }
    try {
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
    } catch (e) {
      toast({
        scheme: 'danger',
        title: 'Some thing wrong',
        description: 'Error during update notification settings',
      })
    }
    mutate()
  }

  useEffect(() => {
    if (isLoading) return
    const flags = settings?.flags as NotificationWalletFlags | undefined
    const platforms = settings?.platforms as NotificationPlatform[] | undefined
    reset({
      enable: settings?.enable,
      discord: platforms?.includes('discord'),
      telegram: platforms?.includes('telegram'),
      website: platforms?.includes('website'),
      ...flags,
    })
  }, [isLoading, reset, settings])

  if (isLoading) return <Skeleton />

  return (
    <FormProvider {...form}>
      <div className="sm:max-w-[600px] divide-y">
        <div>
          <Typography level="h6">Notify Event</Typography>
          <Controller<NotificationFormValue>
            name="enable"
            render={({ field: { value, onChange, ...restFields } }) => (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label
                htmlFor="enable"
                className="block cursor-pointer select-none"
              >
                <SectionHeader className="!py-4" wrapActionsOnMobile={false}>
                  <SectionHeaderTitle
                    wrapperClassName="!col-span-2 !col-end-3 pr-14"
                    className="!text-base font-normal"
                  >
                    Notification
                  </SectionHeaderTitle>
                  <SectionHeaderDescription wrapperClassName="!col-span-2 !col-end-3 pr-14">
                    Select the event you want to receive notifications for
                  </SectionHeaderDescription>
                  <SectionHeaderActions>
                    <Switch
                      id="enable"
                      key="switch"
                      {...restFields}
                      checked={value}
                      onCheckedChange={onChange}
                    />
                  </SectionHeaderActions>
                </SectionHeader>
              </label>
            )}
          />
        </div>
        <div
          className={clsx('divide-y transition', {
            'opacity-30': !enableNotification,
          })}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
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
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Receive a tip"
                name="receive_tip_success"
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Payment request completed"
                name="receive_payme_success"
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Receive airdrops"
                name="receive_airdrop_success"
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Payment request expired"
                name="*_payme_expired"
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Deposit completed"
                name="receive_deposit_success"
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Pay link has expired"
                name="*_paylink_expired"
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Withdrawal completed"
                name="send_withdraw_success"
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Pay link claimed by another"
                name="send_paylink_success"
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Claim a pay link"
                name="receive_paylink_success"
              />
              {/* FIXME: not support yet */}
              {/* <NotificationSwitcherField
              tabIndex={switchTabIndex}
              label="Wallet transactions"
              name="walletTransactions"
            /> */}
            </div>
          </div>
          <div>
            <Typography className="py-4" level="h6">
              Wallet Activity
            </Typography>
            <NotificationSwitcherField
              className="-mt-3"
              tabIndex={switchTabIndex}
              label="New Configuration"
              description="Change in communities's configuration"
              name="new_configuration"
            />
          </div>
          <div>
            <Typography className="py-4" level="h6">
              Apps Activity
            </Typography>
            <div className="divide-y">
              <NotificationSwitcherField
                className="-mt-3"
                tabIndex={switchTabIndex}
                label="New Vault Transactions"
                name="new_vault_tx"
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Information Changed"
                name="info_updated"
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="New API call"
                name="new_api_call"
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="New Member"
                name="new_member"
              />
            </div>
          </div>
          <div>
            <Typography className="py-4" level="h6">
              Platform Notification
            </Typography>
            <Typography level="p5" color="textSecondary" className="-mt-2 pb-2">
              Select the platform you want to receive the notification
            </Typography>
            <div className="divide-y">
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Discord"
                name="discord"
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Telegram"
                name="telegram"
              />
              <NotificationSwitcherField
                tabIndex={switchTabIndex}
                label="Website"
                name="website"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 z-50">
        <ActionBar open={isDirty}>
          <ActionBarContent
            scheme="success"
            anchorClassName="left-0 right-0 -mb-8"
            shadow
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <ActionBarIcon />
            <ActionBarBody>
              <ActionBarTitle>
                Do you want to save these changes?
              </ActionBarTitle>
            </ActionBarBody>
            <ActionBarActionGroup>
              <ActionBarCancelButton
                onClick={() => {
                  reset()
                }}
              >
                Reset
              </ActionBarCancelButton>
              <ActionBarConfirmButton onClick={handleSubmit(onSubmit)}>
                Save changes
              </ActionBarConfirmButton>
            </ActionBarActionGroup>
          </ActionBarContent>
        </ActionBar>
      </div>
    </FormProvider>
  )
}
