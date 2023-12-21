import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Weather } from './components/Weather'

interface SendData {
  trigger: boolean | null
  city: string | null
}

interface WeatherInfo {
  city: string | null
  temp_c: number
}

export function App() {
  const [cityInput, setCityInput] = useState("")
  const [sendData, setSendData] = useState<SendData>({} as SendData);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({} as WeatherInfo)
  useEffect(() => {
    const key = '860dec39e5c5491d86b231838232012'
    fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${sendData.city}`)
      .then(response => response.json())
      .then(data => {
        console.log("use effet")
        setWeatherInfo({ city: sendData.city, temp_c: data?.current?.temp_c })
      })
  }, [sendData])
  return (
    <div>
      <label htmlFor="city">Insert the city you are in right now</label><br />
      <input type="text" name="city" id="city" value={cityInput} onChange={(e) => {
        // console.log(cityInput)
        setCityInput(e.target.value)
      }} />
      <br />
      <button onClick={(e) => {
        e.preventDefault()
        setSendData({ trigger: !sendData.trigger, city: cityInput })
      }}>Look up Weather</button>
      <br />
      {weatherInfo.temp_c != undefined ? <Weather city={weatherInfo?.city} temp_c={weatherInfo.temp_c} /> : ""}
    </div >
  )
}

// const currentCount = 'The current count is:'
// export function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div>
//       <p>{currentCount} {count}</p>
//       <button onClick={(e) => {
//         e.preventDefault();
//         setCount(count + 1)
//       }}>Increase count</button>

//     </div>
//   )
// }