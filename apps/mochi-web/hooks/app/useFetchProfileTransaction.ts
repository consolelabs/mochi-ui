import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import { ViewTransferV2Response } from '~types/mochi-pay-schema'

export const SWR_PROFILE_TRANSACTION_KEY = 'SWR_PROFILE_TRANSACTION_KEY'

export const useFetchProfileTransaction = (
  id: string,
  allowFetch: boolean = true,
) => {
  const { data, ...rest } = useSWR<ViewTransferV2Response>(
    allowFetch ? [SWR_PROFILE_TRANSACTION_KEY, id] : null,
    () => {
      return API.MOCHI_PAY.get(GET_PATHS.PROFILE_TRANSACTION(id)).json((r) => r)
    },
  )

  return {
    transactions: data?.data,
    ...rest,
  }
}
