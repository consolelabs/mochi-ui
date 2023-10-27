import type { ReactElement } from 'react'
import AuthenticatedLayout from '~components/auth-layout'
import { NextPageWithLayout } from '~pages/_app'
import Home from './home'

const Profile: NextPageWithLayout = () => {
  // FIXME:
  return <Home />
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>
}

export default Profile
