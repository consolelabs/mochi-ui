import { create } from 'zustand'
import { API, GET_PATHS } from '~constants/api'
import type { Tx } from '~cpn/TransactionTable'
import { transform } from '~cpn/TransactionTable/utils'
import { MOCHI_PAY_WSS } from '~envs'
import isEqual from 'lodash.isequal'

export const DEFAULT_PAGE_SIZE = 15

type Filters = {
  platform?: string
  chainId?: string
  actions?: string[]
}

interface State {
  profileId: string
  txns: Tx[][]
  lastTxns: Tx[]
  loading: boolean
  fetching: boolean
  size: number
  page: number
  total?: number
  filters: Filters
  sort: string
  ws: WebSocket | null
}

interface Action {
  addNewTx: (tx: Tx) => void
  fetchTxns: (
    filters?: Filters,
    sort?: string,
    page?: number,
    size?: number,
  ) => Promise<void>
  setSize: (size: number) => void
  setPage: (page: number) => void
  setFilters: (partialFilters: Partial<Filters>) => void
  setSort: (sort: string) => void
  initWs: (override?: boolean, profileId?: string) => void
}

const initialState: State = {
  profileId: '',
  txns: [],
  lastTxns: [],
  loading: true,
  fetching: true,
  page: 1,
  size: 15,
  total: undefined,
  filters: {
    platform: '',
    actions: [],
  },
  sort: '',
  ws: null,
}

export const useTransactionStore = create<State & Action>((set, get) => ({
  ...initialState,
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
    const { profileId } = get()
    set({
      fetching: true,
    })
    return API.MOCHI_PAY.query({
      page: page - 1,
      size,
      platforms: filters?.platform ? [filters.platform] : undefined,
      action: filters?.actions ? filters.actions.join('|') : undefined,
      sort_by: sort || undefined,
      // eslint-disable-next-line
      chain_ids: filters?.chainId ? [parseInt(filters.chainId)] : undefined,
    })
      .get(
        profileId ? GET_PATHS.PROFILE_TRANSACTION(profileId) : `/transactions`,
      )
      .json((r) => r)
      .then((r) => {
        Promise.allSettled(r.data?.map((d: any) => transform(d)) || []).then(
          (results) => {
            if (results.some((r) => r.status === 'rejected')) {
              console.error(
                'some tx data cannot be rendered',
                results.filter((r) => r.status === 'rejected'),
              )
            }
            const { txns } = get()

            txns[page - 1] = results
              .map((c) => (c.status === 'fulfilled' ? c.value : null))
              .filter(Boolean) as any

            set((s) => ({
              ...s,
              loading: false,
              fetching: false,
              txns,
              lastTxns: txns[page - 1],
              total: r.pagination.total,
            }))
          },
        )
      })
  },
  setSize: (size) => {
    const { sort, size: _size, filters, fetchTxns } = get()

    if (size !== _size) {
      set((s) => ({ ...s, size, page: 1 }))
      fetchTxns(filters, sort, 1, size)
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
  setFilters: (partialFilters) => {
    const { filters: _filters, sort, size, fetchTxns } = get()

    const finalFilters = { ..._filters, ...partialFilters }

    if (!isEqual(finalFilters, _filters)) {
      set((s) => ({
        ...s,
        filters: finalFilters,
        page: 1,
        fetching: true,
        txns: [],
      }))
      fetchTxns(finalFilters, sort, 1, size)
    }
  },
  setSort: (sort) => {
    const { sort: _sort, filters, size, fetchTxns } = get()
    if (sort !== _sort) {
      set((s) => ({ ...s, sort, page: 1, fetching: true }))
      fetchTxns(filters, sort, 1, size)
    }
  },
  ws: null,
  initWs: (override = false, profileId = '') => {
    const { profileId: _profileId, ws: _ws } = get()
    const shouldOverride = profileId !== _profileId
    if (!override && _ws && !shouldOverride) return

    set((s) => ({
      ...s,
      ...initialState,
      txns: [],
      profileId,
    }))

    if (_ws) {
      _ws.close()
    }

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
