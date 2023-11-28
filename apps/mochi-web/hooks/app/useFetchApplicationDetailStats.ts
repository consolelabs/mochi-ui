import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ViewApplicationStatsResponse } from '~types/mochi-pay-schema'

export const SWR_KEY_FETCH_APPLICATION_DETAIL_STATS =
  'SWR_KEY_FETCH_APPLICATION_DETAIL_STATS'

export const useFetchApplicationDetailStats = (
  profileId?: string,
  appId?: string,
) => {
  const { data, ...rest } = useSWR<ViewApplicationStatsResponse>(
    [SWR_KEY_FETCH_APPLICATION_DETAIL_STATS, profileId, appId],
    async ([_, profileId, appId]: [any, string, string]) => {
      if (!profileId || !appId) return []
      return API.MOCHI_PAY.get(
        GET_PATHS.GET_APPLICATION_DETAIL_STATS(profileId, appId),
      ).json((r) => r ?? [])
    },
  )

  return {
    data: data?.data,
    ...rest,
  }
}
