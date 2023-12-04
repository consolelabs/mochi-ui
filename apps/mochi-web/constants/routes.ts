export const ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  FEATURES: '/features',
  DOCS: 'https://mochi.readme.io/reference/getting-started-with-your-api-1',
  TX_RECEIPTS: (id: string) => `/tx/${id}`,
  MY_PROFILE: '/profile',
  SERVER_LIST: '/servers',
  SERVER_DETAIL: (id: string) => `/servers/${id}`,
  SERVER_SETTINGS: (id: string) => `/servers/${id}/manage/settings`,
  APPLICATON_LIST: '/applications',
  APPLICATION_DETAIL: (id?: string | number) => `/applications/${id}`,
  SETTINGS: '/settings',
}
