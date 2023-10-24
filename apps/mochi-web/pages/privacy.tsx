import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'

export default function PrivacyPolicy() {
  return (
    <Layout>
      <SEO title={PAGES.PRIVACY.title} tailTitle />
      <iframe
        style={{ height: 'calc(100vh - 348px - 80px)' }}
        className="mx-auto w-full"
        src="https://www.iubenda.com/privacy-policy/31936890/legal"
      />
    </Layout>
  )
}
