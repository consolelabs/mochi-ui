import { create } from 'zustand'

export const useIsNavOpenStore = create<{
  isNavOpen: boolean
  setIsNavOpen: (b: boolean) => void
}>((set) => ({
  isNavOpen: false,
  setIsNavOpen: (isNavOpen) => set({ isNavOpen }),
}))
