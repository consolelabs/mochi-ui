import { Typography, TypographyProps } from '@mochi-ui/core'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { NativeImage } from '~cpn/NativeImage'

export const Heading = ({
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

export const UnorderedList = ({
  children,
}: {
  children: React.ReactNode[]
}) => {
  return <ul className="list-dashed">{children}</ul>
}

export const Paragraph = ({ children }: { children: React.ReactNode[] }) => {
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

export const Image = (props: any) => {
  return (
    <NativeImage
      className="w-full mx-auto rounded-lg"
      src={props.src}
      alt={props.alt || ''}
    />
  )
}

export const Strong = ({ children }: { children: React.ReactNode[] }) => {
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

export interface MarkdownProps extends ReactMarkdownOptions {}

export const Markdown = ({
  children,
  components,
  ...props
}: ReactMarkdownOptions) => {
  return (
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
        ...components,
      }}
      remarkPlugins={[remarkGfm, remarkBreaks]}
      {...props}
    >
      {children}
    </ReactMarkdown>
  )
}
