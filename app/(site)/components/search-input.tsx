import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRightLeft, Search } from "lucide-react"
import fetchJsonp from "fetch-jsonp"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { EngList } from "@/config/site"
import { useIndexStore } from "@/store"

import { ScrollArea } from "@/components/ui/scroll-area"

const SearchInput = () => {
  const { isFocused, setIsFocused } = useIndexStore()

  const inputRef = useRef<HTMLInputElement>(null)
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

  const variantsEngList = {
    hidden: { opacity: 0, scale: 0, x: "-50%", y: "-50%" }, // 缩回到左上角
    visible: { opacity: 1, scale: 1, x: "0%", y: "0%" }, // 正常显示
    exit: { opacity: 0, scale: 0, x: "-50%", y: "-50%" } // 离开时缩回
  }
  const [activeEng, setActiveEng] = useState<(typeof EngList)[number]>(EngList[0])
  const [isShowEngList, setIsShowEngList] = useState(false)
  const handleEng = () => {
    setIsShowEngList(!isShowEngList)
  }
  const handleSearch = (s?: string) => {
    window.open(`${activeEng.href}${s || keyword}`)
  }
  const handleTranslate = () => {
    window.open(`https://fanyi.baidu.com/mtpe-individual/multimodal#/en/zh/${keyword}`)
  }

  useEffect(() => {
    if (!isFocused) {
      setKeyword("")
      setIsShowEngList(false)
    }
  }, [isFocused])

  return (
    <main className="flex h-full w-full items-center justify-center px-4 pb-80">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex w-full max-w-xl items-center justify-center"
      >
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
            className={cn(
              "h-12 w-full rounded-full border-0 px-4 py-3 text-center text-lg text-white transition-all duration-300",
              "focus:align-middle focus:outline-0 focus:outline-white",
              isFocused ? "bg-[rgb(51,51,51)] shadow-lg" : "bg-white bg-opacity-20 placeholder-white backdrop-blur-lg"
            )}
          />
          <Button
            className="absolute left-0 top-0 h-full rounded-full p-3"
            variant="ghost"
            onClick={handleEng}
            onMouseDown={(e) => {
              e.preventDefault() // 阻止默认行为，避免失去焦点
            }}
          >
            <activeEng.icon className={cn("h-full w-full", isFocused ? "text-white" : "hidden")} />
          </Button>
          <Button
            className="absolute right-0 top-0 h-full rounded-full p-3"
            variant="ghost"
            onClick={() => handleSearch()}
          >
            <Search className={cn("h-full w-full", isFocused ? "text-white" : "hidden")} />
          </Button>
        </motion.div>
        <AnimatePresence>
          {isShowEngList && (
            <motion.div
              className="absolute left-0 top-12 z-10 w-52"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variantsEngList}
              transition={{ duration: 0.3 }}
            >
              <ScrollArea className="absolute mt-1 h-auto rounded-md border-0 bg-[rgb(34,34,34)] p-1">
                {EngList.map(({ icon: Icon, title }, i) => (
                  <div
                    key={i}
                    className="flex w-full cursor-pointer rounded-md py-3 pl-4 transition-all duration-300 hover:bg-accent hover:bg-opacity-50 hover:pl-8 hover:text-accent-foreground"
                    onClick={() => {
                      setActiveEng(EngList[i])
                      setIsShowEngList(false)
                    }}
                  >
                    <Icon size={20} />
                    <span className="pl-2 text-sm">{title}</span>
                  </div>
                ))}
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {keyword && (
            <motion.div
              key="scroll-area" // 确保每次更新时都有唯一的 key
              initial={{ opacity: 0, scale: 0.95 }} // 初始状态
              animate={{ opacity: 1, scale: 1 }} // 动画到的状态
              exit={{ opacity: 0, scale: 0.95 }} // 退出时的状态
              transition={{ duration: 0.3 }} // 动画持续时间
              className="absolute top-12 mt-1 h-auto w-full rounded-md border-0 bg-[rgb(34,34,34)] p-1"
            >
              <ScrollArea>
                <p
                  className={cn(
                    "flex cursor-pointer rounded-md py-1 pl-4 transition-all duration-300",
                    "hover:bg-black/20 hover:bg-opacity-50 hover:pl-8"
                  )}
                  onClick={() => handleTranslate()}
                >
                  <ArrowRightLeft />
                  翻译一下
                </p>
                {suggestion?.map(({ q, sa }) => (
                  <p
                    key={sa}
                    className={cn(
                      "cursor-pointer rounded-md py-1 pl-4 transition-all duration-300",
                      "hover:bg-accent hover:pl-8 hover:text-accent-foreground"
                    )}
                    onClick={() => handleSearch(q)}
                  >
                    {q}
                  </p>
                ))}
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  )
}

export default SearchInput
