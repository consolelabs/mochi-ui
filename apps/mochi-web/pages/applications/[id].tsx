import AuthLayout from '~components/auth-layout'
import { NextPageWithLayout } from '~pages/_app'
import { useRouter } from 'next/router'
import { useFetchApplicationDetail } from '~hooks/app/useFetchApplicationDetail'
import { useProfileStore } from '~store'
import { shallow } from 'zustand/shallow'
import { AppDetailPageHeader } from '~cpn/app/detail/AppDetailPageHeader'
import { AppDetailStatistics } from '~cpn/app/detail/AppDetailStatistics'

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
  const { data: detail } = useFetchApplicationDetail(profileId, appId)

  return (
    <AuthLayout pageHeader={<AppDetailPageHeader name={detail?.name} />}>
      <AppDetailStatistics
        profileId={profileId}
        appId={appId}
        detail={detail}
      />
    </AuthLayout>
  )
}

export default App
