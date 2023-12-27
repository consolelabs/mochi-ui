import { create } from 'zustand'
import { API } from '~constants/api'

// FIXME: This should be covered by BE schemas
export type TransactionSummary = {
  current_transactions: number
  transactions_per_second: number
  transactions_per_day: number
  success_transactions: number
  fail_transactions: number
  total_volume: number
  users: number
  tips_given: number
  active_users: number
  total_networks: number
}

export type TransactionSummaryStore = {
  loading: boolean
  transactionSummary?: TransactionSummary
  fetchTransactionSummary: () => Promise<TransactionSummary>
}

export const useTransactionSummaryStore = create<TransactionSummaryStore>(
  (set) => ({
    loading: false,
    transactionSummary: undefined,
    fetchTransactionSummary: async () => {
      set((s) => ({ ...s, loading: true }))

      const transactionSummary: TransactionSummary = await API.MOCHI_PAY.get(
        '/transactions/summary',
      ).json((r) => r.data)

      set((s) => ({ ...s, transactionSummary, loading: false }))

      return transactionSummary
    },
  }),
)
