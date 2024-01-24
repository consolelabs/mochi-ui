import { GetStaticProps } from 'next'
import { Badge, Typography } from '@mochi-ui/core'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'
import { api } from '~constants/mochi'
import { getDescription, getFirstImageUrl } from '~utils/changelog'
import { ChangelogPage } from '~types/mochi-schema'
import { Markdown } from '~cpn/Changelog/Markdown'

type Props = {
  data: Array<ChangelogPage>
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  await api.isReady
  const { changelogs } = api

  return {
    props: {
      data: changelogs.map((c: any) => ({
        name: c.title,
        content: c.content,
        version: c?.version || '',
      })),
    },
    revalidate: 60 * 10,
  }
}

const ChangelogItem = ({ name, content, version }: ChangelogPage) => (
  <div className="gap-8 mb-20 md:flex justify-center">
    <div className="inline-block relative w-full md:w-[176px] flex-shrink-0 mb-12 md:mb-0">
      {/* TODO: use new Badge variant when design is provided */}
      <div className="top-8 md:sticky flex flex-row md:flex-col gap-4 md:gap-2 items-center md:items-start">
        <Badge className="w-max !text-base !rounded-md !px-4">
          {version || '-'}
        </Badge>
        <Typography className="!text-text-secondary">{name}</Typography>
      </div>
    </div>
    <div className="flex flex-col flex-1 max-w-[800px] whitespace-pre-wrap -mb-8 react-markdown-block">
      <Markdown>{content}</Markdown>
    </div>
  </div>
)

export default function Changelog({ data }: Props) {
  const firstImgUrl = getFirstImageUrl(data)
  const description = getDescription(data)

  return (
    <Layout>
      <SEO
        description={description}
        image={firstImgUrl || ''}
        title={PAGES.CHANGE_LOG.title}
        tailTitle
      />
      <div className="flex flex-col pt-8 md:pt-20 landing-container">
        <div className="w-full flex justify-center mb-16 md:mb-20">
          <div className="w-full max-w-[1008px]">
            <Typography
              level="h3"
              className="w-full text-[32px] md:text-4xl mb-2 overflow-visible"
            >
              Changelog
            </Typography>
            <Typography className="!text-text-primary">
              The latest updates from Mochi.
            </Typography>
          </div>
        </div>

        {data?.map(
          (d, i) => d && <ChangelogItem {...d} key={`changelog-${i}`} />,
        )}
      </div>
    </Layout>
  )
}

Changelog.layoutType = 'landing'
