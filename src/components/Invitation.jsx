import { couple, invitation } from '../config'
import { Kalash } from './Decorations'
import { Muggu } from './Sacred'

function Person({ person, role }) {
  return (
    <div>
      <p className="font-script text-5xl text-maroon sm:text-6xl">{person.fullName}</p>
      {person.parents && (
        <>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-ink/50">{role}</p>
          <p className="mt-1 font-display text-lg italic text-ink/75">{person.parents}</p>
        </>
      )}
    </div>
  )
}

export default function Invitation() {
  return (
    <section id="invitation" className="scroll-mt-20 px-5 py-16 sm:py-24">
      <div className="reveal arch relative mx-auto max-w-3xl border border-gold/50 bg-white/80 px-6 pb-14 pt-20 text-center shadow-xl shadow-maroon/5 sm:px-14">
        <div className="pointer-events-none absolute inset-3 arch border border-gold/25" aria-hidden="true" />
        <Kalash className="mx-auto -mt-6 mb-4 h-20 w-16" />
        {invitation.blessing && <p className="font-telugu text-lg text-kumkum">{invitation.blessing}</p>}
        <p className="mx-auto mt-6 max-w-xl font-display text-xl leading-relaxed text-ink/80 sm:text-2xl">{invitation.intro}</p>
        <div className="mt-10 space-y-6">
          <Person person={couple.bride} role="Daughter of" />
          <p className="font-display text-4xl italic text-gold">with</p>
          <Person person={couple.groom} role="Son of" />
        </div>
        <Muggu className="mx-auto mt-10 h-28 w-28 sm:h-32 sm:w-32" />
        <p className="mx-auto mt-6 max-w-lg text-ink/70">{invitation.closing}</p>
      </div>
    </section>
  )
}
