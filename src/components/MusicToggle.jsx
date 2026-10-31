export default function MusicToggle({ playing, onToggle, className = '' }) {
  return (
    <button type="button" onClick={onToggle} aria-label={playing ? 'Pause music' : 'Play music'} aria-pressed={playing}
      className={`grid h-9 w-9 place-items-center rounded-full border border-gold/60 bg-maroon text-turmeric shadow-sm transition hover:scale-105 ${className}`}>
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" />
        {playing ? (
          <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
        ) : (
          <path d="M16 9.5l5 5M21 9.5l-5 5" />
        )}
      </svg>
    </button>
  )
}
