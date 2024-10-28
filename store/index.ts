import { create } from "zustand"

interface IndexStoreProps {
  isFocused: boolean
  setIsFocused: (isFocused: IndexStoreProps["isFocused"]) => void
}

export const useIndexStore = create<IndexStoreProps>((set) => ({
  isFocused: false,
  setIsFocused: (isFocused) => set({ isFocused })
}))
