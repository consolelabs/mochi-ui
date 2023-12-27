import { useEffect } from 'react'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { SummarySection, TransactionSection } from '~cpn/explore/index/sections'

export default function ExplorePage() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <SEO title="Explore" />
      <div className="flex-1">
        <SummarySection />
        <TransactionSection />
      </div>
    </Layout>
  )
}

ExplorePage.layoutType = 'landing'
