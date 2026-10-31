import { useState } from 'react'
import { ringBell } from '../lib/bell'

// Auspicious motifs used across the card. All animation lives in index.css.

// Decorated elephant with a raised trunk (the Gajalakshmi motif), facing right.
export function Elephant({ flip = false, className = '' }) {
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden="true">
      <g transform={flip ? 'translate(200 0) scale(-1 1)' : undefined}>
        {/* legs */}
        {[40, 64, 108, 130].map((x, i) => (
          <rect key={x} x={x} y="100" width="20" height="50" rx="8" fill={i % 2 ? '#7f7b86' : '#8d8a93'} />
        ))}
        {[40, 64, 108, 130].map((x) => (
          <rect key={`a${x}`} x={x} y="134" width="20" height="5" fill="#c9a227" />
        ))}
        {/* tail */}
        <path d="M30 88 C 18 96, 16 112, 20 122" stroke="#7f7b86" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* body */}
        <ellipse cx="88" cy="88" rx="62" ry="40" fill="#9a97a0" />
        {/* caparison: decorated cloth with gold border and bells */}
        <path d="M54 54 Q 90 40 126 54 L 122 104 Q 90 114 58 104 Z" fill="#a4161a" stroke="#c9a227" strokeWidth="3" />
        <path d="M66 62 Q 90 54 114 62 L 111 96 Q 90 103 69 96 Z" fill="none" stroke="#e8a317" strokeWidth="1.5" strokeDasharray="3 4" />
        <circle cx="90" cy="79" r="7" fill="#e8a317" stroke="#c9a227" />
        {[62, 76, 90, 104, 118].map((x) => (
          <circle key={x} cx={x} cy={x === 90 ? 112 : 108} r="3" fill="#e8a317" />
        ))}
        {/* head */}
        <circle cx="150" cy="66" r="30" fill="#a3a0a9" />
        <path d="M128 48 Q 150 30 172 48" stroke="#c9a227" strokeWidth="4" fill="none" />
        <circle cx="150" cy="38" r="4" fill="#a4161a" />
        {/* ear */}
        <path className="ear" d="M136 52 C 112 44, 108 86, 132 96 C 140 86, 142 64, 136 52 Z" fill="#8d8a93" stroke="#7f7b86" strokeWidth="1.5" />
        {/* eye and tusk */}
        <circle cx="160" cy="60" r="2.6" fill="#2b1a12" />
        <path d="M166 82 C 178 86, 184 84, 188 78" stroke="#fdf6e7" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* raised trunk holding a small garland */}
        <g className="trunk">
          <path d="M172 74 C 190 64, 194 40, 184 24 C 180 18, 186 12, 192 16" stroke="#a3a0a9" strokeWidth="13" fill="none" strokeLinecap="round" />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={192 - i * 3} cy={16 + i * 7} r="3.4" fill={i % 2 ? '#f2b632' : '#e86a17'} />
          ))}
        </g>
      </g>
    </svg>
  )
}

const petal = (len) =>
  `M0 0 C ${len * 0.34} ${-len * 0.3}, ${len * 0.3} ${-len * 0.76}, 0 ${-len} C ${-len * 0.3} ${-len * 0.76}, ${-len * 0.34} ${-len * 0.3}, 0 0 Z`

// Golden halo rays behind a lotus that blooms open when scrolled into view.
export function LotusHalo({ className = '' }) {
  const back = [-78, -52, -26, 0, 26, 52, 78]
  const front = [-48, -24, 0, 24, 48]
  return (
    <svg viewBox="-100 -100 200 200" className={`reveal lotus overflow-visible ${className}`} aria-hidden="true">
      <defs>
        <radialGradient id="halo-glow">
          <stop offset="0" stopColor="#ffe9a8" stopOpacity="0.95" />
          <stop offset="0.55" stopColor="#f2c14e" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f2c14e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="petal-back" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#f7c6d0" />
          <stop offset="1" stopColor="#e8879d" />
        </linearGradient>
        <linearGradient id="petal-front" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#f4a6b8" />
          <stop offset="1" stopColor="#c94f6d" />
        </linearGradient>
      </defs>
      <circle className="glow" r="96" fill="url(#halo-glow)" />
      <g className="halo">
        {Array.from({ length: 48 }, (_, i) => (
          <line key={i} y1={-44} y2={i % 2 ? -78 : -92} stroke="#c9a227" strokeWidth={i % 2 ? 1 : 1.6}
            strokeOpacity="0.55" strokeLinecap="round" transform={`rotate(${i * 7.5})`} />
        ))}
      </g>
      <circle className="halo-rev" r="58" fill="none" stroke="#c9a227" strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="2 6" />
      {/* leaves and water */}
      <path d="M-6 58 C -40 50, -76 56, -92 66 C -60 74, -24 72, -6 62 Z" fill="#2f6b2f" />
      <path d="M6 58 C 40 50, 76 56, 92 66 C 60 74, 24 72, 6 62 Z" fill="#3f7f3a" />
      <path d="M-70 78 Q -35 72 0 78 T 70 78" stroke="#c9a227" strokeOpacity="0.5" fill="none" />
      <g transform="translate(0 60)">
        {back.map((a, i) => (
          <path key={a} className="lotus-petal" d={petal(78)} fill="url(#petal-back)" stroke="#fff" strokeOpacity="0.5"
            style={{ '--a': `${a}deg`, '--d': `${0.15 + i * 0.07}s` }} />
        ))}
        {front.map((a, i) => (
          <path key={a} className="lotus-petal" d={petal(58)} fill="url(#petal-front)" stroke="#fff" strokeOpacity="0.6"
            style={{ '--a': `${a}deg`, '--d': `${0.7 + i * 0.08}s` }} />
        ))}
      </g>
    </svg>
  )
}

