import { couple, wedding } from '../config'
import { useCountdown } from '../lib/useCountdown'
import { Divider, Garland } from './Decorations'
import { TempleBell } from './Sacred'

function Unit({ value, label }) {
  return (
    <div className="w-[4.5rem] rounded-2xl border border-gold/40 bg-white/70 px-2 py-3 shadow-sm sm:w-24">
      <p className="font-display text-3xl font-semibold tabular-nums text-maroon sm:text-4xl">{String(value).padStart(2, '0')}</p>
      <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-ink/55 sm:text-xs">{label}</p>
    </div>
  )
}

export default function Hero() {
  const left = useCountdown(wedding.date)
  return (
    <section id="top" className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-28 text-center">
      <Garland className="top-14 md:top-16" />
      <TempleBell className="absolute left-[5%] top-[4.4rem] z-10 w-7 md:top-[5.2rem] md:w-11" chain={62} />
      <TempleBell className="absolute right-[5%] top-[4.4rem] z-10 w-7 md:top-[5.2rem] md:w-11" chain={62} pitch={1.12} delay="-1.6s" />
      <div className="reveal">
        {couple.teluguTitle && <p className="font-telugu text-2xl text-kumkum">{couple.teluguTitle}</p>}
        <p className="mt-4 text-xs uppercase tracking-[0.35em] text-ink/60">Together with their families</p>
        <h1 className="mt-5 font-script text-7xl leading-[1.05] text-maroon sm:text-8xl md:text-9xl">
          <span className="shimmer px-2">{couple.bride.name}</span>
          <span className="mx-3 block font-display text-4xl italic text-gold sm:inline sm:text-5xl">&amp;</span>
          <span className="shimmer px-2" style={{ animationDelay: '0.4s' }}>{couple.groom.name}</span>
        </h1>
        <Divider className="mt-8" />
        <p className="mt-6 font-display text-2xl font-medium text-ink sm:text-3xl">{wedding.dateLabel}</p>
        <p className="mt-1 text-sm uppercase tracking-[0.25em] text-ink/60">{wedding.cityLabel}</p>
      </div>

      <div className="reveal mt-10">
        {left.done ? (
          <p className="font-display text-3xl italic text-kumkum">Just married!</p>
        ) : (
          <div className="flex justify-center gap-2 sm:gap-4" aria-label="Countdown to the wedding">
            <Unit value={left.days} label="Days" />
            <Unit value={left.hours} label="Hours" />
            <Unit value={left.minutes} label="Minutes" />
            <Unit value={left.seconds} label="Seconds" />
          </div>
        )}
        <a href="#rsvp" className="mt-10 inline-block rounded-full bg-gradient-to-r from-maroon via-kumkum to-maroon px-9 py-3.5 font-display text-xl font-semibold tracking-wide text-ivory shadow-lg shadow-kumkum/20 transition hover:brightness-110">
          RSVP
        </a>
        {couple.hashtag && <p className="mt-5 text-sm tracking-wide text-gold">{couple.hashtag}</p>}
      </div>
    </section>
  )
}
