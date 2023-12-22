import { NextPageWithLayout } from '~pages/_app'
import { useRouter } from 'next/router'
import { useFetchApplicationDetail } from '~hooks/app/useFetchApplicationDetail'
import { useProfileStore } from '~store'
import { shallow } from 'zustand/shallow'
import { AppDetailPageHeader } from '~cpn/app/detail/AppDetailPageHeader'
import { AppDetailStatistics } from '~cpn/app/detail/AppDetailStatistics'
import { AppDetailIntegration } from '~cpn/app/detail/AppDetailIntegration'
import { AppDetailUrl } from '~cpn/app/detail/AppDetailUrl'
import {
  DtoUpdateApplicationInfoRequest,
  ViewApplication,
  ViewApplicationResponse,
  ViewFullApplicationResponse,
} from '~types/mochi-pay-schema'
import { API, GET_PATHS } from '~constants/api'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import {
  ActionBar,
  ActionBarActionGroup,
  ActionBarBody,
  ActionBarCancelButton,
  ActionBarConfirmButton,
  ActionBarContent,
  ActionBarDescription,
  ActionBarIcon,
  useToast,
} from '@mochi-ui/core'
import { AppDetailFormValues } from '~types/app'
import { AppDetailPlatforms } from '~cpn/app/detail/AppDetailPlatforms'
import { platforms } from '~constants/app'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AppDetailMembers } from '~cpn/app/detail/AppDetailMembers'
import { AppDetailApiCalls } from '~cpn/app/detail/AppDetailApiCalls'
import { DeleteAppModal } from '~cpn/app/DeleteAppModal'
import { ROUTES } from '~constants/routes'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { SEO } from '~app/layout/seo'
import { DashboardBody } from '~cpn/DashboardBody'
import { AppDetailSkeleton } from '~cpn/app/detail/AppDetailSkeleton'

const APP_DETAIL_FORM_ID = 'app-detail-form'

const schema = z.object({
  webhook: z.string().url('Invalid URL').optional().or(z.literal('')),
  platforms: z.object(
    platforms.reduce(
      (acc, { key }) => ({
        ...acc,
        [key]: z.boolean(),
      }),
      {},
    ),
  ),
  urls: z
    .object({
      platform: z.string().min(1, 'This field is required'),
      url: z.string().min(1, 'This field is required').url('Invalid URL'),
    })
    .array(),
  app_name: z
    .string()
    .min(6, 'Name must contain at least 6 characters')
    .max(25, 'Name must be no longer than 25 characters')
    .regex(
      /^[a-zA-Z0-9 ]+$/,
      'Name must contain only letters, numbers and spaces',
    ),
  description: z.string().refine(
    (value) => {
      const element = new DOMParser().parseFromString(
        value,
        'text/html',
      ).documentElement
      const text = element.textContent || element.innerText
      return text.length <= 250
    },
    {
      message: 'Description must be no longer than 250 characters',
    },
  ),
})

