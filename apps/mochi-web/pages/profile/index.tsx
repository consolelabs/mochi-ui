import { ProfileWidget } from '~cpn/Profile/ProfileWidget'
import { NextPageWithLayout } from '~pages/_app'
import { SEO } from '~app/layout/seo'
import { useLoginWidget } from '@mochi-web3/login-widget'
import MochiWidget from '~cpn/MochiWidget'
import { DashboardBody } from '~cpn/DashboardBody'
import { TransactionOverviewSection } from '~cpn/Profile/TransactionSection'

const Profile: NextPageWithLayout = () => {
  const { profile } = useLoginWidget()

  return (
    <>
      <SEO title={`${profile?.profile_name}'s profile`} tailTitle />
      <DashboardBody className="bg-background-level1 !py-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ProfileWidget />
            <MochiWidget
              wrapperClassName="!shadow-input !border-divider h-full"
              className="!border-none !shadow-none"
            />
          </div>
          <TransactionOverviewSection />
        </div>
      </DashboardBody>
    </>
  )
}

export default Profile
