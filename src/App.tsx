import { useEffect, useRef, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { key } from './APIkey.ts'
import './App.css'
import { Weather } from './components/Weather'
import { SearchHistory, SearchHistoryProps } from './components/SearchHistory'
interface SendData {
  trigger: boolean | null
  city: string
}

interface WeatherInfo {
  city: string
  temp_c: number
}

export function App() {
  const [cityInput, setCityInput] = useState("")
  const [sendData, setSendData] = useState<SendData>({} as SendData);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({} as WeatherInfo)
  const [history, setHistory] = useState<SearchHistoryProps[]>([])
  const firstLoad = useRef(true);
  useEffect(() => {
    firstLoad.current = true;
  }, [])
  useEffect(() => {
    if (!firstLoad.current) {
      fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${sendData.city}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setCityInput('')
            return alert("City name not supported!!!")
          }
          console.log("use effet")
          setWeatherInfo({ city: sendData.city, temp_c: data?.current?.temp_c })
          setHistory(state => { return [...state, { city: sendData.city, temp_c: data?.current?.temp_c, time: new Date() }] })
          setCityInput('')
        })
      return
    }
    firstLoad.current = false;
    return
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
      <br />
      {history && history.map((h, index) => <SearchHistory city={h.city} temp_c={h.temp_c} time={h.time} key={index} />)}
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