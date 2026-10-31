import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

// Full-screen photo viewer: arrows/swipe to move, Esc or backdrop tap to close.
// Portaled to <body> so it sits above the nav and music button.
export default function Lightbox({ photos, index, onIndex, onClose }) {
  const closeBtn = useRef(null)
  const swipe = useRef(null)
  const photo = photos[index]
  const count = photos.length
  const go = (dir) => onIndex((index + dir + count) % count)

  useEffect(() => {
    const opener = document.activeElement
    closeBtn.current?.focus()
    document.body.classList.add('invite-locked')
    return () => {
      document.body.classList.remove('invite-locked')
      opener?.focus?.()
    }
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Preload neighbours so moving between photos is instant.
  useEffect(() => {
    for (const d of [1, -1]) new Image().src = photos[(index + d + count) % count].full
  }, [index, photos, count])

  function onTouchStart(e) {
    swipe.current = e.touches[0].clientX
  }
  function onTouchEnd(e) {
    if (swipe.current == null) return
    const dx = e.changedTouches[0].clientX - swipe.current
    swipe.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  const navBtn = 'absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-ivory backdrop-blur transition hover:bg-black/60'

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`Photo ${index + 1} of ${count}`}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 sm:p-10"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      onContextMenu={(e) => e.preventDefault()}>
      <figure className="m-0 flex max-h-full max-w-full flex-col items-center" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img key={photo.full} src={photo.full} alt={photo.alt} draggable={false}
          className="reveal is-visible max-h-[82vh] max-w-full rounded-2xl border border-gold/40 object-contain shadow-2xl select-none"
          style={{ aspectRatio: `${photo.w} / ${photo.h}` }} />
        <figcaption className="mt-4 text-center text-sm text-ivory/70">
          {photo.alt}
          <span className="ml-3 tabular-nums text-gold">{index + 1} / {count}</span>
        </figcaption>
      </figure>

      <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close photo"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-black/40 text-ivory backdrop-blur transition hover:bg-black/60">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      {count > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${navBtn} left-3 sm:left-6`}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${navBtn} right-3 sm:right-6`}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </>
      )}
    </div>,
    document.body,
  )
}
