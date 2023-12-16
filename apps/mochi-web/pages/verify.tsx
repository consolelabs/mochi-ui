import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'
import { useHasMounted } from '@dwarvesf/react-hooks'
import { GetServerSideProps } from 'next'
import { VerifyWallet } from '~cpn/VerifyWallet'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { code, guild_id } = ctx.query

  if (!code)
    return {
      notFound: true,
    }

  return {
    props: {
      code,
      guild_id,
    },
  }
}

export default function Verify({
  code,
  guild_id,
}: {
  code: string
  guild_id?: string
}) {
  const mounted = useHasMounted()

  if (!mounted) {
    return null
  }

  return (
    <Layout>
      <SEO title={PAGES.VERIFY.title} tailTitle />
      <div className="flex relative flex-col items-center">
        <div className="py-16 px-12 mx-auto max-w-7xl">
          <div className="py-24 md:py-48">
            <VerifyWallet code={code} guild_id={guild_id} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

Verify.layoutType = 'landing'
