import { useEffect, useRef, useState } from 'react'
import { music } from './config'
import { useReveal } from './lib/useReveal'
import { shower } from './lib/shower'
import { Petals } from './components/Decorations'
import OpeningDoors from './components/OpeningDoors'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Blessings from './components/Blessings'
import BlessingShower from './components/BlessingShower'
import Invitation from './components/Invitation'
import Events from './components/Events'
import Traditions from './components/Traditions'
import Moments from './components/Moments'
import Rsvp from './components/Rsvp'
import Footer from './components/Footer'

export default function App() {
  const [doors, setDoors] = useState('closed') // closed | opening | open
  const [playing, setPlaying] = useState(false)
  const audio = useRef(null)
  // Start the scroll animations as the doors part, not hidden behind them.
  useReveal(doors !== 'closed')

  // Lock page scroll while the doors cover it.
  useEffect(() => {
    document.body.classList.toggle('invite-locked', doors === 'closed')
  }, [doors])

  // Pause when the tab is hidden or the page is left.
  useEffect(() => {
    const pause = () => audio.current?.pause()
    const onVisibility = () => document.hidden && pause()
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', pause)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', pause)
    }
  }, [])

  async function play() {
    try {
      await audio.current?.play()
      setPlaying(Boolean(audio.current))
    } catch {
      setPlaying(false)
    }
  }

  function openInvite() {
    if (doors !== 'closed') return
    play() // must start inside the click so browsers allow audio
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setDoors('opening')
    window.scrollTo(0, 0)
    setTimeout(() => setDoors('open'), reduced ? 0 : 1600)
    // Akshintalu shower as the doors part, the guests' first blessing.
    setTimeout(() => shower({ count: 240 }), reduced ? 0 : 500)
  }

  function toggleMusic() {
    if (!audio.current) return
    if (playing) {
      audio.current.pause()
      setPlaying(false)
    } else {
      play()
    }
  }

  return (
    <div className="kolam-bg relative isolate">
      {music && <audio ref={audio} src={music} loop preload="auto" onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />}
      {doors !== 'open' && <OpeningDoors state={doors} onOpen={openInvite} />}
      <Petals />
      <Nav music={music && doors === 'open' ? { playing, onToggle: toggleMusic } : null} />
      <main className="relative z-10">
        <Hero />
        <Blessings />
        <Invitation />
        <Events />
        <Traditions />
        <Moments />
        <Rsvp />
      </main>
      <Footer />
      <BlessingShower />
    </div>
  )
}
