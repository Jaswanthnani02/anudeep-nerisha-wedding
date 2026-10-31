import { useState } from 'react'
import { events } from '../config'
import { googleCalendarUrl, icsDataUrl, mapsUrl } from '../lib/calendar'
import { SectionHeading } from './Decorations'

function Detail({ icon, label, children }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-kumkum">{icon}</span>
      <div>
        <dt className="text-xs uppercase tracking-[0.2em] text-ink/50">{label}</dt>
        <dd className="mt-0.5 leading-snug">{children}</dd>
      </div>
    </div>
  )
}

const icon = (d) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)
const ICONS = {
  calendar: icon('M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z'),
  clock: icon('M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z'),
  pin: icon('M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'),
  shirt: icon('M8 3l-5 3 2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z'),
}

export default function Events() {
  // Default to the last event (the wedding itself).
  const [activeId, setActiveId] = useState(events[events.length - 1].id)
  const active = events.find((e) => e.id === activeId) ?? events[0]

  return (
    <section id="events" className="scroll-mt-20 bg-cream/60 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading telugu="వేడుకలు" title="The Celebrations" subtitle="Three days of rituals, music and joy. Tap an event for details." />

        <div role="tablist" aria-label="Wedding events" className="reveal mx-auto grid max-w-3xl gap-2 sm:gap-4" style={{ gridTemplateColumns: `repeat(${events.length}, minmax(0, 1fr))` }}>
          {events.map((e) => {
            const selected = e.id === activeId
            return (
              <button key={e.id} type="button" role="tab" id={`tab-${e.id}`} aria-selected={selected} aria-controls={`panel-${e.id}`}
                onClick={() => setActiveId(e.id)}
                className={`min-w-0 rounded-2xl border px-1 py-4 text-center transition-all sm:px-4 ${selected ? 'border-transparent text-white shadow-lg' : 'border-gold/40 bg-white/70 text-ink hover:border-gold'}`}
                style={selected ? { background: e.accent } : undefined}>
                <span className={`block font-telugu text-sm ${selected ? 'text-white/80' : 'text-kumkum'}`}>{e.telugu}</span>
                <span className="block font-display text-xl font-semibold sm:text-3xl">{e.name}</span>
                <span className={`mt-1 block text-[10px] uppercase tracking-[0.18em] sm:text-xs ${selected ? 'text-white/75' : 'text-ink/55'}`}>
                  {e.dateLabel.split(',')[1]?.trim().replace(/ \d{4}$/, '')}
                </span>
              </button>
            )
          })}
        </div>

        <div role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`}
          className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl border border-gold/40 bg-white shadow-xl shadow-maroon/5">
          <div className="h-1.5" style={{ background: active.accent }} />
          <div key={active.id} className="reveal is-visible grid gap-8 p-7 sm:p-10 md:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="font-telugu text-lg text-kumkum">{active.telugu}</p>
              <h3 className="font-display text-5xl font-semibold text-maroon">{active.name}</h3>
              <p className="mt-3 font-display text-xl italic text-ink/70">{active.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={googleCalendarUrl(active)} target="_blank" rel="noreferrer"
                  className="rounded-full bg-maroon px-5 py-2.5 text-sm font-medium text-ivory transition hover:bg-kumkum">Add to Google Calendar</a>
                <a href={icsDataUrl(active)} download={`${active.id}.ics`}
                  className="rounded-full border border-maroon/40 px-5 py-2.5 text-sm font-medium text-maroon transition hover:border-maroon">Apple / Outlook (.ics)</a>
              </div>
            </div>
            <dl className="space-y-5">
              <Detail icon={ICONS.calendar} label="Date">{active.dateLabel}</Detail>
              <Detail icon={ICONS.clock} label="Time">{active.timeLabel}</Detail>
              <Detail icon={ICONS.pin} label="Venue">
                {active.venueName}
                <br />
                <span className="text-ink/65">{active.address}</span>
                <br />
                <a href={mapsUrl(active.address)} target="_blank" rel="noreferrer" className="text-sm text-kumkum underline underline-offset-4">Open in Maps</a>
              </Detail>
              <Detail icon={ICONS.shirt} label="Dress code">{active.outfit}</Detail>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
