import type { ReactElement } from 'react'
import AuthenticatedLayout from '~components/auth-layout'
import { NextPageWithLayout } from '~pages/_app'
import { SEO } from '~app/layout/seo'
import { useLoginWidget } from '@mochi-ui/core'
import Home from './home'

const Profile: NextPageWithLayout = () => {
  // FIXME:
  const { profile } = useLoginWidget()

  return (
    <>
      <SEO title={`${profile?.profile_name}'s profile`} />
      <Home />
    </>
  )
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>
}

export default Profile
