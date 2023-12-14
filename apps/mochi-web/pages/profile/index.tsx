import AuthLayout from '~components/auth-layout'
import { PaylinkSection } from '~cpn/Profile/PaylinkSection'
import { PaymeSection } from '~cpn/Profile/PayMeSection'
import { ProfileWidget } from '~cpn/Profile/ProfileWidget'
import { TransactionSection } from '~cpn/Profile/TransactionSection'
import { NextPageWithLayout } from '~pages/_app'
import { SEO } from '~app/layout/seo'
import { useLoginWidget } from '@mochi-ui/core'

const Profile: NextPageWithLayout = () => {
  // FIXME:
  const { profile } = useLoginWidget()

  return (
    <>
      <SEO title={`${profile?.profile_name}'s profile`} />
      <AuthLayout className="bg-background-level1">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ProfileWidget />
          </div>
          <TransactionSection />
          <PaymeSection />
          <PaylinkSection />
        </div>
      </AuthLayout>
    </>
  )
}

export default Profile
