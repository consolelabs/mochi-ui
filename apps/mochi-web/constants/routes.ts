export const ROUTES = {
  HOME: '/',
  DEVELOPER: '/developer',
  CHANGELOG: '/changelog',
  CHANGELOG_DETAIL: (version: string) => `/changelog/${version}`,
  EXPLORE: '/explore',
  FEATURES: '/features',
  DOCS: 'https://mochi.readme.io/reference/getting-started-with-your-api-1',
  TX_RECEIPTS: (id: string) => `/tx/${id}`,
  MY_PROFILE: '/profile',
  SERVER_LIST: '/servers',
  SERVER_DETAIL: (id: string) => `/servers/${id}`,
  SERVER_SETTINGS: (id: string) => `/servers/${id}/manage/settings`,
  APPLICATION_DETAIL_REVENUE: {
    getPath: (id: string) => `/applications/${id}/revenue`,
    pathname: '/applications/[id]/revenue',
  },
  APPLICATON_LIST: '/applications',
  APPLICATION_DETAIL: {
    getPath: (id?: string | number) => `/applications/${id}`,
    pathname: '/applications/[id]',
  },
  SETTINGS: (tab?: 'general' | 'notification') => {
    if (tab) {
      return `/settings?tab=${tab}`
    }
    return '/settings'
  },
  TRANSACTIONS: '/profile/transactions',
  PAYME: (paycode: string) => `/pay/${paycode}`,
  PAYLINK: (username: string, paycode: string) =>
    `/${username}/receive/${paycode}`,
}
