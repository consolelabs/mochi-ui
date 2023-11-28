// const isProduction = process.env.NODE_ENV === 'production'
// const isBeta = process.env.NEXT_PUBLIC_BETA_PAGE === 'true'
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  experimental: {
    esmExternals: 'loose',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        port: '',
      },
    ],
  },
  transpilePackages: ['@consolelabs/icons'],
  async redirects() {
    const redirects = [
      {
        // link to add discord bot
        source: '/add',
        destination: process.env.ADD_DISCORD_BOT_LINK,
        permanent: false,
      },
      {
        source: '/guide',
        destination:
          'https://mochibot.gitbook.io/mochi-bot/introduction/about-mochi-bot',
        permanent: false,
      },
      {
        // support legacy route
        source: '/transfer/:external_id',
        destination: '/tx/:external_id',
        permanent: false,
      },
    ]

    return redirects
  },
})
