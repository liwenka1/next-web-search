"use client"

import Weather from "./components/weather"
import Footer from "./components/footer"
import SearchInput from "./components/search-input"

export default function Component() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-between bg-cover bg-center p-4 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* 天气信息 */}
      <Weather />

      {/* 搜索框 */}
      <SearchInput />

      {/* 底部链接 */}
      <Footer />
    </div>
  )
}
