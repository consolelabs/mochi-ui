import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ViewListPayRequestsResponse } from '~types/mochi-pay-schema'

export const SWR_KEY_FETCH_PAY_REQUESTS = 'SWR_KEY_FETCH_PAY_REQUESTS'

export const useFetchPayRequests = (query: {
  profile_id?: string
  entity: 'sender' | 'recipient'
  type: 'payme' | 'paylink'
  statuses?: string
}) => {
  const { profile_id } = query
  const { data, ...rest } = useSWR<ViewListPayRequestsResponse>(
    profile_id ? [SWR_KEY_FETCH_PAY_REQUESTS, query] : null,
    async ([_, id]: [any, string]) => {
      if (!id) return []
      return API.MOCHI_PAY.query(query)
        .get(GET_PATHS.GET_PAY_REQUESTS)
        .json((r) => r ?? [])
    },
  )

  return {
    data: data?.data,
    ...rest,
  }
}
