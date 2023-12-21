interface WeatherProps {
  city: string | null
  temp_c?: number
  temp_f?: number
}

export function Weather({ city, temp_c }: WeatherProps) {
  // console.log('temp_c: ', temp_c)
  return (
    <div>
      The temperature in {city} is {temp_c} °C
    </div>
  )
}