// Brass deepam with a flickering flame.
export function Diya({ className = '', delay = '0s' }) {
  return (
    <svg viewBox="0 0 60 72" className={`overflow-visible ${className}`} aria-hidden="true">
      <defs>
        <radialGradient id="diya-glow">
          <stop offset="0" stopColor="#ffd56b" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffd56b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="diya-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#e86a17" />
          <stop offset="0.5" stopColor="#f2b632" />
          <stop offset="1" stopColor="#fff3c4" />
        </linearGradient>
        <linearGradient id="diya-brass" x1="0" x2="1">
          <stop offset="0" stopColor="#8a6a12" />
          <stop offset="0.5" stopColor="#e8c766" />
          <stop offset="1" stopColor="#8a6a12" />
        </linearGradient>
      </defs>
      <circle className="flame-glow" cx="30" cy="26" r="26" fill="url(#diya-glow)" style={{ animationDelay: delay }} />
      <g className="flame" style={{ animationDelay: delay }}>
        <path d="M30 6 C 37 18, 39 29, 30 38 C 21 29, 23 18, 30 6 Z" fill="url(#diya-flame)" />
        <path d="M30 20 C 33 26, 33 31, 30 35 C 27 31, 27 26, 30 20 Z" fill="#fffbe6" />
      </g>
      <path d="M30 38 L30 42" stroke="#2b1a12" strokeWidth="1.5" />
      <path d="M4 40 Q 30 66 56 40 Q 30 46 4 40 Z" fill="url(#diya-brass)" />
      <ellipse cx="30" cy="41" rx="26" ry="3.5" fill="#a8841c" />
      <path d="M22 58 L38 58 L42 68 L18 68 Z" fill="url(#diya-brass)" />
    </svg>
  )
}

// Hanging temple bell (ganta). Sways gently; tap to ring it.
export function TempleBell({ className = '', chain = 40, pitch = 1, delay = '0s' }) {
  const [ringing, setRinging] = useState(0)
  function ring() {
    ringBell(pitch)
    setRinging((n) => n + 1) // new key restarts the ring animation on every tap
  }
  const h = chain + 50
  return (
    <button type="button" onClick={ring} aria-label="Ring the temple bell"
      className={`bell-wrap cursor-pointer ${className}`}>
      <span key={ringing} className={`bell block ${ringing ? 'is-ringing' : ''}`} style={{ animationDelay: ringing ? '0s' : delay }}>
        <svg viewBox={`0 0 40 ${h}`} className="block w-full overflow-visible">
          <defs>
            <linearGradient id="bell-brass" x1="0" x2="1">
              <stop offset="0" stopColor="#8a6a12" />
              <stop offset="0.45" stopColor="#f0d27a" />
              <stop offset="1" stopColor="#8a6a12" />
            </linearGradient>
          </defs>
          <line x1="20" y1="0" x2="20" y2={chain} stroke="#8a6a12" strokeWidth="2.5" strokeDasharray="4 2" />
          <g transform={`translate(0 ${chain})`}>
            <circle cx="20" cy="3" r="4" fill="url(#bell-brass)" />
            <path className="clapper" d="M20 30 L20 44" stroke="#5c4410" strokeWidth="2" />
            <circle className="clapper" cx="20" cy="46" r="3.5" fill="#5c4410" />
            <path d="M8 40 C 8 22, 11 7, 20 7 C 29 7, 32 22, 32 40 Z" fill="url(#bell-brass)" />
            <rect x="5" y="38" width="30" height="5" rx="2" fill="#c9a227" />
            <path d="M12 20 Q 20 16 28 20" stroke="#8a6a12" strokeWidth="1.2" fill="none" />
          </g>
        </svg>
      </span>
    </button>
  )
}

