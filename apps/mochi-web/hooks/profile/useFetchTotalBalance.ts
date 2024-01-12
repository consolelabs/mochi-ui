import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ResponseUserBalanceResponse } from '~types/mochi-schema'

export const SWR_KEY_FETCH_TOTAL_BALANCES = 'SWR_KEY_FETCH_TOTAL_BALANCES'

export const useFetchTotalBalance = (profileId?: string) => {
  const { data, ...rest } = useSWR<{ data: ResponseUserBalanceResponse }>(
    profileId ? [SWR_KEY_FETCH_TOTAL_BALANCES, profileId] : null,
    async ([_, id]: [any, string]) => {
      if (!id) return []
      return API.MOCHI.get(GET_PATHS.GET_TOTAL_BALANCES(id)).json(
        (r) => r ?? [],
      )
    },
  )

  return {
    data: data?.data,
    ...rest,
  }
}
