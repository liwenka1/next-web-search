import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import fetchJsonp from "fetch-jsonp"
import { format } from "date-fns"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { EngList } from "@/config/site"

import type { IconType } from "react-icons"
import { ScrollArea } from "@/components/ui/scroll-area"

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

  const [activeEng, setActiveEng] = useState<{ icon: IconType }>({ icon: EngList[0].icon })

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 mt-20 h-full w-full max-w-md"
    >
      <h1 className="mb-8 text-center text-4xl font-bold text-white"> {time && format(time, "HH:mm")}</h1>
      <div className="relative flex justify-center">
        <motion.div
          initial={{ width: "50%" }}
          animate={{ width: isFocused ? "100%" : "50%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
          className="relative w-full"
        >
          <Input
            ref={inputRef}
            type="text"
            placeholder={isFocused ? "" : "搜索"}
            value={keyword}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (keyword === "") {
                setIsFocused(false)
              }
            }}
            className={cn(
              "w-full rounded-full border-0 px-4 py-3 text-center transition-all duration-300",
              "focus:align-middle focus:outline-0 focus:outline-white",
              isFocused
                ? "bg-white text-gray-800 shadow-lg"
                : "bg-white bg-opacity-20 text-white placeholder-white backdrop-blur-lg"
            )}
          />
          <Button
            className="absolute left-0 top-0 h-full rounded-full p-2"
            variant="ghost"
            // onClick={handleSearch}
          >
            <activeEng.icon className={cn("h-full w-full", isFocused ? "text-gray-800" : "hidden")} />
          </Button>
          <Button
            className="absolute right-0 top-0 h-full rounded-full p-2"
            variant="ghost"
            // onClick={handleSearch}
          >
            <Search className={cn("h-full w-full", isFocused ? "text-gray-800" : "hidden")} />
          </Button>
        </motion.div>
      </div>
      <div className="top-50 absolute z-10 w-52">
        <ScrollArea className="absolute mt-1 h-auto rounded-md border-0 bg-background p-1">
          {EngList.map(({ icon: Icon, title, href }, i) => (
            <div
              key={i}
              className="flex w-full cursor-pointer rounded-md py-3 pl-4 transition-all duration-300 hover:bg-gray-800 hover:bg-opacity-50 hover:pl-8"
              onClick={() => {
                // setIsChangeEng(false)
                setActiveEng({ icon: Icon })
                // setActiveEngHref(href)
              }}
            >
              <Icon size={20} />
              <span className="pl-2 text-sm">{title}</span>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="top-50 absolute w-full">
        <ScrollArea className="mt-1 h-auto w-full rounded-md border-0 bg-background p-1">
          {suggestion?.map(({ q, sa }) => (
            <p
              key={sa}
              className={cn(
                "cursor-pointer rounded-md py-1 pl-4 transition-all duration-300",
                "hover:bg-black/20 hover:bg-opacity-50 hover:pl-8"
              )}
              // onClick={() => goSearch(s)}
            >
              {q}
            </p>
          ))}
        </ScrollArea>
      </div>
    </motion.div>
  )
}

export default SearchInput
