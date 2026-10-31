// Temple bell (ganta) strike synthesized with Web Audio: inharmonic partials
// with long, staggered decays, like the bell in scripts/make-music.py.
let ctx

const PARTIALS = [
  // ratio, gain, decay seconds
  [1, 1, 3.2],
  [2.76, 0.5, 1.9],
  [5.4, 0.25, 1.1],
  [8.93, 0.12, 0.6],
]

export function ringBell(pitch = 1) {
  try {
    ctx ??= new (window.AudioContext || window.webkitAudioContext)()
  } catch {
    return
  }
  if (ctx.state === 'suspended') ctx.resume()
  const t = ctx.currentTime
  const out = ctx.createGain()
  out.gain.value = 0.16
  out.connect(ctx.destination)
  for (const [ratio, gain, decay] of PARTIALS) {
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.frequency.value = 1175 * pitch * ratio
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(gain, t + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay)
    osc.connect(g).connect(out)
    osc.start(t)
    osc.stop(t + decay + 0.05)
  }
}
