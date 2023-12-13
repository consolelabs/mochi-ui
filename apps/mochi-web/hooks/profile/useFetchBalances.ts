import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ModelBalance } from '~types/mochi-pay-schema'

export const SWR_KEY_FETCH_BALANCES = 'SWR_KEY_FETCH_BALANCES'

export const useFetchBalances = (profileId?: string) => {
  const { data, ...rest } = useSWR<{ data: ModelBalance[] }>(
    profileId ? [SWR_KEY_FETCH_BALANCES, profileId] : null,
    async ([_, id]: [any, string]) => {
      if (!id) return []
      return API.MOCHI_PAY.get(GET_PATHS.GET_BALANCES(id)).json((r) => r ?? [])
    },
  )

  return {
    data: data?.data,
    ...rest,
  }
}