// Muggu (rangoli) that draws itself stroke by stroke, then fills with colour.
export function Muggu({ className = '' }) {
  const big = 'M0 -20 C 25 -45, 18 -80, 0 -92 C -18 -80, -25 -45, 0 -20 Z'
  const small = 'M0 -24 C 12 -38, 10 -56, 0 -63 C -10 -56, -12 -38, 0 -24 Z'
  const angles = Array.from({ length: 8 }, (_, i) => i * 45)
  return (
    <svg viewBox="-100 -100 200 200" className={`reveal muggu ${className}`} aria-hidden="true">
      {angles.map((a, i) => (
        <path key={`b${a}`} className="line fill" d={big} transform={`rotate(${a})`} pathLength="1"
          fill={i % 2 ? '#e8a317' : '#a4161a'} stroke="#6b0f1a" strokeWidth="1.6" style={{ '--d': `${i * 0.12}s` }} />
      ))}
      {angles.map((a, i) => (
        <path key={`s${a}`} className="line fill" d={small} transform={`rotate(${a + 22.5})`} pathLength="1"
          fill="#2f6b2f" stroke="#2f6b2f" strokeWidth="1.4" style={{ '--d': `${0.5 + i * 0.1}s` }} />
      ))}
      {angles.map((a, i) => (
        <circle key={`l${a}`} className="line" r="6" pathLength="1" fill="none" stroke="#c9a227" strokeWidth="1.6"
          transform={`rotate(${a + 22.5}) translate(0 -78)`} style={{ '--d': `${1 + i * 0.08}s` }} />
      ))}
      <circle className="line fill" r="17" pathLength="1" fill="#f2b632" stroke="#6b0f1a" strokeWidth="1.6" style={{ '--d': '0.2s' }} />
      <circle className="line fill" r="8" pathLength="1" fill="#a4161a" stroke="#6b0f1a" strokeWidth="1.4" style={{ '--d': '0.4s' }} />
      {Array.from({ length: 24 }, (_, i) => (
        <circle key={`d${i}`} className="dot" r="2.2" fill="#6b0f1a" transform={`rotate(${i * 15}) translate(0 -97)`}
          style={{ '--d': `${1.4 + i * 0.03}s` }} />
      ))}
    </svg>
  )
}

// Lord Venkateswara's emblem as on Telugu subhalekhas: the Thiru Namam
// between the Shankha (conch) and the Sudarshana Chakra (discus).
export function VenkateswaraEmblem({ className = '' }) {
  return (
    <svg viewBox="0 0 300 160" className={`overflow-visible ${className}`} aria-hidden="true">
      <defs>
        <radialGradient id="namam-glow">
          <stop offset="0" stopColor="#ffe9a8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="conch" x1="0" x2="1">
          <stop offset="0" stopColor="#efe6d2" />
          <stop offset="0.5" stopColor="#fffdf7" />
          <stop offset="1" stopColor="#e6d9bd" />
        </linearGradient>
        <linearGradient id="chakra-gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f0d27a" />
          <stop offset="1" stopColor="#a8841c" />
        </linearGradient>
      </defs>

      {/* Shankha */}
      <g className="float">
        <path d="M60 28 C 86 38, 94 80, 76 110 C 70 121, 63 129, 59 142 C 53 129, 45 121, 42 108 C 29 80, 36 40, 60 28 Z"
          fill="url(#conch)" stroke="#c9a227" strokeWidth="2.5" />
        <path d="M46 62 Q 60 52 76 62 M42 82 Q 60 72 80 82 M46 102 Q 60 94 74 102" stroke="#c9a227" strokeWidth="1.6" fill="none" />
        <path d="M60 28 C 66 40, 64 52, 56 58" stroke="#d8c8a4" strokeWidth="1.4" fill="none" />
        <path d="M54 130 Q 59 136 64 130 L 62 148 Q 59 152 56 148 Z" fill="#c9a227" />
        <circle cx="60" cy="27" r="5" fill="#c9a227" />
      </g>

      {/* Thiru Namam */}
      <circle className="glow" cx="150" cy="78" r="70" fill="url(#namam-glow)" />
      <path d="M130 20 L130 100 Q130 126 150 126 Q170 126 170 100 L170 20" fill="none" stroke="#c9a227" strokeWidth="19" strokeLinejoin="round" />
      <path d="M130 20 L130 100 Q130 126 150 126 Q170 126 170 100 L170 20" fill="none" stroke="#fffdf7" strokeWidth="13" strokeLinejoin="round" />
      <rect className="namam-line" x="145.5" y="26" width="9" height="92" rx="4.5" fill="#c1121f" />
      <path d="M140 132 Q 150 146 160 132 Q 150 138 140 132 Z" fill="#fffdf7" stroke="#c9a227" strokeWidth="2" />

      {/* Sudarshana Chakra */}
      <g transform="translate(240 82)">
        <g className="chakra-spin">
          {Array.from({ length: 16 }, (_, i) => (
            <path key={i} d="M-6 -44 Q 0 -62 6 -44 Z" fill={i % 2 ? '#e86a17' : '#f2b632'} transform={`rotate(${i * 22.5})`} />
          ))}
          <circle r="42" fill="none" stroke="url(#chakra-gold)" strokeWidth="5" />
          <circle r="30" fill="none" stroke="#c9a227" strokeWidth="1.5" strokeDasharray="3 3" />
          {Array.from({ length: 8 }, (_, i) => (
            <path key={`s${i}`} d="M0 -10 L 3 -26 L 0 -40 L -3 -26 Z" fill="url(#chakra-gold)" transform={`rotate(${i * 45})`} />
          ))}
          <circle r="10" fill="url(#chakra-gold)" stroke="#8a6a12" strokeWidth="1.5" />
          <circle r="4" fill="#a4161a" />
        </g>
      </g>
    </svg>
  )
}
