const isProduction = process.env.NODE_ENV === 'production'
const isBeta = process.env.NEXT_PUBLIC_BETA_PAGE === 'true'

/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: false,
  experimental: {
    appDir: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
      },
    ],
  },
  async redirects() {
    const redirects = [
      {
        source: '/add',
        destination: process.env.INVITE_LINK,
        permanent: false,
      },
      {
        source: '/guide',
        destination:
          'https://mochibot.gitbook.io/mochi-bot/introduction/about-mochi-bot',
        permanent: false,
      },
      {
        source: '/open-telegram/:id',
        destination: 'tg://user?id=:id',
        permanent: false,
      },
      {
        source: '/transfer/:external_id',
        destination: '/tx/:external_id',
        permanent: false,
      },
    ]

    // TODO: remove after done dashboard
    if (isProduction && !isBeta) {
      redirects.push({
        source: '/profile/:slug*',
        destination: '/',
        permanent: false,
      })
    }

    return redirects
  },
}
