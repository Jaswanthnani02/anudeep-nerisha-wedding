import { useEffect, useState } from 'react'

function remaining(target) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now())
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
    done: ms === 0,
  }
}

export function useCountdown(target) {
  const [left, setLeft] = useState(() => remaining(target))
  useEffect(() => {
    const id = setInterval(() => setLeft(remaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return left
}
