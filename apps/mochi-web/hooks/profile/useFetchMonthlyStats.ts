import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ModelStatsResponse } from '~types/mochi-pay-schema'

export const SWR_KEY_FETCH_MONTHLY_STATS = 'SWR_KEY_FETCH_MONTHLY_STATS'

export const useFetchMonthlyStats = (profileId?: string) => {
  const { data } = useSWR<ModelStatsResponse>(
    profileId ? [SWR_KEY_FETCH_MONTHLY_STATS, profileId] : null,
    async ([_, id]: [any, string]) => {
      if (!id) return {}
      return API.MOCHI_PAY.get(GET_PATHS.GET_MONTHLY_STATS(id)).json(
        (r) => r ?? {},
      )
    },
  )

  return {
    data: data?.data,
  }
}
