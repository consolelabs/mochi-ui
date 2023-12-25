import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'
import { SummarySection, TransactionSection } from '~cpn/explore/index/sections'

export default function ExplorePage() {
  return (
    <Layout>
      <SEO title={PAGES.EXPLORE.title} />
      <div className="flex-1">
        <SummarySection />
        <TransactionSection />
      </div>
    </Layout>
  )
}

ExplorePage.layoutType = 'landing'
