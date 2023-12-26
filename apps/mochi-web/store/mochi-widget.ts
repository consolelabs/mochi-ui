import { create } from 'zustand'
import { Moniker } from '~cpn/MochiWidget/TokenPicker/type'
import { Balance } from './wallets'

type State = {
  selectedAsset: Balance | Moniker | null
  setSelectedAsset: (selectedAsset: Balance | Moniker | null) => void
}

export const useMochiWidget = create<State>((set) => ({
  selectedAsset: null,
  setSelectedAsset: (selectedAsset) => set({ selectedAsset }),
}))
