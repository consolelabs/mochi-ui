import { create } from 'zustand'
import { API } from '~constants/api'
import type { Tx } from '~cpn/TransactionTable'
import { transform } from '~cpn/TransactionTable/utils'
import { MOCHI_PAY_WSS } from '~envs'

export const DEFAULT_PAGE_SIZE = 15

type Filters = {
  platform?: string
  chainId?: string
  actions?: string[]
}

interface State {
  txns: Tx[][]
  addNewTx: (tx: Tx) => void
  loading: boolean
  fetching: boolean
  fetchTxns: (
    filters?: Filters,
    sort?: string,
    page?: number,
    size?: number,
  ) => Promise<void>

  size: number
  setSize: (size: number) => void
  page: number
  setPage: (page: number) => void
  total?: number

  filters: Filters
  setFilters: (partialFilters: Partial<Filters>) => void

  sort: string
  setSort: (sort: string) => void

  initWs: (override?: boolean) => void
  ws: WebSocket | null
}

export const useTransactionStore = create<State>((set, get) => ({
  txns: [],
  loading: true,
  fetching: true,
  addNewTx: (tx) => {
    const { txns, size } = get()

    // Flatten txns
    const allTxns = txns.flat()

    // Push new tx
    const newTxns = [
      {
        ...tx,
        isNew: true,
      },
      ...allTxns,
    ]

    // Set a timeout to clear isNew status
    // Should only care about the first page
    setTimeout(() => {
      const { txns } = get()

      const newTxns = JSON.parse(JSON.stringify([...txns])) as Tx[][]
      newTxns[0] = newTxns[0].map((t) => ({ ...t, isNew: false }))

      set((s) => ({ ...s, txns }))
    }, 3000)

    // Re-paginate for all pages
    const paginatedTxns: Tx[][] = []
    for (let i = 0; i < newTxns.length; i += size) {
      paginatedTxns.push(newTxns.slice(i, i + size))
    }

    set((s) => ({ ...s, txns: paginatedTxns }))
  },
  fetchTxns: async (filters, sort, page = 1, size = DEFAULT_PAGE_SIZE) => {
    set({ fetching: true })
    return API.MOCHI_PAY.query({
      page: page - 1,
      size,
      platforms: filters?.platform ? [filters.platform] : undefined,
      action: filters?.actions ? filters.actions.join('|') : undefined,
      sort_by: sort || undefined,
      // eslint-disable-next-line
      chain_ids: filters?.chainId ? [parseInt(filters.chainId)] : undefined,
    })
      .get(`/transactions`)
      .json((r) => r)
      .then((r) => {
        Promise.allSettled(r.data.map(transform)).then((results) => {
          const { txns } = get()

          txns[page - 1] = results
            .map((c) => (c.status === 'fulfilled' ? c.value : null))
            .filter(Boolean) as any

          set((s) => ({
            ...s,
            loading: false,
            fetching: false,
            txns,
            total: r.pagination.total,
          }))
        })
      })
  },

  size: 15,
  page: 1,
  setSize: (size) => {
    const { sort, size: _size, fetchTxns } = get()

    if (size !== _size) {
      set((s) => ({ ...s, size, page: 1 }))
      fetchTxns(undefined, sort, 1, size)
    }
  },
  setPage: async (page) => {
    const { txns, size, sort, page: _page, filters, fetchTxns } = get()

    if (page !== _page) {
      // Fetch new page if not exists
      if (!txns[page - 1]) {
        fetchTxns(filters, sort, page, size)
      }

      set((s) => ({ ...s, page }))
    }
  },

  filters: {
    platform: '',
  },
  setFilters: (partialFilters) => {
    const { filters: _filters, sort, size, fetchTxns } = get()

    const finalFilters = { ..._filters, ...partialFilters }

    if (JSON.stringify(finalFilters) !== JSON.stringify(_filters)) {
      set((s) => ({ ...s, filters: finalFilters, page: 1, fetching: true }))
      fetchTxns(finalFilters, sort, 1, size)
    }
  },
  sort: '',
  setSort: (sort) => {
    const { sort: _sort, filters, size, fetchTxns } = get()
    if (sort !== _sort) {
      set((s) => ({ ...s, sort, page: 1, fetching: true }))
      fetchTxns(filters, sort, 1, size)
    }
  },

  ws: null,
  initWs: (override = false) => {
    if (!override && get().ws) return
    const ws = new WebSocket(`${MOCHI_PAY_WSS}/ws/transactions`)
    ws.onopen = (e) => {
      console.info('feed connected', e)
    }

    ws.onmessage = async (e) => {
      // If not on the first page, ignore
      if (get().page !== 1) {
        return
      }

      try {
        const payload = JSON.parse(e.data)
        const { event, data } = payload
        if (event !== 'TRANSFER_CREATED') return
        get().addNewTx(await transform(data))
      } catch (e) {
        console.error(e)
      }
    }

    ws.onclose = () => {
      console.info('disconnect')
    }

    ws.onerror = (e) => {
      console.error('error', e)
    }

    set((s) => ({ ...s, ws }))
  },
}))
