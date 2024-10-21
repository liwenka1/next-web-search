export const fetchApi = async (url: string | URL | globalThis.Request, init?: RequestInit) => {
  const res = await fetch(url, init)
  return res.json()
}
