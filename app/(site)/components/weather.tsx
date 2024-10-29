import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Droplets, Wind } from "lucide-react"

import { fetchCity, fetchWeather } from "@/lib/api"

import type { Lfe } from "@/types"
import { getWeatherIconURL } from "@/lib/weather"

const Weather = () => {
  const [weather, setWeather] = useState<Lfe>()
  useEffect(() => {
    const weatheApi = async () => {
      const { adcode } = await fetchCity()
      const res = await fetchWeather(adcode)
      setWeather(res.lives[0])
    }
    weatheApi()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute right-4 top-4 z-10 rounded-lg bg-white bg-opacity-20 p-4 text-white backdrop-blur-lg"
    >
      <div className="flex items-center space-x-2">
        <Image
          src={getWeatherIconURL(weather?.weather || "not-available.svg")}
          alt="weatherIcon"
          width={40}
          height={40}
        />
        <div>
          <div className="text-2xl font-bold">{weather?.temperature}°C</div>
          <div className="flex items-center text-sm">
            <Droplets className="mr-1 h-3 w-3" />
            <span>{weather?.humidity}%</span>
            <Wind className="ml-2 mr-1 h-3 w-3" />
            <span>{weather?.windpower} km/h</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Weather
