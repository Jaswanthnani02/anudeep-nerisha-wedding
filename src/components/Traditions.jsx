import { useState } from 'react'
import { traditions } from '../config'
import { SectionHeading } from './Decorations'

export default function Traditions() {
  const [index, setIndex] = useState(0)
  const active = traditions[index]

  return (
    <section id="traditions" className="scroll-mt-20 bg-maroon px-5 py-16 text-ivory sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading light telugu="సంప్రదాయాలు" title="Our Traditions" subtitle="A guide to the rituals you'll witness at a Telugu wedding." />
        <div className="reveal mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          <ol className="space-y-2">
            {traditions.map((t, i) => (
              <li key={t.name}>
                <button type="button" onClick={() => setIndex(i)} onMouseEnter={() => setIndex(i)} aria-pressed={i === index}
                  className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition-all ${i === index ? 'bg-ivory text-maroon shadow-lg' : 'text-ivory/75 hover:bg-white/10'}`}>
                  <span className={`font-display text-2xl tabular-nums ${i === index ? 'text-gold' : 'text-ivory/40'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-xl font-medium">{t.name}</span>
                </button>
                {i === index && (
                  <div className="reveal is-visible px-4 pb-3 pt-3 md:hidden">
                    <p className="font-telugu text-lg text-turmeric">{t.telugu}</p>
                    <p className="mt-1 leading-relaxed text-ivory/80">{t.text}</p>
                  </div>
                )}
              </li>
            ))}
          </ol>
          <div key={index} className="reveal is-visible arch hidden border border-gold/50 bg-white/5 px-8 pb-12 pt-16 text-center md:block">
            <p className="font-telugu text-3xl text-turmeric">{active.telugu}</p>
            <h3 className="mt-3 font-display text-4xl font-semibold">{active.name}</h3>
            <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-ivory/80">{active.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
