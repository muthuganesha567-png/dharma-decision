// Tiny WebAudio synth for UI feedback & cinematic cues — zero external audio assets needed.
let ctx = null

function ac() {
  if (typeof window === 'undefined') return null
  try {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
    return ctx
  } catch {
    return null
  }
}

function tone({ freq = 440, dur = 0.18, type = 'sine', gain = 0.05, delay = 0 }) {
  const c = ac()
  if (!c) return
  try {
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = type
    o.frequency.value = freq
    const t = c.currentTime + delay
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g)
    g.connect(c.destination)
    o.start(t)
    o.stop(t + dur + 0.05)
  } catch {}
}

function playConch(c) {
  try {
    const now = c.currentTime
    // Layer 1: fundamental horn tone swelling and rising slightly
    const o1 = c.createOscillator()
    const g1 = c.createGain()
    o1.type = 'sawtooth'
    o1.frequency.setValueAtTime(146.8, now) // D3
    o1.frequency.exponentialRampToValueAtTime(220, now + 0.6) // A3
    o1.frequency.linearRampToValueAtTime(233, now + 1.2)
    o1.frequency.exponentialRampToValueAtTime(146.8, now + 2.0)
    
    // Low pass filter for warm organic shell acoustics
    const filter = c.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(450, now)
    filter.frequency.linearRampToValueAtTime(900, now + 0.7)
    filter.frequency.linearRampToValueAtTime(300, now + 2.0)

    g1.gain.setValueAtTime(0.0001, now)
    g1.gain.linearRampToValueAtTime(0.09, now + 0.4)
    g1.gain.linearRampToValueAtTime(0.12, now + 1.0)
    g1.gain.exponentialRampToValueAtTime(0.0001, now + 2.1)

    o1.connect(filter)
    filter.connect(g1)
    g1.connect(c.destination)
    o1.start(now)
    o1.stop(now + 2.2)

    // Layer 2: resonant fifth harmonic
    const o2 = c.createOscillator()
    const g2 = c.createGain()
    o2.type = 'triangle'
    o2.frequency.setValueAtTime(220, now)
    o2.frequency.exponentialRampToValueAtTime(329.6, now + 0.6)
    o2.frequency.linearRampToValueAtTime(349, now + 1.2)
    o2.frequency.exponentialRampToValueAtTime(220, now + 2.0)

    g2.gain.setValueAtTime(0.0001, now)
    g2.gain.linearRampToValueAtTime(0.05, now + 0.4)
    g2.gain.exponentialRampToValueAtTime(0.0001, now + 2.0)

    o2.connect(g2)
    g2.connect(c.destination)
    o2.start(now)
    o2.stop(now + 2.1)
  } catch {}
}

function playWarDrum(c) {
  try {
    const now = c.currentTime
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(110, now)
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.35)
    
    gain.gain.setValueAtTime(0.14, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4)
    
    osc.connect(gain)
    gain.connect(c.destination)
    osc.start(now)
    osc.stop(now + 0.45)
  } catch {}
}

export function sfx(kind, muted) {
  if (muted) return
  const c = ac()
  if (!c) return

  switch (kind) {
    case 'conch':
      playConch(c)
      break
    case 'drum':
      playWarDrum(c)
      break
    case 'page':
      tone({ freq: 330, dur: 0.08, gain: 0.02 })
      break
    case 'select':
      tone({ freq: 523.25, dur: 0.12, type: 'triangle', gain: 0.04 })
      tone({ freq: 659.25, dur: 0.14, delay: 0.03, type: 'sine', gain: 0.025 })
      break
    case 'confirm':
      playWarDrum(c)
      tone({ freq: 392, dur: 0.22, delay: 0.05, gain: 0.05 })
      tone({ freq: 587.33, dur: 0.3, delay: 0.12, gain: 0.045 })
      break
    case 'insight':
      tone({ freq: 440, dur: 0.38, type: 'triangle', gain: 0.03 })
      tone({ freq: 554.37, dur: 0.38, delay: 0.08, type: 'triangle', gain: 0.025 })
      tone({ freq: 659.25, dur: 0.45, delay: 0.16, type: 'sine', gain: 0.02 })
      break
    case 'counsel':
      tone({ freq: 293.66, dur: 0.5, type: 'triangle', gain: 0.035 })
      tone({ freq: 440, dur: 0.55, delay: 0.1, type: 'sine', gain: 0.03 })
      tone({ freq: 587.33, dur: 0.6, delay: 0.2, type: 'sine', gain: 0.025 })
      break
    case 'achieve':
      ;[392, 523.25, 659.25, 783.99].forEach((f, i) =>
        tone({ freq: f, dur: 0.35, delay: i * 0.09, type: 'triangle', gain: 0.05 })
      )
      break
    default:
      break
  }
}

