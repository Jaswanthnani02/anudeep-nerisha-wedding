import { couple, music, wedding } from '../config'
import { Garland, Kalash } from './Decorations'

// Full-screen "doors" the guest taps to open the invitation.
// state: 'closed' -> 'opening' (doors slide apart) -> 'open' (unmounted by parent)
export default function OpeningDoors({ state, onOpen }) {
  const opening = state === 'opening'
  return (
    <div role="dialog" aria-modal="true"
      aria-label={`Wedding invitation of ${couple.bride.name} and ${couple.groom.name}`}
      className={`fixed inset-0 z-50 overflow-hidden ${opening ? 'pointer-events-none' : ''}`}>
      <div className={`door door-left ${opening ? 'is-open' : ''}`} aria-hidden="true" />
      <div className={`door door-right ${opening ? 'is-open' : ''}`} aria-hidden="true" />

      <div className={`relative flex h-full flex-col items-center justify-center px-6 text-center transition-all duration-700 ${opening ? 'scale-95 opacity-0' : 'opacity-100'}`}>
        <Garland />
        <Kalash className="mb-4 h-28 w-24 drop-shadow-[0_6px_20px_rgba(232,163,23,0.35)] sm:h-36 sm:w-32" />
        {couple.teluguTitle && <p className="font-telugu text-2xl text-turmeric">{couple.teluguTitle}</p>}
        <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-ivory/70 sm:text-xs sm:tracking-[0.35em]">You are invited to the wedding of</p>
        <h1 className="mt-4 font-script text-6xl leading-tight text-ivory sm:text-7xl">
          <span className="block sm:inline">{couple.bride.name}</span>{' '}
          <span className="gold-text block text-5xl sm:inline sm:text-7xl">&amp;</span>{' '}
          <span className="block sm:inline">{couple.groom.name}</span>
        </h1>
        <p className="mt-3 font-display text-xl italic text-ivory/80">{wedding.dateLabel}</p>

        <button type="button" onClick={onOpen}
          className="mt-10 rounded-full border border-gold/70 bg-gradient-to-r from-turmeric via-gold to-turmeric px-9 py-3.5 font-display text-xl font-semibold tracking-wide text-maroon shadow-lg shadow-black/30 transition hover:scale-[1.03] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory">
          Open Invitation
        </button>
        {music && <p className="mt-4 text-xs text-ivory/50">Best enjoyed with sound on</p>}
      </div>
    </div>
  )
}
