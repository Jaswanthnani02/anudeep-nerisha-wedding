import { blessings } from '../config'
import { ringBell } from '../lib/bell'
import { shower } from '../lib/shower'
import { Divider } from './Decorations'
import { Diya, Elephant, LotusHalo, VenkateswaraEmblem } from './Sacred'

export default function Blessings() {
  function bless(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    shower({ count: 200, x: rect.left + rect.width / 2 })
    ringBell()
  }

  return (
    <section id="blessings" className="relative overflow-hidden px-5 py-16 text-center sm:py-24">
      <div className="reveal mb-8">
        <VenkateswaraEmblem className="mx-auto h-28 w-auto sm:h-36" />
        <p className="mt-3 font-telugu text-xl text-kumkum sm:text-2xl">{blessings.venkateswara}</p>
        <p className="text-xs uppercase tracking-[0.3em] text-ink/55">{blessings.venkateswaraLatin}</p>
      </div>

      <div className="reveal">
        <p className="font-telugu text-3xl leading-relaxed sm:text-4xl">
          <span className="gold-text">{blessings.invocation}</span>
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-ink/55">{blessings.transliteration}</p>
        <p className="mx-auto mt-2 max-w-md font-display text-lg italic text-ink/65">{blessings.meaning}</p>
      </div>

      <div className="mx-auto mt-6 grid max-w-4xl grid-cols-[1fr_auto_1fr] items-end gap-1 sm:gap-4">
        <Elephant className="reveal w-full max-w-[220px] justify-self-end" />
        <div className="relative h-48 w-48 sm:h-72 sm:w-72">
          <LotusHalo className="absolute inset-0 h-full w-full" />
          <p className="om absolute inset-x-0 top-[17%] font-telugu text-4xl text-kumkum sm:text-6xl" aria-hidden="true">ఓం</p>
        </div>
        <Elephant flip className="reveal w-full max-w-[220px] justify-self-start" />
      </div>

      <div className="reveal mx-auto -mt-2 flex max-w-md items-end justify-between px-2 sm:max-w-xl">
        <Diya className="h-14 w-12 sm:h-20 sm:w-16" />
        <p className="max-w-xs px-2 font-display text-xl font-medium text-maroon sm:text-2xl">{blessings.deities}</p>
        <Diya className="h-14 w-12 sm:h-20 sm:w-16" delay="-0.6s" />
      </div>

      <Divider className="reveal mt-8" />
      <div className="reveal mt-8">
        <button type="button" onClick={bless}
          className="rounded-full border border-gold/70 bg-gradient-to-r from-turmeric via-gold to-turmeric px-8 py-3.5 font-display text-xl font-semibold tracking-wide text-maroon shadow-lg shadow-turmeric/30 transition hover:scale-[1.03] hover:brightness-110 active:scale-[0.98]">
          Shower Akshintalu
        </button>
        <p className="mx-auto mt-3 max-w-sm text-sm text-ink/55">Tap to bless the couple with akshintalu, as the elders do at the muhurtam.</p>
      </div>
    </section>
  )
}