const App: NextPageWithLayout = () => {
  const { id: profileId } = useProfileStore(
    (s) => ({
      id: s.me?.id,
    }),
    shallow,
  )
  const {
    query: { id, secretKey: secretKeyQuery },
    pathname,
    replace,
    push,
  } = useRouter()
  const appId = id as string
  const { toast } = useToast()
  const {
    data: detail,
    mutate: refresh,
    isLoading,
  } = useFetchApplicationDetail(profileId, appId)
  const [secretKey, setSecretKey] = useState('')
  const [isResettingSecretKey, setIsResettingSecretKey] = useState(false)
  const {
    isOpen: isOpenDeleteAppModal,
    onOpenChange: onOpenChangeDeleteAppModal,
  } = useDisclosure()

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isDirty, isSubmitting, dirtyFields },
  } = useForm<AppDetailFormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
  })
  const openActionBar = isDirty && Object.keys(dirtyFields).length > 0

  const resetApp = useCallback(
    (app?: ViewApplication) => {
      if (!app) return
      const defalutUrls = Object.entries(app.external_links || {}).flatMap(
        ([platform, urls]) => urls.map((url) => ({ platform, url })),
      )
      const defalutPlatforms = platforms.reduce(
        (acc, { key }) => ({
          ...acc,
          [key]: app.platforms?.includes(key) || false,
        }),
        {},
      )
      reset({
        urls: defalutUrls,
        platforms: defalutPlatforms,
        webhook: app.webhooks?.create_request || '',
        app_name: app.name,
        description: app.description || '',
      })
    },
    [reset],
  )

  const onUpdateApp = (data: AppDetailFormValues) => {
    if (!profileId || !appId || !detail || !isDirty) return Promise.resolve()
    const body: Partial<DtoUpdateApplicationInfoRequest> = {
      app_name: data.app_name,
      description: data.description,
      metadata: detail?.metadata,
      webhooks: { create_request: data.webhook || '' },
      platforms: Object.entries(data.platforms).flatMap(([key, value]) =>
        value ? key : [],
      ),
      external_links: data.urls.reduce<
        DtoUpdateApplicationInfoRequest['external_links']
      >(
        (acc, { platform, url }) => ({
          ...acc,
          [platform]: [...(acc[platform] || []), url],
        }),
        {},
      ),
    }
    return API.MOCHI_PAY.put(
      body,
      GET_PATHS.UPDATE_APPLICATION_DETAIL(profileId, appId),
    )
      .json((r: ViewApplicationResponse) => {
        resetApp(r.data)
      })
      .catch((e) => {
        const err = JSON.parse(e.message)
        toast({
          description: err.msg,
          scheme: 'danger',
        })
      })
  }

  const onResetSecretKey = () => {
    if (!profileId) return
    setIsResettingSecretKey(true)
    return API.MOCHI_PAY.put(
      undefined,
      GET_PATHS.RESET_APPLICATION_KEY(profileId, appId),
    )
      .json((r: ViewFullApplicationResponse) => {
        refresh()
        setSecretKey(r.data?.private_key || '')
      })
      .catch((e) => {
        const err = JSON.parse(e.message)
        toast({
          description: err.msg,
          scheme: 'danger',
        })
      })
      .finally(() => {
        setIsResettingSecretKey(false)
      })
  }

  useEffect(() => {
    resetApp(detail)
  }, [detail, resetApp])

  useEffect(() => {
    if (secretKeyQuery) {
      setSecretKey(secretKeyQuery as string)
      replace({ pathname, query: { id } }, undefined, { shallow: true })
    }
  }, [id, pathname, replace, secretKeyQuery])

  if (!detail || isLoading) {
    return <AppDetailSkeleton />
  }

  return (
    <>
      <SEO title={detail?.name} />
      <AppDetailPageHeader
        name={detail?.name}
        onDeleteApp={() => onOpenChangeDeleteAppModal(true)}
      />
      <DashboardBody>
        <form id={APP_DETAIL_FORM_ID} onSubmit={handleSubmit(onUpdateApp)} />
        <AppDetailStatistics
          {...{ profileId, appId, detail, control, refresh }}
        />
        <AppDetailIntegration
          apiKey={detail?.public_key}
          {...{ control, secretKey, onResetSecretKey, isResettingSecretKey }}
        />
        <AppDetailApiCalls {...{ profileId, appId }} />
        <AppDetailUrl {...{ control, errors }} />
        <AppDetailPlatforms {...{ control, setValue }} />
        <AppDetailMembers {...{ profileId, appId }} />
        <div className="sticky bottom-0">
          <ActionBar open={openActionBar}>
            <ActionBarContent
              scheme="success"
              outline
              shadow
              onOpenAutoFocus={(e) => e.preventDefault()}
              anchorClassName="left-0 right-0 -mb-8"
            >
              <ActionBarIcon />
              <ActionBarBody>
                <ActionBarDescription>
                  Do you want to save these changes?
                </ActionBarDescription>
              </ActionBarBody>
              <ActionBarActionGroup>
                <ActionBarCancelButton
                  disabled={isSubmitting}
                  variant="link"
                  onClick={() => reset()}
                >
                  Reset
                </ActionBarCancelButton>
                <ActionBarConfirmButton
                  loading={isSubmitting}
                  type="submit"
                  form={APP_DETAIL_FORM_ID}
                  className="min-w-[130px]"
                >
                  Save changes
                </ActionBarConfirmButton>
              </ActionBarActionGroup>
            </ActionBarContent>
          </ActionBar>
        </div>
        <DeleteAppModal
          app={detail}
          open={isOpenDeleteAppModal}
          onOpenChange={onOpenChangeDeleteAppModal}
          onSucess={() => push(ROUTES.APPLICATON_LIST)}
        />
      </DashboardBody>
    </>
  )
}

export default App
