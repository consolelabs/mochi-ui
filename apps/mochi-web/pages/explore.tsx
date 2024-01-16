import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { SummarySection, TransactionSection } from '~cpn/explore/index/sections'
import { HOME_URL } from '~envs'

export default function ExplorePage() {
  /* useEffect(() => { */
  /*   // Scroll to top on mount */
  /*   window.scrollTo(0, 0) */
  /* }, []) */

  return (
    <Layout>
      <SEO
        title="Mochi Transactions"
        description="Let's see how Mochi citizens are doing!"
        image={`${HOME_URL}/assets/explore/explore.thumbnail.png`}
      />
      <div className="flex-1">
        <SummarySection />
        <TransactionSection />
      </div>
    </Layout>
  )
}

ExplorePage.layoutType = 'landing'
