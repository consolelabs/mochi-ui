import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRef } from 'react'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { ChangelogDetailTitle } from '~cpn/Changelog/ChangelogDetailTitle'
import { Footer } from '~app/layout/footer'
import { Markdown } from '~cpn/Changelog/Markdown'
import { TWITTER_LINK } from '~envs'
import { ModelProductChangelogs } from '~types/mochi-schema'
import { API, GET_PATHS } from '~constants/api'

export const getServerSideProps: GetServerSideProps<
  ModelProductChangelogs
> = async (context) => {
  const version = context.params?.version as string
  const validVersion = /\d+\.\d+\.\d+/.test(version)

  if (!validVersion) {
    return {
      notFound: true,
    }
  }
  try {
    const { data } = await API.MOCHI.get(
      GET_PATHS.CHANGELOG_DETAIL(version),
    ).json<{
      data: ModelProductChangelogs
    }>((r) => r)

    return {
      props: {
        ...data,
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { title, github_url, thumbnail_url, content, version, created_at } =
    props
  const layoutRef = useRef<HTMLDivElement>(null)
  return (
    <Layout
      footer={<Footer includeEmailSubscribe className="mt-10" />}
      ref={layoutRef}
    >
      <SEO
        description={github_url}
        image={thumbnail_url}
        title={title}
        tailTitle
      />
      <div className="flex flex-col md:px-20 pt-8 md:pt-20 landing-container !max-w-[960px] react-markdown-block">
        <div className="w-full flex justify-center mb-10">
          <ChangelogDetailTitle
            title={title ?? ''}
            social={TWITTER_LINK}
            version={version ?? ''}
            date={created_at ?? ''}
            onFollow={() => {
              layoutRef.current?.scrollTo({
                top: layoutRef.current?.scrollHeight,
                behavior: 'smooth',
              })
            }}
          />
        </div>
        {content ? <Markdown>{content}</Markdown> : null}
      </div>
    </Layout>
  )
}

Page.layoutType = 'landing'
