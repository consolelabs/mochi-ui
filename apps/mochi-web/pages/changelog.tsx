import { GetStaticProps } from 'next'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { api } from '~constants/mochi'

type Page = {
  name: string
  content: any
}

type Props = {
  data: Array<Page>
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  await api.isReady
  const changelogs = api.changelogs

  return {
    props: {
      data: changelogs.map((c: any) => ({ name: c.title, content: c.content })),
    },
    revalidate: 60 * 10,
  }
}

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-2xl font-medium font-heading">{children}</p>
}

const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <span className="mb-8 font-normal font-text">{children}</span>
}

const Image = (props: any) => {
  return (
    <img
      className="-mt-5 w-[70%] mx-auto rounded-lg"
      src={props.src}
      alt={props.alt || ''}
    />
  )
}

const ChangelogItem = ({ name, content }: Page) => (
  <div className="gap-9 mb-16 lg:flex">
    <div className="inline-block relative flex-shrink-0 mb-5 lg:pt-2">
      <div className="top-36 lg:sticky">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="relative px-4 font-semibold leading-9 text-center text-gray-600 lg:px-5">
            {name}
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col flex-1 pb-6 max-w-prose whitespace-pre-wrap font-text">
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
      <div className="flex flex-col py-16 px-6 mx-auto max-w-7xl md:px-12">
        <div className="mb-12 text-3xl text-center md:text-4xl lg:text-5xl font-heading">
          Changelog
        </div>
        {data?.map(
          (d, i) => d && <ChangelogItem {...d} key={`changelog-${i}`} />,
        )}
      </div>
    </Layout>
  )
}
