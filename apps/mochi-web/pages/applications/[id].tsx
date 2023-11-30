import AuthLayout from '~components/auth-layout'
import { NextPageWithLayout } from '~pages/_app'
import { useRouter } from 'next/router'
import { useFetchApplicationDetail } from '~hooks/app/useFetchApplicationDetail'
import { useProfileStore } from '~store'
import { shallow } from 'zustand/shallow'
import { AppDetailPageHeader } from '~cpn/app/detail/AppDetailPageHeader'
import { AppDetailStatistics } from '~cpn/app/detail/AppDetailStatistics'
import { AppDetailIntegration } from '~cpn/app/detail/AppDetailIntegration'
import { AppDetailUrl } from '~cpn/app/detail/AppDetailUrl'
import { DtoUpdateApplicationInfoRequest } from '~types/mochi-pay-schema'
import { API, GET_PATHS } from '~constants/api'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Button } from '@consolelabs/core'
import { AppDetailFormValues, UrlValue } from '~types/app'
import { AppDetailPlatforms } from '~cpn/app/detail/AppDetailPlatforms'
import { platforms, urlRegex } from '~constants/app'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const APP_DETAIL_FORM_ID = 'app-detail-form'

const schema = z.object({
  webhookUrl: z.string().regex(urlRegex, 'Invalid URL').or(z.literal('')),
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
      url: z
        .string()
        .min(1, 'This field is required')
        .regex(urlRegex, 'Invalid URL'),
    })
    .array(),
})

const App: NextPageWithLayout = () => {
  const { id: profileId } = useProfileStore(
    (s) => ({
      id: s.me?.id,
    }),
    shallow,
  )
  const {
    query: { id },
  } = useRouter()
  const appId = id as string
  const { data: detail, mutate: refresh } = useFetchApplicationDetail(
    profileId,
    appId,
  )

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<AppDetailFormValues>({
    resolver: zodResolver(schema),
  })

  const onUpdateApp = (data: AppDetailFormValues) => {
    if (!profileId || !appId || !detail || !isDirty) return Promise.resolve()
    const body: Partial<DtoUpdateApplicationInfoRequest> = {
      app_name: detail.name,
      description: detail?.description,
      metadata: detail?.metadata,
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
        { webhookUrl: data.webhookUrl ? [data.webhookUrl] : [] },
      ),
    }
    return API.MOCHI_PAY.put(
      body,
      GET_PATHS.UPDATE_APPLICATION_DETAIL(profileId, appId),
    )
      .json(() => {
        refresh()
        alert('Updated successfully')
      })
      .catch((e) => {
        const err = JSON.parse(e.message)
        alert(err.msg)
      })
  }

  const onAddNewUrl = (data: UrlValue) => {
    if (!profileId || !appId || !detail) return
    const external_links = {
      ...detail.external_links,
      [data.platform]: [
        ...(detail.external_links?.[data.platform] || []),
        data.url,
      ],
    }
    const body: Partial<DtoUpdateApplicationInfoRequest> = {
      app_name: detail.name,
      description: detail?.description,
      metadata: detail?.metadata,
      platforms: detail?.platforms,
      external_links,
    }
    return API.MOCHI_PAY.put(
      body,
      GET_PATHS.UPDATE_APPLICATION_DETAIL(profileId, appId),
    )
      .json(() => {
        refresh()
        alert('Added successfully')
      })
      .catch((e) => {
        const err = JSON.parse(e.message)
        alert(err.msg)
      })
  }

  useEffect(() => {
    if (detail) {
      const { webhookUrl, ...externalLinks } = detail.external_links || {}
      const defalutUrls = Object.entries(externalLinks).flatMap(
        ([platform, urls]) => urls.map((url) => ({ platform, url })),
      )
      const defalutPlatforms = platforms.reduce(
        (acc, { key }) => ({
          ...acc,
          [key]: detail.platforms?.includes(key) || false,
        }),
        {},
      )
      reset({
        urls: defalutUrls,
        platforms: defalutPlatforms,
        webhookUrl: webhookUrl?.[0] || '',
      })
    }
  }, [reset, detail])

  return (
    <AuthLayout pageHeader={<AppDetailPageHeader name={detail?.name} />}>
      {/* form can be nested structurally, just use the element's form attribute */}
      <form id={APP_DETAIL_FORM_ID} onSubmit={handleSubmit(onUpdateApp)} />
      <AppDetailStatistics
        profileId={profileId}
        appId={appId}
        detail={detail}
      />
      <AppDetailIntegration apiKey={detail?.public_key} control={control} />
      <AppDetailUrl {...{ control, errors, onAddNewUrl }} />
      <AppDetailPlatforms {...{ control, setValue }} />
      {isDirty && (
        <div className="flex justify-center mt-8">
          <Button
            disabled={isSubmitting || !!Object.keys(errors).length}
            loading={isSubmitting}
            form={APP_DETAIL_FORM_ID}
          >
            Update
          </Button>
        </div>
      )}
    </AuthLayout>
  )
}

export default App
