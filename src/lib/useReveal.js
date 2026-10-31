import { useEffect } from 'react'

// Adds .is-visible to every .reveal element the first time it scrolls into view.
export function useReveal(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const els = document.querySelectorAll('.reveal:not(.is-visible)')
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.15 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [enabled])
}
