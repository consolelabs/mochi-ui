import Head from 'next/head'
import { HOME_URL } from '~envs'

interface Props {
  title?: string
  tailTitle?: boolean
  description?: string
  image?: string
  url?: string
}

export const CONFIG = {
  title: 'Mochi',
  description: 'Mochi Bot — Pay your frens using cryptocurrency',
  url: HOME_URL,
  image: `${HOME_URL}/tip.png`,
}

export const SEO = ({
  title = CONFIG.title,
  tailTitle = false,
  description = CONFIG.description,
  url = HOME_URL,
  image,
}: Props) => (
  <Head>
    <title>{title + (tailTitle ? ` — ${CONFIG.title}` : '')}</title>

    <meta name="title" content={title} />
    <meta name="description" content={description} />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image || CONFIG.image} />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={url} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={image || CONFIG.image} />
  </Head>
)
