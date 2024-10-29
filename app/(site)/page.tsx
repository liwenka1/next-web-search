"use client"

import Weather from "./components/weather"
import Footer from "./components/footer"
import SearchInput from "./components/search-input"
import { useIndexStore } from "@/store"

export default function Component() {
  const { setIsFocused } = useIndexStore()

  return (
    <>
      <div className="absolute inset-0 bg-background" onClick={() => setIsFocused(false)} />

      {/* 天气信息 */}
      <Weather />

      {/* 搜索框 */}
      <SearchInput />

      {/* 底部链接 */}
      <Footer />
    </>
  )
}
