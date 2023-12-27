import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { key } from './APIkey.ts'
import './App.css'
import { Weather } from './components/Weather'
import { SearchHistory, SearchHistoryProps } from './components/SearchHistory'
interface SendData {
  trigger: boolean
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
  useEffect(() => {
    const storedHistory = localStorage.getItem('storedHistory')

    if (storedHistory) {
      const updateHistory = JSON.parse(storedHistory)
      console.log(updateHistory)
      setHistory(updateHistory)
    }
  }, [])
  useEffect(() => {
    if (sendData.trigger) {
      const searchCity = sendData.city === '' ? 'London' : sendData.city
      fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${searchCity}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setCityInput('')
            return alert("City name not supported!!!")
          }
          console.log("use effet")
          setWeatherInfo({ city: searchCity, temp_c: data?.current?.temp_c })
          setHistory(state => {
            localStorage.setItem('storedHistory', JSON.stringify([...state, {
              city: searchCity, temp_c: data?.current?.temp_c, time: new Date().toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric"
              })
            }]))
            return [...state, { city: searchCity, temp_c: data?.current?.temp_c, time: new Date() }]
          })

          setCityInput('')
          setSendData({ trigger: false, city: '' })
        })
      return
    }
    return
  }, [sendData, history])
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