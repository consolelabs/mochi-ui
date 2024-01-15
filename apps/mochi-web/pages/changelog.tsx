import { GetStaticProps } from 'next'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { api } from '~constants/mochi'
import { NativeImage } from '~cpn/NativeImage'
import { Badge, Typography, TypographyProps } from '@mochi-ui/core'
import clsx from 'clsx'

type Page = {
  name: string
  content: any
}

type Props = {
  data: Array<Page>
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  await api.isReady
  const { changelogs } = api

  return {
    props: {
      data: changelogs.map((c: any) => ({ name: c.title, content: c.content })),
    },
    revalidate: 60 * 10,
  }
}

const Heading = ({
  children,
  level,
}: {
  children: React.ReactNode
  level: number
}) => {
  return (
    <Typography
      level={`h${level}` as TypographyProps['level']}
      fontWeight="md"
      className={clsx('py-8 overflow-visible', {
        '!text-[32px]': level === 1,
        '!text-2xl': level === 2,
        '!text-xl': level > 2,
      })}
    >
      {children}
    </Typography>
  )
}

const UnorderedList = ({ children }: { children: React.ReactNode }) => {
  return <ul className="list-dashed">{children}</ul>
}

const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography level="p1" className="text-xl font-normal pb-8">
      {children}
    </Typography>
  )
}

const Image = (props: any) => {
  return (
    <NativeImage
      className="w-[70%] mx-auto rounded-lg"
      src={props.src}
      alt={props.alt || ''}
    />
  )
}

const ChangelogItem = ({ name, content }: Page) => (
  <div className="gap-8 mb-24 lg:flex justify-center">
    <div className="inline-block relative w-full lg:w-[176px] flex-shrink-0 mb-12">
      <div className="top-24 lg:sticky flex flex-row lg:flex-col gap-4 lg:gap-2 items-center lg:items-start">
        <Badge className="w-max !text-base !rounded-md !px-4">v1.52.0</Badge>
        <Typography className="!text-[#5D6267]">{name}</Typography>
      </div>
    </div>
    <div className="flex flex-col flex-1 max-w-[800px] whitespace-pre-wrap -my-8">
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
        }}
        remarkPlugins={[remarkGfm, remarkBreaks]}
      >
        {content}
      </ReactMarkdown>
    </div>
  </div>
)

export default function Changelog({ data }: Props) {
  return (
    <Layout>
      <SEO title={PAGES.CHANGE_LOG.title} tailTitle />
      <div className="flex flex-col pt-8 lg:pt-24 landing-container">
        <div className="w-full flex justify-center mb-18 lg:mb-24">
          <div className="w-full max-w-[1008px] flex justify-end">
            <Typography
              level="h1"
              fontWeight="md"
              className="w-full lg:pl-[208px] text-[40px] overflow-visible"
            >
              Changelog
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
