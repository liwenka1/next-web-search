import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import fetchJsonp from "fetch-jsonp"
import { format } from "date-fns"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [keyword, setKeyword] = useState<string>("")
  const [suggestion, setSuggestion] = useState<{ type: string; sa: string; q: string }[]>([])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (keyword) {
      timer = setTimeout(() => {
        const encodedKeyword = encodeURIComponent(keyword)
        const url = `https://www.baidu.com/sugrec?ie=utf-8&json=1&prod=pc&wd=${encodedKeyword}&_time=${Date.now()}&callback=jsonpCallback`

        // 定义全局回调函数
        window.jsonpCallback = (data) => {
          console.log(data) // 打印返回的数据
          if (data && data.g) {
            setSuggestion(data.g) // 更新建议列表
          }
        }

        // 发起 JSONP 请求
        fetchJsonp(url)
          .then((response) => response.json()) // 解析 JSON 数据
          .then((data) => {
            console.log("Parsed JSON:", data)
            setSuggestion(data.g)
          })
          .catch((error) => {
            console.error("Error fetching data:", error)
          })

        // 清理函数以避免内存泄漏
        return () => {
          delete window.jsonpCallback // 清除全局回调函数
        }
      }, 300)
    } else {
      setSuggestion([])
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [keyword])

  const [time, setTime] = useState<Date | null>(null)
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date(new Date().getTime() + (new Date().getTimezoneOffset() + 480) * 60 * 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="z-10 mt-20 w-full max-w-md"
    >
      <h1 className="mb-8 text-center text-4xl font-bold text-white"> {time && format(time, "HH:mm")}</h1>
      <div className="relative flex justify-center">
        <motion.div
          initial={{ width: "50%" }}
          animate={{ width: isFocused ? "100%" : "50%" }}
          transition={{ duration: 0.3 }}
          className="relative w-full"
        >
          <Input
            ref={inputRef}
            type="text"
            placeholder={isFocused ? "输入搜索关键词..." : "搜索"}
            value={keyword}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (keyword === "") {
                setIsFocused(false)
              }
            }}
            className={`w-full rounded-full px-4 py-3 transition-all duration-300 ${
              isFocused
                ? "bg-white text-gray-800 shadow-lg"
                : "bg-white bg-opacity-20 text-white placeholder-white backdrop-blur-lg"
            }`}
          />
          <Button
            className="absolute right-1 top-0 rounded-full bg-transparent p-2 hover:bg-white hover:bg-opacity-20"
            // onClick={handleSearch}
          >
            <Search className={`h-full w-full ${isFocused ? "text-gray-800" : "text-white"}`} />
          </Button>
        </motion.div>
      </div>
      <div>
        {suggestion.map(({ q, sa }) => (
          <p
            key={sa}
            className="cursor-pointer rounded-md py-1 pl-4 transition-all duration-300 hover:bg-black/20 hover:bg-opacity-50 hover:pl-8"
            // onClick={() => goSearch(s)}
          >
            {q}
          </p>
        ))}
      </div>
    </motion.div>
  )
}

export default SearchInput
