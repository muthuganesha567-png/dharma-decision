// ============================================================
// DHARMA DECISION — Ambient Audio Engine
// Layered WebAudio ambient soundscapes + impact SFX.
// No external audio files — everything synthesized.
// ============================================================

let ctx = null
let masterGain = null
const activeLayers = {}   // { layerName: { osc/nodes, gain } }
let currentAmbience = []
let isMuted = false

function ac() {
  if (typeof window === 'undefined') return null
  try {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)()
      masterGain = ctx.createGain()
      masterGain.gain.value = 0.15  // low default so ambience is subtle
      masterGain.connect(ctx.destination)
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
    return ctx
  } catch {
    return null
  }
}

// ---------- NOISE GENERATOR ----------

function createNoise(c, type = 'brown') {
  const bufSize = c.sampleRate * 2
  const buf = c.createBuffer(1, bufSize, c.sampleRate)
  const data = buf.getChannelData(0)
  let last = 0
  for (let i = 0; i < bufSize; i++) {
    const white = Math.random() * 2 - 1
    if (type === 'brown') {
      last = (last + 0.02 * white) / 1.02
      data[i] = last * 3.5
    } else if (type === 'pink') {
      // Simple pink noise approximation
      last = 0.99886 * last + white * 0.0555179
      data[i] = last * 0.5
    } else {
      data[i] = white
    }
  }
  const source = c.createBufferSource()
  source.buffer = buf
  source.loop = true
  return source
}

// ---------- AMBIENT LAYER DEFINITIONS ----------

