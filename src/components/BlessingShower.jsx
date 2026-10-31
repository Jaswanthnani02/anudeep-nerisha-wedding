import { useEffect, useRef } from 'react'

// Full-screen canvas that rains akshintalu (turmeric rice) with marigold,
// rose and jasmine petals whenever shower() from lib/shower.js is called.
const KINDS = [
  // kind, weight
  ['rice', 0.55],
  ['marigold', 0.18],
  ['rose', 0.13],
  ['jasmine', 0.14],
]
const RICE = ['#f2b632', '#e8a317', '#f5c542', '#f2b632', '#c0392b']
const MARIGOLD = ['#f28c28', '#ff9f1c', '#f6a623']
const ROSE = ['#c2185b', '#e63946', '#d6336c']

function pickKind() {
  let r = Math.random()
  for (const [kind, w] of KINDS) {
    if ((r -= w) < 0) return kind
  }
  return 'rice'
}
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

function makePiece(width, height, originX) {
  const kind = pickKind()
  const rice = kind === 'rice'
  return {
    kind,
    x: originX != null ? originX + (Math.random() - 0.5) * width * 0.5 : Math.random() * width,
    y: -20 - Math.random() * height * 0.7,
    vx: (Math.random() - 0.5) * 0.8,
    vy: Math.random() * 1.2,
    max: rice ? 2.6 + Math.random() * 1.4 : 1.1 + Math.random() * 0.8,
    sway: rice ? 0.3 : 0.9 + Math.random() * 0.8,
    phase: Math.random() * Math.PI * 2,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * (rice ? 0.25 : 0.06),
    size: 0.8 + Math.random() * 0.5,
    color: pick(rice ? RICE : kind === 'marigold' ? MARIGOLD : kind === 'rose' ? ROSE : ['#fffaf0']),
    t: 0,
  }
}

function draw(ctx, p) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rot)
  ctx.fillStyle = p.color
  const s = p.size
  if (p.kind === 'rice') {
    ctx.beginPath()
    ctx.ellipse(0, 0, 1.5 * s, 3.8 * s, 0, 0, Math.PI * 2)
    ctx.fill()
  } else if (p.kind === 'jasmine') {
    for (let i = 0; i < 5; i++) {
      ctx.rotate((Math.PI * 2) / 5)
      ctx.beginPath()
      ctx.ellipse(0, -3.6 * s, 2 * s, 3.6 * s, 0, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = '#f5e6a8'
    ctx.beginPath()
    ctx.arc(0, 0, 1.6 * s, 0, Math.PI * 2)
    ctx.fill()
  } else {
    // marigold / rose petal with a darker vein
    const w = p.kind === 'rose' ? 5 : 4.2
    ctx.beginPath()
    ctx.ellipse(0, 0, w * s, 6.5 * s, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'rgba(0,0,0,0.12)'
    ctx.lineWidth = 0.8
    ctx.beginPath()
    ctx.moveTo(0, -5 * s)
    ctx.lineTo(0, 5 * s)
    ctx.stroke()
  }
  ctx.restore()
}

export default function BlessingShower() {
  const canvas = useRef(null)

  useEffect(() => {
    const c = canvas.current
    const ctx = c.getContext('2d')
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    let pieces = []
    let raf = 0

    function resize() {
      c.width = window.innerWidth * dpr
      c.height = window.innerHeight * dpr
    }

    function tick() {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      pieces = pieces.filter((p) => p.y < h + 30)
      for (const p of pieces) {
        p.t += 1
        p.vy = Math.min(p.vy + 0.035, p.max)
        p.x += p.vx + Math.sin(p.t * 0.045 + p.phase) * p.sway
        p.y += p.vy
        p.rot += p.vr
        draw(ctx, p)
      }
      raf = pieces.length ? requestAnimationFrame(tick) : 0
    }

    function onShower(e) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const { count = 180, x } = e.detail ?? {}
      const scaled = Math.round(count * Math.min(1, window.innerWidth / 900) ** 0.5)
      for (let i = 0; i < scaled; i++) pieces.push(makePiece(window.innerWidth, window.innerHeight, x))
      if (!raf) raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('bless-shower', onShower)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('bless-shower', onShower)
    }
  }, [])

  return <canvas ref={canvas} className="pointer-events-none fixed inset-0 z-[55] h-full w-full" aria-hidden="true" />
}
