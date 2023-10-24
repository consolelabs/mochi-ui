import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'

export default function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404" tailTitle />
      <div className="py-48 px-12 mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold text-center">
          🍡
          <br />
          Not Found!
        </h2>
      </div>
    </Layout>
  )
}
