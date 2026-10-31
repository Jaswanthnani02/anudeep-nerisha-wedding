import { useState } from 'react'
import { events, rsvp } from '../config'
import { shower } from '../lib/shower'
import { SectionHeading } from './Decorations'

const input = 'w-full rounded-xl border border-gold/40 bg-ivory/60 px-4 py-3 outline-none transition focus:border-kumkum focus:ring-2 focus:ring-kumkum/15'
const label = 'mb-1.5 block text-xs uppercase tracking-[0.2em] text-ink/60'

export default function Rsvp() {
  const [status, setStatus] = useState('idle') // idle | pending | success | error
  const [attending, setAttending] = useState('yes')
  const [chosen, setChosen] = useState(events.map((e) => e.id))
  const [firstName, setFirstName] = useState('')
  const [error, setError] = useState('')

  const toggleEvent = (id) =>
    setChosen((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))

  async function onSubmit(e) {
    e.preventDefault()
    if (status === 'pending') return
    if (attending === 'yes' && chosen.length === 0) {
      setError('Please choose at least one event you will attend.')
      return
    }
    setError('')
    const data = new FormData(e.currentTarget)
    data.set('events', attending === 'yes' ? chosen.join(', ') : '')
    setFirstName(String(data.get('name') ?? '').trim().split(' ')[0])
    setStatus('pending')
    if (!rsvp.endpoint) {
      setStatus('error')
      setError('Online RSVP isn\'t open yet. Please reply to the family directly for now.')
      return
    }
    try {
      // Formspree-compatible endpoint: form fields in, JSON status out.
      const res = await fetch(rsvp.endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
        signal: AbortSignal.timeout(15000),
      })
      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
      if (attending === 'yes') shower({ count: 220 })
    } catch {
      setStatus('error')
      setError('Sorry, we couldn\'t send your RSVP. Please try again in a moment.')
    }
  }

  return (
    <section id="rsvp" className="scroll-mt-20 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading telugu="ఆహ్వానం" title="Will You Join Us?" subtitle={rsvp.deadlineLabel} />
        <div className="reveal mx-auto max-w-2xl rounded-3xl border border-gold/40 bg-white p-6 shadow-xl shadow-maroon/5 sm:p-10">
          {status === 'success' ? (
            <div role="status" className="py-10 text-center">
              <p className="font-script text-6xl text-maroon">Thank you{firstName ? `, ${firstName}` : ''}!</p>
              <p className="mt-4 text-lg text-ink/70">
                {attending === 'yes' ? 'We can\'t wait to celebrate with you.' : 'We\'ll miss you, and we\'re grateful for your blessings.'}
              </p>
            </div>
          ) : (
            <form name="rsvp" onSubmit={onSubmit} className="space-y-6">
              {/* Honeypot: bots fill it, Formspree drops those submissions. */}
              <p hidden><label>Don't fill this out: <input name="_gotcha" tabIndex={-1} autoComplete="off" /></label></p>
              <fieldset disabled={status === 'pending'} className="space-y-6">
                <div>
                  <label htmlFor="name" className={label}>Full name</label>
                  <input id="name" name="name" required autoComplete="name" className={input} />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={label}>Email</label>
                    <input id="email" name="email" type="email" required autoComplete="email" className={input} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>Phone (optional)</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} />
                  </div>
                </div>

                <div>
                  <span className={label}>Will you attend?</span>
                  <div className="grid grid-cols-2 gap-3">
                    {[['yes', 'Joyfully accept'], ['no', 'Regretfully decline']].map(([value, text]) => (
                      <label key={value} className={`cursor-pointer rounded-xl border px-4 py-3 text-center font-display text-lg transition ${attending === value ? 'border-maroon bg-maroon text-ivory' : 'border-gold/40 hover:border-gold'}`}>
                        <input type="radio" name="attending" value={value} checked={attending === value} onChange={() => setAttending(value)} className="sr-only" />
                        {text}
                      </label>
                    ))}
                  </div>
                </div>

                {attending === 'yes' && (
                  <>
                    <div>
                      <span className={label}>Which events?</span>
                      <div className="flex flex-wrap gap-2">
                        {events.map((ev) => {
                          const on = chosen.includes(ev.id)
                          return (
                            <button key={ev.id} type="button" aria-pressed={on} onClick={() => toggleEvent(ev.id)}
                              className={`rounded-full border px-4 py-2 text-sm transition ${on ? 'border-kumkum bg-kumkum/10 text-kumkum' : 'border-gold/40 text-ink/60 hover:border-gold'}`}>
                              {on ? '✓ ' : ''}{ev.name}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    <div className="max-w-[12rem]">
                      <label htmlFor="guests" className={label}>Number of guests</label>
                      <select id="guests" name="guests" defaultValue="1" className={input}>
                        {Array.from({ length: rsvp.maxGuests }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="message" className={label}>Blessings for the couple (optional)</label>
                  <textarea id="message" name="message" rows={3} className={input} />
                </div>

                {error && <p role="alert" className="rounded-xl bg-kumkum/10 px-4 py-3 text-sm text-kumkum">{error}</p>}

                <button type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-maroon via-kumkum to-maroon px-8 py-4 font-display text-xl font-semibold tracking-wide text-ivory shadow-lg shadow-kumkum/20 transition hover:brightness-110 disabled:opacity-60">
                  {status === 'pending' ? 'Sending…' : 'Send RSVP'}
                </button>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
