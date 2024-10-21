import { fetchApi } from "./request"

import type { AdcodeData, WeatherData } from "@/types"

const fetchCity = async () => {
  const res = await fetchApi("https://restapi.amap.com/v3/ip?key=d392d64494354a502e6a166cc6c7e740")
  return res as AdcodeData
}

const fetchWeather = async (adcode: string) => {
  const res = await fetchApi(
    "https://restapi.amap.com/v3/weather/weatherInfo?key=d392d64494354a502e6a166cc6c7e740&city=" + adcode
  )
  return res as WeatherData
}

export { fetchCity, fetchWeather }
