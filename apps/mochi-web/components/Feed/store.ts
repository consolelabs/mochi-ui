import { create } from 'zustand'
import { API } from '~constants/api'
import { Tx } from '~cpn/TransactionTable'
import { transform } from '~cpn/TransactionTable/utils'
import { MOCHI_PAY_WSS } from '~envs'

const limit = 20 as const

interface State {
  txns: Tx[]
  addNewTx: (tx: Tx) => void
  loading: boolean
  fetchTxns: () => Promise<void>
  initWs: (override?: boolean) => void
  ws: WebSocket | null
}

export const useTipFeed = create<State>((set, get) => ({
  txns: [],
  loading: true,
  addNewTx: (tx) => {
    set((s) => ({ ...s, txns: [tx, ...s.txns].slice(0, limit) }))
  },
  fetchTxns: async () => {
    await new Promise((r) => {
      setTimeout(r, 1000)
    })
    set((s) => ({ ...s, loading: true }))
    return API.MOCHI_PAY.get('/transactions/latest')
      .json((r) => r.data)
      .then((data) => {
        Promise.allSettled(data.map(transform)).then((results) => {
          set((s) => ({
            ...s,
            loading: false,
            txns: results
              .map((c) => (c.status === 'fulfilled' ? c.value : null))
              .filter(Boolean) as any,
          }))
        })
      })
  },
  ws: null,
  initWs: (override = false) => {
    if (!override && get().ws) return
    const ws = new WebSocket(`${MOCHI_PAY_WSS}/ws/transactions`)
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
