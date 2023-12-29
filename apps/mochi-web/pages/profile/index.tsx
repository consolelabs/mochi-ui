import { PaylinkSection } from '~cpn/Profile/PaylinkSection'
import { PaymeSection } from '~cpn/Profile/PaymeSection'
import { ProfileWidget } from '~cpn/Profile/ProfileWidget'
import { TransactionSection } from '~cpn/Profile/TransactionSection'
import { NextPageWithLayout } from '~pages/_app'
import { SEO } from '~app/layout/seo'
import { useLoginWidget } from '@mochi-web3/login-widget'
import MochiWidget from '~cpn/MochiWidget'
import { DashboardBody } from '~cpn/DashboardBody'

const Profile: NextPageWithLayout = () => {
  const { profile } = useLoginWidget()

  return (
    <>
      <SEO title={`${profile?.profile_name}'s profile`} tailTitle />
      <DashboardBody className="bg-background-level1">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ProfileWidget />
            <MochiWidget
              wrapperClassName="!shadow-input !border-divider h-full"
              className="!border-none !shadow-none"
            />
          </div>
          <TransactionSection />
          <PaymeSection />
          <PaylinkSection />
        </div>
      </DashboardBody>
    </>
  )
}

export default Profile
