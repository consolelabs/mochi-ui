import useSWR from 'swr'
import { API, GET_PATHS } from '~constants/api'
import {
  TransactionActionType,
  TransactionPlatform,
} from '~constants/transactions'
import { Tx } from '~cpn/TransactionTable'
import { transform } from '~cpn/TransactionTable/utils'

export const SWR_PROFILE_TRANSACTION_KEY = 'SWR_PROFILE_TRANSACTION_KEY'

export const useFetchProfileTransaction = (
  id: string,
  allowFetch: boolean = true,
  query: {
    action?: TransactionActionType
    platform?: TransactionPlatform
  } = {},
) => {
  const { data, ...rest } = useSWR<Tx[]>(
    allowFetch
      ? [SWR_PROFILE_TRANSACTION_KEY, id, query.action, query.platform]
      : null,
    () => {
      return API.MOCHI_PAY.query(query)
        .get(GET_PATHS.PROFILE_TRANSACTION(id))
        .json((r) => Promise.all(r.data.map(transform)))
    },
  )

  return {
    transactions: data,
    ...rest,
  }
}
