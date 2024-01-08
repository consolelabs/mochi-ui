import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import {
  TransactionActionType,
  TransactionPlatform,
} from '~constants/transactions'
import { Tx } from '~cpn/TransactionTable'
import { transform } from '~cpn/TransactionTable/utils'
import { ViewPaginationResponse } from '~types/mochi-pay-schema'

export const SWR_PROFILE_TRANSACTION_KEY = 'SWR_PROFILE_TRANSACTION_KEY'

export const useFetchProfileTransaction = (
  id: string,
  allowFetch: boolean = true,
  query: {
    action?: TransactionActionType
    platform?: TransactionPlatform
    chain_ids?: string
    page?: number
    size?: number
  } = {},
) => {
  const { data, ...rest } = useSWR<{
    data?: Tx[]
    pagination: ViewPaginationResponse
  }>(
    allowFetch
      ? [
          SWR_PROFILE_TRANSACTION_KEY,
          id,
          query.action,
          query.platform,
          query.chain_ids,
          query.page,
          query.size,
        ]
      : null,
    () => {
      return API.MOCHI_PAY.query(query)
        .get(GET_PATHS.PROFILE_TRANSACTION(id))
        .json(async (r) => ({
          data: await Promise.all(r.data?.map(transform) ?? []),
          pagination: r.pagination,
        }))
    },
  )

  return {
    transactions: data?.data,
    pagination: data?.pagination,
    ...rest,
  }
}
