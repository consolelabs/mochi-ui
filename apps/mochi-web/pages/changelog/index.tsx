import { GetStaticProps } from 'next'
import { Badge, Typography } from '@mochi-ui/core'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'
import { getDescription, getFirstImageUrl } from '~utils/changelog'
import { Markdown } from '~cpn/Changelog/Markdown'
import {
  ModelProductChangelogs,
  ResponseProductChangelogs,
} from '~types/mochi-schema'
import { format } from 'date-fns'
import Link from 'next/link'
import { ROUTES } from '~constants/routes'
import { API, GET_PATHS } from '~constants/api'

type Props = {
  data?: Array<ModelProductChangelogs>
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await API.MOCHI.get(
    GET_PATHS.CHANGELOGS,
  ).json<ResponseProductChangelogs>((r) => r)

  return {
    props: {
      data,
    },
    revalidate: 60 * 10,
  }
}

const ChangelogItem = ({
  content,
  version,
  created_at,
  title,
}: ModelProductChangelogs) => (
  <div className="gap-8 mb-20 md:flex justify-center">
    <div className="inline-block relative w-full md:w-[176px] flex-shrink-0 mb-12 md:mb-0">
      {/* TODO: use new Badge variant when design is provided */}
      <div className="top-8 md:sticky flex flex-row md:flex-col gap-4 md:gap-2 items-center md:items-start">
        <Badge className="w-max !text-base !rounded-md !px-4" asChild>
          <Link href={ROUTES.CHANGELOG_DETAIL(version ?? '')}>
            {version || '-'}
          </Link>
        </Badge>
        <Typography className="!text-text-secondary">
          {created_at ? format(new Date(created_at), 'PPP') : null}
        </Typography>
      </div>
    </div>
    <div className="flex flex-col flex-1 max-w-[800px] whitespace-pre-wrap -mb-8 react-markdown-block">
      <Link href={ROUTES.CHANGELOG_DETAIL(version ?? '')}>
        <Typography level="h2" className="!text-3xl mb-4">
          {title}
        </Typography>
      </Link>
      {content ? <Markdown>{content}</Markdown> : null}
    </div>
  </div>
)

export default function Changelog({ data }: Props) {
  const firstImgUrl = getFirstImageUrl(data ?? [])
  const description = getDescription(data ?? [])

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
