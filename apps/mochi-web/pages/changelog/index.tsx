import {
  Badge,
  BadgeIcon,
  Button,
  IconButton,
  Pagination,
  Tooltip,
  Typography,
} from '@mochi-ui/core'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'
import { Markdown } from '~cpn/Changelog/Markdown'
import { ModelProductChangelogs } from '~types/mochi-schema'
import { format, isValid } from 'date-fns'
import Link from 'next/link'
import { ROUTES } from '~constants/routes'
import { ArrowUpLine, InboxSolid } from '@mochi-ui/icons'
import { HOME_URL, TWITTER_LINK } from '~envs'
import { useRef, useState } from 'react'
import { Footer } from '~app/layout/footer'
import { useFetchChangelogs } from '~hooks/changelog/useFetchChangelogs'
import { useDisclosure } from '@dwarvesf/react-hooks'
import clsx from 'clsx'

const DEFAULT_PAGE_SIZE = 5

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

export default function Changelog() {
  const ref = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const { data, pagination } = useFetchChangelogs({
    page: page - 1,
    size: DEFAULT_PAGE_SIZE,
  })

  const {
    isOpen: isShowScrollTop,
    onOpen: setShowScrollTop,
    onClose: setHideScrollTop,
  } = useDisclosure()

  return (
    <Layout
      ref={ref}
      footer={<Footer includeEmailSubscribe />}
      onScroll={(e) => {
        if (e.currentTarget.scrollTop > 500) {
          setShowScrollTop()
        } else {
          setHideScrollTop()
        }
      }}
    >
      <SEO
        description="The latest updates from Mochi."
        image={`${HOME_URL}/changelog-thumbnail.png`}
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
            <Tooltip
              content="Subscribe"
              arrow="top-center"
              componentProps={{ trigger: { asChild: true } }}
            >
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
            </Tooltip>
          </div>
        </div>

        {data?.map(
          (d, i) => d && <ChangelogItem {...d} key={`changelog-${i}`} />,
        )}

        <Pagination
          recordName="changelogs"
          initalPage={page}
          initItemsPerPage={DEFAULT_PAGE_SIZE}
          page={page}
          onPageChange={setPage}
          totalItems={pagination?.total || 0}
          hideOnSinglePage
          allowCustomItemsPerPage={false}
          className="mb-4"
        />
      </div>

      <Badge
        appearance="neutral"
        className={clsx(
          'cursor-pointer top-14 left-1/2 -translate-x-1/2 z-10 absolute inline-flex transition border border-neutral-outline-border',
          {
            '-translate-y-full': !isShowScrollTop,
            'translate-y-1/2': isShowScrollTop,
          },
        )}
        onClick={() =>
          ref.current?.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      >
        <BadgeIcon className="-ml-0.5">
          <ArrowUpLine className="w-3.5 h-3.5" />
        </BadgeIcon>
        <Typography level="p5">Scroll to top</Typography>
      </Badge>
    </Layout>
  )
}

Changelog.layoutType = 'landing'
