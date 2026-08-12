import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRef } from 'react'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { ChangelogDetailTitle } from '~cpn/Changelog/ChangelogDetailTitle'
import { Footer } from '~app/layout/footer'
import { Markdown } from '~cpn/Changelog/Markdown'
import { HOME_URL, TWITTER_LINK } from '~envs'
import { ModelProductChangelogs } from '~types/mochi-schema'
import { API, GET_PATHS } from '~constants/api'
import {
  Badge,
  BadgeIcon,
  Button,
  IconButton,
  Separator,
  Tooltip,
  Typography,
} from '@mochi-ui/core'
import {
  Facebook,
  LinkHorizontalLine,
  X,
  MailSolid,
  ArrowLeftLine,
  ArrowRightLine,
  ArrowUpLine,
} from '@mochi-ui/icons'
import Link from 'next/link'
import { ROUTES } from '~constants/routes'
import { useClipboard, useDisclosure } from '@dwarvesf/react-hooks'
import {
  FACEBOOK_SHARE_URL,
  MAIL_SHARE_URL,
  SHARE_CONTENT,
  TWITTER_SHARE_URL,
} from '~constants/common'
import clsx from 'clsx'
import { getFirstImageUrl } from '../../utils/changelog'

export const getServerSideProps: GetServerSideProps<
  ModelProductChangelogs
> = async (context) => {
  const version = context.params?.version as string

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
  const {
    title,
    content,
    version,
    created_at,
    next_version,
    previous_version,
    seo_description,
  } = props
  const layoutRef = useRef<HTMLDivElement>(null)
  const thumbnail = getFirstImageUrl(content)

  const {
    isOpen: isShowScrollTop,
    onOpen: setShowScrollTop,
    onClose: setHideScrollTop,
  } = useDisclosure()

  const { hasCopied, onCopy } = useClipboard(
    HOME_URL + ROUTES.CHANGELOG_DETAIL(version ?? ''),
  )
  const shareUrl = HOME_URL + ROUTES.CHANGELOG_DETAIL(version ?? '')

  return (
    <Layout
      footer={<Footer includeEmailSubscribe className="mt-10" />}
      ref={layoutRef}
      onScroll={(e) => {
        if (e.currentTarget.scrollTop > 500) {
          setShowScrollTop()
        } else {
          setHideScrollTop()
        }
      }}
    >
      <SEO
        description={seo_description}
        image={thumbnail}
        title={`v${version} - ${title}`}
        url={HOME_URL + ROUTES.CHANGELOG_DETAIL(version || '1.0')}
        tailTitle
      />
      <div className="flex flex-col md:px-20 pt-8 md:pt-20 landing-container !max-w-[960px]">
        <div className="flex justify-center mb-10 w-full">
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
        <div className="react-markdown-block">
          {content ? <Markdown>{content}</Markdown> : null}
        </div>
        <div className="flex gap-2.5 justify-between items-center mt-6">
          <div className="flex flex-col gap-2">
            <Typography level="p7" className="uppercase" color="textDisabled">
              Share this release
            </Typography>
            <div className="flex gap-2 items-center">
              <Tooltip
                content="Copied"
                arrow="top-center"
                componentProps={{
                  root: { open: hasCopied },
                  trigger: { asChild: true },
                }}
              >
                <IconButton
                  label="Link"
                  color="neutral"
                  variant="outline"
                  className="!p-1.5 !text-xl"
                  onClick={onCopy}
                >
                  <LinkHorizontalLine />
                </IconButton>
              </Tooltip>
              <IconButton
                label="X"
                color="neutral"
                variant="outline"
                className="!p-1.5 !text-xl"
                asChild
              >
                <Link
                  target="_blank"
                  href={TWITTER_SHARE_URL(shareUrl, SHARE_CONTENT)}
                >
                  <X />
                </Link>
              </IconButton>
              <IconButton
                label="Facebook"
                color="neutral"
                variant="outline"
                className="!p-1.5 !text-xl"
                asChild
              >
                <Link href={FACEBOOK_SHARE_URL(shareUrl)} target="_blank">
                  <Facebook />
                </Link>
              </IconButton>
              <IconButton
                label="Mail"
                color="neutral"
                variant="outline"
                className="!p-1.5 !text-xl"
                asChild
              >
                <Link
                  target="_blank"
                  href={MAIL_SHARE_URL(SHARE_CONTENT, shareUrl)}
                >
                  <MailSolid />
                </Link>
              </IconButton>
            </div>
          </div>
          <div className="flex gap-2.5">
            <IconButton
              label="Next Changelog"
              color="neutral"
              variant="outline"
              className="!p-1.5 !text-xl"
              onClick={() => layoutRef.current?.scrollTo({ top: 0 })}
              disabled={!previous_version}
            >
              {previous_version ? (
                <Link
                  className="block"
                  href={ROUTES.CHANGELOG_DETAIL(previous_version ?? '')}
                >
                  <ArrowLeftLine />
                </Link>
              ) : (
                <ArrowLeftLine />
              )}
            </IconButton>
            <IconButton
              label="Next Changelog"
              color="neutral"
              variant="outline"
              className="!p-1.5 !text-xl"
              disabled={!next_version}
              onClick={() => {
                layoutRef.current?.scrollTo({ top: 0 })
              }}
            >
              {next_version ? (
                <Link
                  className="block"
                  href={ROUTES.CHANGELOG_DETAIL(next_version ?? '')}
                >
                  <ArrowRightLine />
                </Link>
              ) : (
                <ArrowRightLine />
              )}
            </IconButton>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex items-center w-full justify-end">
          {/* NOTE: integrate API later  */}
          {/* <TextFieldRoot size="md">
            <TextFieldDecorator className="text-xl text-text-tertiary">
              <MailLine />
            </TextFieldDecorator>
            <TextFieldInput placeholder="Send us your feedback" />
          </TextFieldRoot> */}
          <Button
            size="sm"
            variant="outline"
            color="neutral"
            className="group"
            asChild
          >
            <Link href={ROUTES.CHANGELOG}>
              View all releases
              <ArrowRightLine className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
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
          layoutRef.current?.scrollTo({
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

Page.layoutType = 'landing'
