interface JsonpCallbackData {
  q: string
  p: boolean
  g: G[]
  slid: string
  queryid: string
}

interface G {
  type: string
  sa: string
  q: string
}

declare global {
  interface Window {
    jsonpCallback?: (data: JsonpCallbackData) => void // 根据需要定义回调函数的类型
  }
}

export {}
