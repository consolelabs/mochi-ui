import { create } from 'zustand'

type State = {
  unsavedChanges: boolean
  setUnsavedChanges: (unsavedChanges: boolean) => void
  warning: boolean
  toggleWarning: () => void
}

export const useUnsavedChanges = create<State>((set) => ({
  unsavedChanges: false,
  setUnsavedChanges: (unsavedChanges) => set({ unsavedChanges }),
  warning: false,
  toggleWarning: () => set((state) => ({ warning: !state.warning })),
}))
