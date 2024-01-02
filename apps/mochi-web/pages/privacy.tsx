import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'

export default function PrivacyPolicy() {
  return (
    <Layout noFooter>
      <SEO title={PAGES.PRIVACY.title} tailTitle />
      <iframe
        style={{ height: 'calc(100dvh - 56px)' }}
        className="mx-auto w-full"
        title="privacy-policy-legal-iubenda"
        src="https://www.iubenda.com/privacy-policy/31936890/legal"
      />
    </Layout>
  )
}

PrivacyPolicy.layoutType = 'landing'
