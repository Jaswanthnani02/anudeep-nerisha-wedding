import { couple, wedding } from '../config'
import { Garland } from './Decorations'
import { Diya } from './Sacred'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pb-10 pt-28 text-center text-ivory/80">
      <Garland className="opacity-90" />
      <div className="mb-6 flex justify-center gap-5 sm:gap-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <Diya key={i} className="h-12 w-10 sm:h-14 sm:w-12" delay={`${-i * 0.37}s`} />
        ))}
      </div>
      <p className="px-4 font-script text-5xl leading-tight text-ivory sm:text-6xl">
        <span className="block sm:inline">{couple.bride.name}</span>{' '}
        <span className="gold-text block text-4xl sm:inline sm:text-6xl">&amp;</span>{' '}
        <span className="block sm:inline">{couple.groom.name}</span>
      </p>
      <p className="mt-3 font-display text-lg italic">{wedding.dateLabel} · {wedding.cityLabel}</p>
      {couple.hashtag && <p className="mt-4 text-sm tracking-wide text-gold">{couple.hashtag}</p>}
      <p className="mt-8 text-xs uppercase tracking-[0.3em] text-ivory/40">With love and gratitude</p>
    </footer>
  )
}
