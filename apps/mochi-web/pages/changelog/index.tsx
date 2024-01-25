import { GetStaticProps } from 'next'
import { Badge, Button, IconButton, Typography } from '@mochi-ui/core'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'
import { getDescription, getFirstImageUrl } from '~utils/changelog'
import { Markdown } from '~cpn/Changelog/Markdown'
import {
  ModelProductChangelogs,
  ResponseProductChangelogs,
} from '~types/mochi-schema'
import { format, isValid } from 'date-fns'
import Link from 'next/link'
import { ROUTES } from '~constants/routes'
import { API, GET_PATHS } from '~constants/api'
import { InboxSolid } from '@mochi-ui/icons'
import { TWITTER_LINK } from '~envs'
import { useRef } from 'react'
import { Footer } from '~app/layout/footer'

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
}: ModelProductChangelogs) => {
  const parsedDate = new Date(created_at ?? '')
  const displayDate = isValid(parsedDate) ? format(parsedDate, 'PPP') : ''
  return (
    <div className="gap-8 mb-20 md:flex justify-center">
      <div className="inline-block relative w-full md:w-[176px] flex-shrink-0 mb-10 md:mb-0">
        {/* TODO: use new Badge variant when design is provided */}
        <div className="top-8 md:sticky flex flex-row md:flex-col gap-4 md:gap-2 items-center md:items-start">
          <Badge className="w-max !text-base !rounded-md !px-4" asChild>
            <Link href={ROUTES.CHANGELOG_DETAIL(version ?? '')}>
              v{version || '_'}
            </Link>
          </Badge>
          <Typography className="!text-text-secondary">
            {displayDate}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col flex-1 max-w-[800px] whitespace-pre-wrap -mb-8 react-markdown-block">
        <Link href={ROUTES.CHANGELOG_DETAIL(version ?? '')}>
          <Typography level="h2" className="mb-4 !text-2xl">
            {title}
          </Typography>
        </Link>
        {content ? <Markdown>{content}</Markdown> : null}
      </div>
    </div>
  )
}

export default function Changelog({ data }: Props) {
  const firstImgUrl = getFirstImageUrl(data ?? [])
  const description = getDescription(data ?? [])
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Layout ref={ref} footer={<Footer includeEmailSubscribe />}>
      <SEO
        description={description}
        image={firstImgUrl || ''}
        title={PAGES.CHANGE_LOG.title}
        tailTitle
      />
      <div className="flex flex-col pt-8 md:pt-20 landing-container !max-w-[1168px]">
        <div className="w-full flex flex-col gap-2 justify-between items-start md:flex-row mb-10">
          <div className="w-full">
            <Typography
              level="h3"
              className="w-full md:text-4xl mb-2 overflow-visible !text-3xl font-semibold"
            >
              Changelog
            </Typography>
            <Typography className="!text-text-primary">
              The latest updates from Mochi.
            </Typography>
          </div>
          <div className="flex gap-2 items-center">
            <Button asChild variant="outline" color="neutral" size="sm">
              <Link href={TWITTER_LINK} target="_blank">
                Follow @mochi_gg
              </Link>
            </Button>
            <IconButton
              label="Subscribe"
              color="neutral"
              variant="outline"
              className="!text-xl !p-1.5"
              onClick={() => {
                ref.current?.scrollTo({
                  top: ref.current?.scrollHeight,
                  behavior: 'smooth',
                })
              }}
            >
              <InboxSolid />
            </IconButton>
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
