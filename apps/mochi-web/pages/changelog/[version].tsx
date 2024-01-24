import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRef } from 'react'
import wretch from 'wretch'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { ChangelogDetailTitle } from '~cpn/Changelog/ChangelogDetailTitle'
import { ChangelogFooter } from '~cpn/Changelog/ChangelogFooter'
import { Markdown } from '~cpn/Changelog/Markdown'
import { TWITTER_LINK } from '~envs'

interface ChangelogDetail {
  id: number
  product: 'Mochi'
  title: string
  content: string
  github_url: string
  thumbnail_url: string
  file_name: string
  is_expired: boolean
  version: string
  next_version: string
  previous_version: string
  created_at: string
  updated_at: string
}

export const getServerSideProps: GetServerSideProps<ChangelogDetail> = async (
  context,
) => {
  const version = context.params?.version as string
  const validVersion = /\d+\.\d+\.\d+/.test(version)

  if (!validVersion) {
    return {
      props: {
        notFound: true,
      },
    }
  }
  try {
    const { data } = await wretch(
      `https://api-preview.mochi.console.so/api/v1/product-metadata/changelogs/${version}`,
    )
      .get()
      .json((r) => r)
    return {
      props: {
        ...data,
      },
    }
  } catch (e) {
    return {
      props: {
        notFound: true,
      },
    }
  }
}

export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { title, github_url, thumbnail_url, content, version, updated_at } =
    props
  const layoutRef = useRef<HTMLDivElement>(null)
  return (
    <Layout footer={<ChangelogFooter />} ref={layoutRef}>
      <SEO
        description={github_url}
        image={thumbnail_url}
        title={title}
        tailTitle
      />
      <div className="flex flex-col pt-8 md:pt-20 landing-container">
        <div className="w-full flex justify-center mb-16 md:mb-20">
          <ChangelogDetailTitle
            title={title}
            social={TWITTER_LINK}
            version={version}
            date={updated_at || '19-09-2021'}
            onFollow={() => {
              layoutRef.current?.scrollTo({
                top: layoutRef.current?.scrollHeight,
                behavior: 'smooth',
              })
            }}
          />
        </div>
        <Markdown>{content}</Markdown>
      </div>
    </Layout>
  )
}

Page.layoutType = 'landing'
