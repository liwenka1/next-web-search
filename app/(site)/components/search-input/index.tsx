"use client"

import { useEffect, useState } from "react"
import fetchJsonp from "fetch-jsonp"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRightLeft } from "lucide-react"

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { EngList } from "@/config/site"

const SearchInput = () => {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?"
  ]
  const [activeEng, setActiveEng] = useState<(typeof EngList)[number]>(EngList[0])
  const [keyword, setKeyword] = useState<string>("")
  const [suggestion, setSuggestion] = useState<{ type: string; sa: string; q: string }[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setKeyword(e.target.value)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    window.open(`${activeEng.href}${keyword}`)
    setKeyword("")
    e.preventDefault()
    console.log("submitted")
  }
  const handleSuggestion = (q: string) => {
    window.open(`${activeEng.href}${q}`)
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

  return (
    <div className="relative flex h-[40rem] flex-col items-center justify-center px-4">
      <h2 className="mb-10 text-center text-xl sm:mb-20 sm:text-5xl">Ask Aceternity UI Anything</h2>
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
      <AnimatePresence>
        {keyword && (
          <motion.div
            key="scroll-area"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[65%] z-10 h-auto w-full max-w-xl rounded-md border-0 bg-background py-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:bg-zinc-800"
          >
            <ScrollArea>
              <p
                className={cn(
                  "flex cursor-pointer rounded-md py-1 pl-4 transition-all duration-300 sm:pl-10",
                  "hover:bg-black/20 hover:bg-opacity-50 hover:pl-8"
                )}
              >
                <ArrowRightLeft />
                翻译一下
              </p>
              {suggestion?.map(({ q, sa }) => (
                <p
                  key={sa}
                  className={cn(
                    "cursor-pointer rounded-md py-1 pl-4 transition-all duration-300 sm:pl-10",
                    "hover:bg-accent hover:pl-8 hover:text-accent-foreground"
                  )}
                  onClick={() => handleSuggestion(q)}
                >
                  {q}
                </p>
              ))}
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchInput
