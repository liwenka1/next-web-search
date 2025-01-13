"use client"

import Footer from "./components/footer"
import SearchInput from "./components/search-input"

export default function Component() {
  return (
    <div className="flex h-full w-full flex-col">
      {/* 天气信息 */}
      {/* <Weather /> */}

      {/* 搜索框 */}
      <SearchInput />

      {/* 底部链接 */}
      <Footer />
    </div>
  )
}
