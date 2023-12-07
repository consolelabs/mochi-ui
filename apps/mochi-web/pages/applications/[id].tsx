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
import {
  DtoUpdateApplicationInfoRequest,
  ViewFullApplicationResponse,
} from '~types/mochi-pay-schema'
import { API, GET_PATHS } from '~constants/api'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Button } from '@mochi-ui/core'
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
  const { data: detail, mutate: refresh } = useFetchApplicationDetail(
    profileId,
    appId,
  )
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
    formState: { errors, isDirty, isSubmitting },
  } = useForm<AppDetailFormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
  })

  const onUpdateApp = (data: AppDetailFormValues) => {
    if (!profileId || !appId || !detail || !isDirty) return Promise.resolve()
    const body: Partial<DtoUpdateApplicationInfoRequest> = {
      app_name: data.app_name,
      description: data.description,
      metadata: detail?.metadata,
      webhook: data.webhook,
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
      .json(() => {
        refresh()
        alert('Updated successfully')
      })
      .catch((e) => {
        const err = JSON.parse(e.message)
        alert(err.msg)
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
        alert(err.msg)
      })
      .finally(() => {
        setIsResettingSecretKey(false)
      })
  }

  useEffect(() => {
    if (detail) {
      const defalutUrls = Object.entries(detail.external_links || {}).flatMap(
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
        webhook: detail.webhook || '',
        app_name: detail.name,
        description: detail.description || '',
      })
    }
  }, [reset, detail])

  useEffect(() => {
    if (secretKeyQuery) {
      setSecretKey(secretKeyQuery as string)
      replace({ pathname, query: { id } }, undefined, { shallow: true })
    }
  }, [id, pathname, replace, secretKeyQuery])

  return (
    <AuthLayout
      pageHeader={
        <AppDetailPageHeader
          name={detail?.name}
          onDeleteApp={() => onOpenChangeDeleteAppModal(true)}
        />
      }
    >
      {/* form can be nested structurally, just use the element's form attribute */}
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
      <DeleteAppModal
        app={detail}
        open={isOpenDeleteAppModal}
        onOpenChange={onOpenChangeDeleteAppModal}
        onSucess={() => push(ROUTES.APPLICATON_LIST)}
      />
    </AuthLayout>
  )
}

export default App