const LAYER_DEFS = {
  wind: (c) => {
    const noise = createNoise(c, 'brown')
    const filter = c.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 400
    filter.Q.value = 0.5
    // Slow modulation for organic feel
    const lfo = c.createOscillator()
    const lfoGain = c.createGain()
    lfo.frequency.value = 0.15
    lfoGain.gain.value = 150
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)
    lfo.start()
    noise.connect(filter)
    return { source: noise, filter, lfo, output: filter, baseGain: 0.35 }
  },

  wind_soft: (c) => {
    const noise = createNoise(c, 'brown')
    const filter = c.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 250
    noise.connect(filter)
    return { source: noise, filter, output: filter, baseGain: 0.18 }
  },

  distant_army: (c) => {
    const noise = createNoise(c, 'pink')
    const filter = c.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 300
    filter.Q.value = 1.5
    // Add low rumble
    const osc = c.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 55
    const oscGain = c.createGain()
    oscGain.gain.value = 0.08
    osc.connect(oscGain)
    osc.start()
    const merger = c.createGain()
    noise.connect(filter)
    filter.connect(merger)
    oscGain.connect(merger)
    return { source: noise, osc, filter, output: merger, baseGain: 0.2 }
  },

  horses: (c) => {
    // Rhythmic low-mid thuds simulating hooves
    const noise = createNoise(c, 'brown')
    const filter = c.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 180
    filter.Q.value = 2
    // Rhythmic amplitude modulation
    const lfo = c.createOscillator()
    const lfoGain = c.createGain()
    lfo.type = 'square'
    lfo.frequency.value = 2.5
    lfoGain.gain.value = 0.5
    const modGain = c.createGain()
    modGain.gain.value = 0.5
    lfo.connect(lfoGain)
    lfoGain.connect(modGain.gain)
    lfo.start()
    noise.connect(filter)
    filter.connect(modGain)
    return { source: noise, lfo, filter, output: modGain, baseGain: 0.15 }
  },

  chariot_wheels: (c) => {
    const noise = createNoise(c, 'brown')
    const filter = c.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 220
    filter.Q.value = 3
    const lfo = c.createOscillator()
    const lfoGain = c.createGain()
    lfo.type = 'sine'
    lfo.frequency.value = 3.2
    lfoGain.gain.value = 100
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)
    lfo.start()
    noise.connect(filter)
    return { source: noise, lfo, filter, output: filter, baseGain: 0.12 }
  },

  fire_crackle: (c) => {
    const noise = createNoise(c, 'white')
    const filter = c.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 2000
    const filter2 = c.createBiquadFilter()
    filter2.type = 'lowpass'
    filter2.frequency.value = 5000
    // Random-ish amplitude for crackling
    const lfo = c.createOscillator()
    const lfoGain = c.createGain()
    lfo.type = 'sawtooth'
    lfo.frequency.value = 8
    lfoGain.gain.value = 0.6
    const modGain = c.createGain()
    modGain.gain.value = 0.4
    lfo.connect(lfoGain)
    lfoGain.connect(modGain.gain)
    lfo.start()
    noise.connect(filter)
    filter.connect(filter2)
    filter2.connect(modGain)
    return { source: noise, lfo, filter, output: modGain, baseGain: 0.1 }
  },

  torch_crackle: (c) => LAYER_DEFS.fire_crackle(c), // alias

  night_insects: (c) => {
    // High-pitched sine oscillators with slow modulation
    const osc1 = c.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 4200
    const osc2 = c.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 3800
    const lfo = c.createOscillator()
    const lfoGain = c.createGain()
    lfo.frequency.value = 0.5
    lfoGain.gain.value = 200
    lfo.connect(lfoGain)
    lfoGain.connect(osc1.frequency)
    lfo.start()
    osc1.start()
    osc2.start()
    const merger = c.createGain()
    merger.gain.value = 1
    const g1 = c.createGain(); g1.gain.value = 0.03; osc1.connect(g1); g1.connect(merger)
    const g2 = c.createGain(); g2.gain.value = 0.02; osc2.connect(g2); g2.connect(merger)
    return { source: osc1, osc: osc2, lfo, output: merger, baseGain: 0.4 }
  },

  silence: (c) => {
    // Silence layer — used for dramatic pauses. Very faint low drone.
    const osc = c.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 40
    osc.start()
    return { source: osc, output: osc, baseGain: 0.02 }
  },

  armor: (c) => {
    const noise = createNoise(c, 'white')
    const filter = c.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 1200
    filter.Q.value = 4
    const lfo = c.createOscillator()
    const lfoGain = c.createGain()
    lfo.type = 'square'
    lfo.frequency.value = 0.8
    lfoGain.gain.value = 0.8
    const mod = c.createGain(); mod.gain.value = 0.3
    lfo.connect(lfoGain)
    lfoGain.connect(mod.gain)
    lfo.start()
    noise.connect(filter)
    filter.connect(mod)
    return { source: noise, lfo, filter, output: mod, baseGain: 0.06 }
  },

  distant_fires: (c) => {
    const noise = createNoise(c, 'brown')
    const filter = c.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 600
    noise.connect(filter)
    return { source: noise, filter, output: filter, baseGain: 0.12 }
  },

  distant_camp: (c) => LAYER_DEFS.distant_fires(c),

  crowd_murmur: (c) => {
    const noise = createNoise(c, 'pink')
    const filter = c.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 400
    filter.Q.value = 0.8
    noise.connect(filter)
    return { source: noise, filter, output: filter, baseGain: 0.15 }
  },

  // Modern ambience
  night_city: (c) => {
    const noise = createNoise(c, 'brown')
    const filter = c.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 350
    noise.connect(filter)
    return { source: noise, filter, output: filter, baseGain: 0.12 }
  },

  keyboard_soft: (c) => {
    const noise = createNoise(c, 'white')
    const filter = c.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 2500
    filter.Q.value = 5
    const lfo = c.createOscillator()
    const lfoGain = c.createGain()
    lfo.type = 'square'
    lfo.frequency.value = 4
    lfoGain.gain.value = 0.7
    const mod = c.createGain(); mod.gain.value = 0.3
    lfo.connect(lfoGain); lfoGain.connect(mod.gain); lfo.start()
    noise.connect(filter); filter.connect(mod)
    return { source: noise, lfo, filter, output: mod, baseGain: 0.04 }
  },

  library_quiet: (c) => LAYER_DEFS.silence(c),

  clock_tick: (c) => {
    const osc = c.createOscillator()
    osc.type = 'square'
    osc.frequency.value = 600
    const lfo = c.createOscillator()
    const lfoGain = c.createGain()
    lfo.type = 'square'
    lfo.frequency.value = 1
    lfoGain.gain.value = 1
    const mod = c.createGain(); mod.gain.value = 0
    lfo.connect(lfoGain); lfoGain.connect(mod.gain)
    lfo.start(); osc.start()
    osc.connect(mod)
    return { source: osc, lfo, output: mod, baseGain: 0.02 }
  },
}

// ---------- LAYER MANAGEMENT ----------

