import { create } from 'zustand'
import { API, GET_PATHS } from '~constants/api'
import { Pagination } from '~types/api'
import {
  ViewActivityResponseData,
  ViewProfile,
} from '~types/mochi-profile-schema'
import { api, UI } from '~constants/mochi'
import { Platform } from '@consolelabs/mochi-ui'
import { boringAvatar } from '~utils/string'

type State = {
  me: ViewProfile | null
  setMe: (me: ViewProfile) => Promise<void>
  wallets: any
  getActivites: (query: Pagination) => Promise<ViewActivityResponseData>
  updateActivityReadStatus: (ids: number[]) => void
}

const platformIcons: Record<string, string> = {
  [Platform.Discord]:
    'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="256" height="199" viewBox="0 0 256 199"%3E%3Cpath fill="%235865F2" d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046c-19.692-2.961-39.203-2.961-58.533 0c-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632a108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237a136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848c21.142-6.58 42.646-16.637 64.815-33.213c5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2c.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2c0 14.375-10.148 26.18-23.015 26.18Z"%2F%3E%3C%2Fsvg%3E',
  [Platform.Telegram]:
    'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="256" height="256" viewBox="0 0 256 256"%3E%3Cdefs%3E%3ClinearGradient id="logosTelegram0" x1="50%25" x2="50%25" y1="0%25" y2="100%25"%3E%3Cstop offset="0%25" stop-color="%232AABEE"%2F%3E%3Cstop offset="100%25" stop-color="%23229ED9"%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath fill="url(%23logosTelegram0)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51c0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z"%2F%3E%3Cpath fill="%23FFF" d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072Z"%2F%3E%3C%2Fsvg%3E',
  [Platform.Twitter]:
    'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="currentColor" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231l5.45-6.231Zm-1.161 17.52h1.833L7.045 4.126H5.078L17.044 19.77Z"%2F%3E%3C%2Fsvg%3E',
  [Platform.Mochi]: 'https://mochi.gg/logo.png',
}

export const useProfileStore = create<State>((set, get) => ({
  me: null,
  setMe: async (me: ViewProfile) => {
    const [p] = await UI.resolve(Platform.Web, me.id ?? '')
    const { ok, data } = await api.pay.mochiWallet.getWallets(me.id ?? '')
    let wallets: any[] = []
    if (ok) {
      wallets = data
    }

    const avatar = me.avatar || boringAvatar(p?.plain)

    set({
      me: {
        ...me,
        profile_name: p?.plain ?? '',
        avatar,
        platform: p?.platform ?? '',
        platformIcon:
          platformIcons[p?.platform ?? ''] ??
          'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cg fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"%3E%3Cpath d="M21.1 8.004C21.045 8 20.984 8 20.92 8h-2.525c-2.068 0-3.837 1.628-3.837 3.75s1.77 3.75 3.837 3.75h2.525c.064 0 .125 0 .182-.004a1.755 1.755 0 0 0 1.645-1.628c.004-.06.004-.125.004-.185V9.817c0-.06 0-.125-.004-.185a1.755 1.755 0 0 0-1.645-1.628Zm-2.928 4.746c.532 0 .963-.448.963-1s-.431-1-.963-1c-.533 0-.964.448-.964 1s.431 1 .964 1Z"%2F%3E%3Cpath d="M20.918 17a.22.22 0 0 1 .221.278c-.2.712-.519 1.32-1.03 1.83c-.749.75-1.698 1.081-2.87 1.239c-1.14.153-2.595.153-4.433.153h-2.112c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87C2 15.099 2 13.644 2 11.806v-.112C2 9.856 2 8.4 2.153 7.26c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238C7.401 3 8.856 3 10.694 3h2.112c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.511.512.83 1.119 1.03 1.831a.22.22 0 0 1-.221.278h-2.524c-2.837 0-5.337 2.24-5.337 5.25s2.5 5.25 5.337 5.25h2.524ZM5.75 7a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5h-4Z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      },
      wallets,
    })
  },
  wallets: null,

  getActivites: (query) => {
    return API.MOCHI_PROFILE.query(query)
      .get(GET_PATHS.PROFILE_ACTIVITES(get().me?.id || ''))
      .res((res) => res.json())
  },
  updateActivityReadStatus: (ids) => {
    API.MOCHI_PROFILE.put(
      { ids },
      GET_PATHS.PROFILE_ACTIVITES(get().me?.id || ''),
    )
  },
}))
