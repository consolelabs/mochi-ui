// const isProduction = process.env.NODE_ENV === 'production'
// const isBeta = process.env.NEXT_PUBLIC_BETA_PAGE === 'true'

/** @type {import('next').NextConfig} */
module.exports = {
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
        hostname: 'raw.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cryptologos.cc',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'zapper.xyz',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'zapper.fi',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'coin.top',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'beta.mochi.gg',
        port: '',
      },
    ],
  },
  transpilePackages: ['@mochi-ui/icons'],
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
}
