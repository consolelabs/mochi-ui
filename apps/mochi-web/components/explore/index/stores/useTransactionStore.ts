import { create } from 'zustand'
import { API } from '~constants/api'
import { Tx } from '~cpn/TransactionTable'
import { transform } from '~cpn/TransactionTable/utils'

export const DEFAULT_PAGE_SIZE = 15

type Filters = {
  platform?: string
  chainId?: string
}

interface State {
  txns: Tx[][]
  addNewTx: (tx: Tx) => void
  loading: boolean
  fetchTxns: (filters?: Filters, page?: number, size?: number) => Promise<void>

  size: number
  setSize: (size: number) => void
  page: number
  setPage: (page: number) => void
  total?: number

  filters: Filters
  setFilters: (partialFilters: Partial<Filters>) => void

  initWs: (override?: boolean) => void
  ws: WebSocket | null
}

export const useTransactionStore = create<State>((set, get) => ({
  txns: [],
  loading: true,
  addNewTx: (tx) => {
    const { txns, size } = get()

    // Flatten txns
    const allTxns = txns.flat()

    // Push new tx
    const newTxns = [tx, ...allTxns]

    // Re-paginate for all pages
    const paginatedTxns: Tx[][] = []
    for (let i = 0; i < newTxns.length; i += size) {
      paginatedTxns.push(newTxns.slice(i, i + size))
    }

    set((s) => ({ ...s, txns: paginatedTxns }))
  },
  fetchTxns: async (filters, page = 1, size = DEFAULT_PAGE_SIZE) => {
    set((s) => ({ ...s, loading: true }))
    return API.MOCHI_PAY.query({
      page: page - 1,
      size,
      platforms: filters?.platform ? [filters.platform] : undefined,
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
            txns,
            total: r.pagination.total,
          }))
        })
      })
  },

  size: 15,
  page: 1,
  setSize: (size) => {
    const { size: _size, fetchTxns } = get()

    if (size !== _size) {
      set((s) => ({ ...s, size, page: 1, txns: [] }))
      fetchTxns(undefined, 1, size)
    }
  },
  setPage: async (page) => {
    const { txns, size, page: _page, filters, fetchTxns } = get()

    if (page !== _page) {
      // Fetch new page if not exists
      if (!txns[page - 1]) {
        fetchTxns(filters, page, size)
      }

      set((s) => ({ ...s, page }))
    }
  },

  filters: {
    platform: '',
  },
  setFilters: (partialFilters) => {
    const { filters: _filters, size, fetchTxns } = get()

    const finalFilters = { ..._filters, ...partialFilters }

    if (JSON.stringify(finalFilters) !== JSON.stringify(_filters)) {
      set((s) => ({ ...s, filters: finalFilters, page: 1, txns: [], total: 0 }))
      fetchTxns(finalFilters, 1, size)
    }
  },

  ws: null,
  initWs: (override = false) => {
    if (!override && get().ws) return
    const ws = new WebSocket(
      'wss://api-preview.mochi-pay.console.so/ws/transactions',
    )
    ws.onopen = (e) => {
      console.info('feed connected', e)
    }

    ws.onmessage = async (e) => {
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
