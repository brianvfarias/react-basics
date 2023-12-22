export interface SearchHistoryProps {
  city: string
  temp_c: number
  time: Date
}

export function SearchHistory({ city, temp_c, time }: SearchHistoryProps) {
  return (
    <div>
      <strong>City: {city}</strong>
      <span> | Temperature: {temp_c}°C</span>
      <span> | Time: {time.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric"
      })}</span>
    </div>
  )
}