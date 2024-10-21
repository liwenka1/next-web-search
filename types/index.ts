export interface AdcodeData {
  status: string
  info: string
  infocode: string
  province: string
  city: string
  adcode: string
  rectangle: string
}

export interface WeatherData {
  status: string
  count: string
  info: string
  infocode: string
  lives: Lfe[]
}

export interface Lfe {
  province: string
  city: string
  adcode: string
  weather: string
  temperature: string
  winddirection: string
  windpower: string
  humidity: string
  reporttime: string
  temperature_float: string
  humidity_float: string
}
