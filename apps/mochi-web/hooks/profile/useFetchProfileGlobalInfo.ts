import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ResponseGetGlobalProfileInfoResponse } from '~types/mochi-schema'

export const SWR_KEY_FETCH_PROFILE_GLOBAL_INFO =
  'SWR_KEY_FETCH_PROFILE_GLOBAL_INFO'

export const useFetchProfileGlobalInfo = (profileId?: string) => {
  const { data = { data: [], pnl: '0', total: 0 }, ...rest } = useSWR(
    profileId ? [SWR_KEY_FETCH_PROFILE_GLOBAL_INFO, profileId] : null,
    async ([_, id]: [any, string]) => {
      if (!id) return { data: [], pnl: '0', total: 0 }

      const profile = (await API.MOCHI_PROFILE.get(
        `/profiles/${id}?no_fetch_amount=false`,
      ).json()) as any

      let total = 0

      for (const acc of profile.associated_accounts ?? []) {
        total += +acc.total_amount
      }

      return {
        total,
        pnl: profile.pnl,
        data: (
          await API.MOCHI.get(GET_PATHS.GET_PROFILE_GLOBAL_INFO(id)).json(
            (r) => r ?? [],
          )
        ).data,
      }
    },
  )

  return {
    data: {
      info: data.data as ResponseGetGlobalProfileInfoResponse,
      pnl: data.pnl,
      total: data.total,
    },
    ...rest,
  }
}
