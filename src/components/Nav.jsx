import { useEffect, useState } from 'react'
import { couple } from '../config'
import MusicToggle from './MusicToggle'

const LINKS = [
  ['Invitation', '#invitation'],
  ['Celebrations', '#events'],
  ['Traditions', '#traditions'],
  ['Moments', '#moments'],
  ['RSVP', '#rsvp'],
]

export default function Nav({ music }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled || open ? 'bg-ivory/90 shadow-sm backdrop-blur-md' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="font-script text-3xl text-maroon">
          {couple.bride.name[0]} <span className="text-gold">&amp;</span> {couple.groom.name[0]}
        </a>
        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex gap-7">
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-sm uppercase tracking-[0.18em] text-ink/70 transition hover:text-kumkum">{label}</a>
              </li>
            ))}
          </ul>
          {music && <MusicToggle {...music} />}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          {music && <MusicToggle {...music} />}
          <button type="button" className="rounded-full p-2 text-maroon" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <ul className="border-t border-gold/30 px-5 pb-4 md:hidden">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className="block py-3 text-sm uppercase tracking-[0.18em] text-ink/80">{label}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
