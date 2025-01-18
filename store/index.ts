import { create } from "zustand"
import { EngList } from "@/config/site"

interface IndexStoreProps {
  activeEng: (typeof EngList)[number]
  setActiveEng: (activeEng: IndexStoreProps["activeEng"]) => void
}

export const useIndexStore = create<IndexStoreProps>((set) => ({
  activeEng: EngList[0],
  setActiveEng: (activeEng) => set({ activeEng })
}))
