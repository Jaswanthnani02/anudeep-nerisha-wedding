import { useMemo } from 'react'

// Toran-style garland of mango leaves and marigolds hanging from a curved string.
export function Garland({ className = '' }) {
  const items = Array.from({ length: 24 }, (_, i) => {
    const x = 25 + i * 50
    // Hang each item from the string, a quadratic curve with y = 10 + 48t(1 - t).
    const t = x / 1200
    const y = 10 + 48 * t * (1 - t)
    return { x, y, leaf: i % 2 === 0, delay: `${(i * 0.2).toFixed(1)}s` }
  })
  return (
    <svg viewBox="0 0 1200 110" preserveAspectRatio="none" aria-hidden="true"
      className={`absolute left-1/2 top-0 h-[4.5rem] w-[max(100%,820px)] max-w-none -translate-x-1/2 md:h-24 ${className}`}>
      <path d="M0 10 Q 600 34 1200 10" stroke="#8a6a12" strokeWidth="3" fill="none" />
      {items.map(({ x, y, leaf, delay }) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          <g className="sway" style={{ animationDelay: delay }}>
            {leaf ? (
              <>
                <path d="M0 0 C 14 18, 12 52, 0 72 C -12 52, -14 18, 0 0 Z" fill="#2f6b2f" />
                <path d="M0 4 L0 68" stroke="#7fb46a" strokeWidth="1.2" />
              </>
            ) : (
              <>
                <line x1="0" y1="-12" x2="0" y2="0" stroke="#8a6a12" strokeWidth="1.5" />
                <circle r="11" fill="#e8a317" />
                <circle r="8" fill="#f2b632" />
                <circle r="4" fill="#c0560f" />
                <circle cy="22" r="7" fill="#e86a17" />
                <circle cy="22" r="3" fill="#a4161a" />
              </>
            )}
          </g>
        </g>
      ))}
    </svg>
  )
}

export function Divider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold md:w-28" />
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <g fill="none" stroke="#c9a227" strokeWidth="1.6">
          <path d="M20 2 L38 20 L20 38 L2 20 Z" />
          <path d="M20 10 L30 20 L20 30 L10 20 Z" />
        </g>
        <circle cx="20" cy="20" r="3" fill="#a4161a" />
        {[[20, 2], [38, 20], [20, 38], [2, 20]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" fill="#c9a227" />
        ))}
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold md:w-28" />
    </div>
  )
}

const PETAL_COLORS = ['#e8a317', '#f2b632', '#e86a17', '#a4161a', '#f4c2c2']

export function Petals({ count = 14 }) {
  // Random positions are fixed once per mount so petals don't jump on re-render.
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        duration: `${9 + Math.random() * 8}s`,
        delay: `${-Math.random() * 15}s`,
        drift: `${Math.round(Math.random() * 120 - 60)}px`,
        color: PETAL_COLORS[i % PETAL_COLORS.length],
        scale: 0.7 + Math.random() * 0.6,
      })),
    [count],
  )
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <span key={i} className="petal" style={{
          left: p.left, background: p.color, animationDuration: p.duration,
          animationDelay: p.delay, '--drift': p.drift, scale: p.scale, opacity: 0.8,
        }} />
      ))}
    </div>
  )
}

// Purna kalasham: a brass pot with mango leaves and a coconut, an auspicious opening motif.
export function Kalash({ className = '' }) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      <g fill="#2f6b2f">
        <path d="M60 40 C 40 30, 22 34, 10 46 C 28 46, 44 46, 60 48 Z" />
        <path d="M60 40 C 80 30, 98 34, 110 46 C 92 46, 76 46, 60 48 Z" />
        <path d="M60 42 C 48 26, 34 20, 20 22 C 32 32, 46 40, 60 46 Z" />
        <path d="M60 42 C 72 26, 86 20, 100 22 C 88 32, 74 40, 60 46 Z" />
      </g>
      <ellipse cx="60" cy="34" rx="15" ry="18" fill="#8a5a2b" />
      <path d="M48 26 Q 60 20 72 26" stroke="#5c3a1a" strokeWidth="2" fill="none" />
      <rect x="40" y="48" width="40" height="8" rx="3" fill="#c9a227" />
      <path d="M44 56 C 20 70, 20 118, 60 124 C 100 118, 100 70, 76 56 Z" fill="url(#brass)" />
      <path d="M30 88 Q 60 98 90 88" stroke="#a4161a" strokeWidth="3" fill="none" />
      <path d="M32 96 Q 60 106 88 96" stroke="#8a6a12" strokeWidth="1.5" fill="none" strokeDasharray="2 4" />
      <circle cx="60" cy="78" r="5" fill="#a4161a" />
      <rect x="44" y="124" width="32" height="6" rx="2" fill="#a8841c" />
      <defs>
        <linearGradient id="brass" x1="0" x2="1">
          <stop offset="0" stopColor="#a8841c" />
          <stop offset="0.45" stopColor="#e8c766" />
          <stop offset="1" stopColor="#8a6a12" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function SectionHeading({ telugu, title, subtitle, light = false }) {
  return (
    <div className="reveal mb-10 text-center">
      {telugu && <p className={`font-telugu text-xl ${light ? 'text-turmeric' : 'text-kumkum'}`}>{telugu}</p>}
      <h2 className={`mt-1 font-display text-5xl font-semibold sm:text-6xl ${light ? 'text-ivory' : 'text-maroon'}`}>{title}</h2>
      {subtitle && <p className={`mx-auto mt-4 max-w-xl ${light ? 'text-ivory/70' : 'text-ink/65'}`}>{subtitle}</p>}
      <Divider className="mt-6" />
    </div>
  )
}
