import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ViewApplicationStatsResponse } from '~types/mochi-pay-schema'

export const SWR_KEY_FETCH_APPLICATION_STATS = 'SWR_KEY_FETCH_APPLICATION_STATS'

export const useFetchApplicationStats = (profileId?: string) => {
  const { data, ...rest } = useSWR<ViewApplicationStatsResponse>(
    [SWR_KEY_FETCH_APPLICATION_STATS, profileId],
    async ([_, id]: [any, string]) => {
      if (!id) return {}
      return API.MOCHI_PAY.get(GET_PATHS.GET_APPLICATION_STATS(id)).json(
        (r) => r ?? {},
      )
    },
  )

  return {
    data: data?.data,
    ...rest,
  }
}
