export const ROUTES = {
  HOME: '/',
  CHANGELOG: '/changelog',
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
  SETTINGS: '/settings',
  TRANSACTIONS: '/profile/transactions',
}
