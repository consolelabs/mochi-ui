import { GetStaticProps } from 'next'
import {
  Badge,
  Button,
  IconButton,
  Typography,
  TypographyProps,
} from '@mochi-ui/core'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { api } from '~constants/mochi'
import { NativeImage } from '~cpn/NativeImage'
import clsx from 'clsx'
import Link from 'next/link'
import { InboxSolid } from '@mochi-ui/icons'
import { useRef } from 'react'
import { ChangelogPage } from '../types/mochi-schema'
import { getDescription, getFirstImageUrl } from '../utils/changelog'

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

const Heading = ({
  children,
  level,
}: {
  children: React.ReactNode[]
  level: number
}) => {
  return (
    <Typography
      level={`h${level + 2}` as TypographyProps['level']}
      className={clsx('pb-4 leading-tight -tracking-[0.2px]', {
        '!text-3xl md:!text-4xl': level === 1,
        '!text-2xl': level === 2,
        '!text-xl': level === 3,
      })}
      fontWeight="md"
    >
      {children}
    </Typography>
  )
}

const UnorderedList = ({ children }: { children: React.ReactNode[] }) => {
  return <ul className="list-dashed">{children}</ul>
}

const Paragraph = ({ children }: { children: React.ReactNode[] }) => {
  const hasOnlyOneChildOfStrong =
    children.length === 1 &&
    typeof children[0] !== 'string' &&
    (children[0] as React.ReactElement<any, any>)?.props.node.tagName ===
      'strong'

  return (
    <Typography
      level="p1"
      className={clsx('!text-base font-normal -tracking-[0.2px]', {
        'pb-2': hasOnlyOneChildOfStrong,
        'pb-4': !hasOnlyOneChildOfStrong,
      })}
    >
      {children}
    </Typography>
  )
}

const Image = (props: any) => {
  return (
    <NativeImage
      className="w-full mx-auto rounded-lg"
      src={props.src}
      alt={props.alt || ''}
    />
  )
}

const Strong = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <Typography
      component="strong"
      className="!text-base -tracking-[0.2px]"
      fontWeight="md"
    >
      {children}
    </Typography>
  )
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
      <ReactMarkdown
        components={{
          h1: Heading,
          h2: Heading,
          h3: Heading,
          h4: Heading,
          h5: Heading,
          h6: Heading,
          p: Paragraph,
          img: Image,
          ul: UnorderedList,
          strong: Strong,
          br: () => null,
        }}
        remarkPlugins={[remarkGfm, remarkBreaks]}
      >
        {content}
      </ReactMarkdown>
    </div>
  </div>
)

export default function Changelog({ data }: Props) {
  const firstImgUrl = getFirstImageUrl(data)
  const description = getDescription(data)
  const layoutRef = useRef<HTMLDivElement>(null)
  return (
    <Layout ref={layoutRef}>
      <SEO
        description={description}
        image={firstImgUrl || ''}
        title={PAGES.CHANGE_LOG.title}
        tailTitle
      />
      <div className="flex flex-col pt-8 md:pt-20 landing-container">
        <div className="w-full flex justify-between mb-16 md:mb-20 items-center">
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
          <div className="flex gap-2 items-center">
            <Button asChild variant="outline" color="neutral" size="sm">
              <Link href="https://twitter.com/mochi_gg_" target="_blank">
                Follow @mochi_gg
              </Link>
            </Button>
            <IconButton
              label="Subscribe"
              color="neutral"
              variant="outline"
              size="md"
              onClick={() => {
                layoutRef.current?.scrollTo({
                  top: layoutRef.current.scrollHeight,
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

      {/* <iframe
        src="https://mochigg.substack.com/embed"
        width="480"
        height="150"
        // style="border:1px solid #EEE; background:white;"
        // eslint-disable-next-line
        frameborder="0"
        scrolling="no"
      >
        asdoiaoidj
      </iframe> */}
    </Layout>
  )
}

Changelog.layoutType = 'landing'
