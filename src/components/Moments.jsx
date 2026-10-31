import { useRef, useState } from 'react'
import { photos } from '../config'
import { SectionHeading } from './Decorations'
import Lightbox from './Lightbox'

// Horizontal scroll-snap strip. Touch devices swipe natively; on desktop the
// strip can also be dragged with the mouse or stepped with the arrow buttons.
// Tapping a photo opens it full size.
export default function Moments() {
  const strip = useRef(null)
  const drag = useRef(null)
  const dragged = useRef(false)
  const [open, setOpen] = useState(null) // index of the photo in the lightbox

  function onPointerDown(e) {
    if (e.pointerType !== 'mouse') return
    drag.current = { x: e.clientX, left: strip.current.scrollLeft, id: e.pointerId }
    dragged.current = false
  }
  function onPointerMove(e) {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    if (!dragged.current && Math.abs(dx) > 5) {
      // Only capture once it's clearly a drag, so a plain click still opens the photo.
      dragged.current = true
      strip.current.setPointerCapture(drag.current.id)
      strip.current.classList.add('is-dragging')
    }
    if (dragged.current) strip.current.scrollLeft = drag.current.left - dx
  }
  function onPointerUp() {
    if (!drag.current) return
    drag.current = null
    // Re-enable snapping so the strip settles on the nearest photo.
    strip.current.classList.remove('is-dragging')
  }

  function step(dir) {
    const el = strip.current
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' })
  }

  return (
    <section id="moments" className="scroll-mt-20 bg-cream/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading telugu="మా కథ" title="Two Hearts, One Journey" subtitle="A few of our favourite moments together. Swipe to see more, tap to view full size." />
        <div className="reveal relative">
          <div ref={strip}
            className="photo-strip -mx-5 flex snap-x snap-mandatory justify-center-safe gap-4 overflow-x-auto px-5 pb-4"
            onContextMenu={(e) => e.preventDefault()}
            onPointerDown={onPointerDown} onPointerMove={onPointerMove}
            onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
            onClickCapture={(e) => {
              // A drag that ends over a photo shouldn't also open it.
              if (dragged.current) {
                e.stopPropagation()
                dragged.current = false
              }
            }}>
            {photos.map((p, i) => (
              <figure key={p.src}
                className="m-0 h-[min(62vh,520px,calc(85vw*var(--ar)))] shrink-0 snap-center overflow-hidden rounded-3xl border border-gold/40 shadow-lg md:h-[360px] lg:h-[380px]"
                style={{ aspectRatio: `${p.w} / ${p.h}`, '--ar': p.h / p.w }}>
                <button type="button" onClick={() => setOpen(i)} aria-label={`View photo full size: ${p.alt}`}
                  className="group relative block h-full w-full cursor-zoom-in focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-gold">
                  <img src={p.src} alt={p.alt} loading="lazy" draggable={false}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" style={{ objectPosition: p.position ?? '50% 30%' }} />
                  <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-black/35 text-ivory opacity-80 backdrop-blur transition group-hover:opacity-100" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                  </span>
                </button>
              </figure>
            ))}
          </div>
          <div className="mt-4 hidden justify-center gap-3 md:flex">
            {[[-1, 'Previous photo', 'M15 6l-6 6 6 6'], [1, 'Next photo', 'M9 6l6 6-6 6']].map(([dir, label, d]) => (
              <button key={dir} type="button" aria-label={label} onClick={() => step(dir)}
                className="rounded-full border border-gold/50 bg-white/80 p-2.5 text-maroon shadow-sm transition hover:border-gold hover:bg-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
              </button>
            ))}
          </div>
        </div>
      </div>
      {open !== null && <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </section>
  )
}