function startLayer(c, name) {
  if (activeLayers[name]) return // already running
  const defFn = LAYER_DEFS[name]
  if (!defFn) return

  try {
    const layer = defFn(c)
    const gain = c.createGain()
    gain.gain.setValueAtTime(0.0001, c.currentTime)
    // Fade in over 1.5s
    gain.gain.linearRampToValueAtTime(layer.baseGain, c.currentTime + 1.5)
    layer.output.connect(gain)
    gain.connect(masterGain)
    if (layer.source && !layer.source._started) {
      layer.source.start()
      layer.source._started = true
    }
    activeLayers[name] = { ...layer, gain, gainNode: gain }
  } catch (e) {
    // WebAudio failure — ignore silently
  }
}

function stopLayer(c, name) {
  const layer = activeLayers[name]
  if (!layer) return

  try {
    // Fade out over 1s then disconnect
    layer.gain.gain.linearRampToValueAtTime(0.0001, c.currentTime + 1.0)
    setTimeout(() => {
      try {
        layer.source?.stop?.()
        layer.osc?.stop?.()
        layer.lfo?.stop?.()
        layer.gainNode?.disconnect()
      } catch {}
      delete activeLayers[name]
    }, 1200)
  } catch {
    delete activeLayers[name]
  }
}

// ---------- PUBLIC API ----------

/**
 * Set the current ambient soundscape layers.
 * Crossfades between old and new layers.
 * @param {string[]} layers - Array of layer names (e.g. ['wind', 'distant_army'])
 */
export function setAmbience(layers = []) {
  if (isMuted) {
    currentAmbience = layers
    return
  }
  const c = ac()
  if (!c) {
    currentAmbience = layers
    return
  }

  const toStop = currentAmbience.filter(l => !layers.includes(l))
  const toStart = layers.filter(l => !currentAmbience.includes(l))

  toStop.forEach(name => stopLayer(c, name))
  toStart.forEach(name => startLayer(c, name))

  currentAmbience = [...layers]
}

/**
 * Play a one-shot impact SFX synthesized via WebAudio.
 * @param {string} name - SFX name
 */
export function playImpact(name) {
  if (isMuted) return
  const c = ac()
  if (!c) return

  try {
    switch (name) {
      case 'arrow_fly': {
        const osc = c.createOscillator()
        const g = c.createGain()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(800, c.currentTime)
        osc.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.15)
        g.gain.setValueAtTime(0.06, c.currentTime)
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.2)
        osc.connect(g); g.connect(masterGain)
        osc.start(); osc.stop(c.currentTime + 0.25)
        break
      }
      case 'bow_raise':
      case 'bow_lower':
      case 'bow_creak': {
        const osc = c.createOscillator()
        const g = c.createGain()
        osc.type = 'triangle'
        const up = name === 'bow_raise'
        osc.frequency.setValueAtTime(up ? 180 : 280, c.currentTime)
        osc.frequency.exponentialRampToValueAtTime(up ? 350 : 120, c.currentTime + 0.3)
        g.gain.setValueAtTime(0.04, c.currentTime)
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.35)
        osc.connect(g); g.connect(masterGain)
        osc.start(); osc.stop(c.currentTime + 0.4)
        break
      }
      case 'armor_move': {
        const noise = createNoise(c, 'white')
        const filter = c.createBiquadFilter()
        filter.type = 'bandpass'
        filter.frequency.value = 3000
        filter.Q.value = 2
        const g = c.createGain()
        g.gain.setValueAtTime(0.05, c.currentTime)
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.2)
        noise.connect(filter); filter.connect(g); g.connect(masterGain)
        noise.start(); noise.stop(c.currentTime + 0.25)
        break
      }
      default:
        break
    }
  } catch {}
}

/**
 * Set mute state. Stops or resumes all ambience.
 * @param {boolean} muted
 */
export function setMuted(muted) {
  isMuted = muted
  if (masterGain) {
    masterGain.gain.value = muted ? 0 : 0.15
  }
  if (muted) {
    // Stop all layers to save CPU
    const c = ac()
    if (c) {
      Object.keys(activeLayers).forEach(name => stopLayer(c, name))
    }
  } else if (currentAmbience.length > 0) {
    // Resume ambience
    setAmbience(currentAmbience)
  }
}

/** Stop all ambient layers immediately. */
export function stopAll() {
  const c = ac()
  if (!c) return
  Object.keys(activeLayers).forEach(name => {
    try {
      const layer = activeLayers[name]
      layer.source?.stop?.()
      layer.osc?.stop?.()
      layer.lfo?.stop?.()
      layer.gainNode?.disconnect()
    } catch {}
  })
  Object.keys(activeLayers).forEach(k => delete activeLayers[k])
  currentAmbience = []
}
