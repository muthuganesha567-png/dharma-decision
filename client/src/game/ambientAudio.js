// ============================================================
// DHARMA DECISION — Ambient Audio & Background Music Engine
// Epic synthesized music manager & ambient soundscape system.
// Works 100% offline, zero external asset dependencies, zero broken URLs.
// ============================================================

let ctx = null
let masterGain = null
let musicGain = null
let sfxGain = null
const activeLayers = {}   // { layerName: { osc/nodes, gain } }
let currentAmbience = []
let isMuted = false
let currentVolume = 0.8
let isMusicPlaying = false
let autoplayBlocked = false
let musicInterval = null
let droneNodes = null

function getAudioContext() {
  if (typeof window === 'undefined') return null
  try {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return null
      ctx = new AudioCtx()

      // Master gain
      masterGain = ctx.createGain()
      masterGain.gain.value = isMuted ? 0 : currentVolume
      masterGain.connect(ctx.destination)

      // Dedicated Music Gain
      musicGain = ctx.createGain()
      musicGain.gain.value = 0.45
      musicGain.connect(masterGain)

      // Dedicated SFX/Ambience Gain
      sfxGain = ctx.createGain()
      sfxGain.gain.value = 0.35
      sfxGain.connect(masterGain)
    }

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        autoplayBlocked = false
      }).catch(() => {
        autoplayBlocked = true
      })
    }
    return ctx
  } catch (err) {
    console.warn('[Dharma Audio] AudioContext init error:', err)
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

// ---------- PERSISTENT BACKGROUND MUSIC SYSTEM ----------
// Indian Epic Tanpura & Raag Bhairav / Jog Meditative Drone + Melodic Motifs

function startEpicMusicEngine(c) {
  if (droneNodes) return // Already running

  try {
    const now = c.currentTime
    const rootFreq = 146.83 // D3 (Sacred D minor / Epic Kurukshetra tonic)
    const fifthFreq = 220.0  // A3 (Pancham)
    const octaveFreq = 293.66 // D4 (Taar Sa)
    const subFreq = 73.41    // D2 (Kharaj deep root)

    // 1. Warm Master Drone Filter (Tanpura body resonance)
    const bodyFilter = c.createBiquadFilter()
    bodyFilter.type = 'lowpass'
    bodyFilter.frequency.value = 850
    bodyFilter.Q.value = 1.8

    // 2. Slow Tanpura Jawari Swell Modulation LFO
    const jawariLfo = c.createOscillator()
    jawariLfo.type = 'sine'
    jawariLfo.frequency.value = 0.12 // 8-second slow meditative cycle
    const jawariGain = c.createGain()
    jawariGain.gain.value = 180
    jawariLfo.connect(jawariGain)
    jawariGain.connect(bodyFilter.frequency)
    jawariLfo.start()

    // 3. Four Tanpura String Oscillators (Pancham, Sa, Sa, Kharaj Sa)
    const strings = [
      { freq: fifthFreq, type: 'triangle', gain: 0.12, detune: 2 },
      { freq: rootFreq, type: 'sawtooth', gain: 0.08, detune: -1.5 },
      { freq: rootFreq * 1.002, type: 'triangle', gain: 0.10, detune: 1.5 },
      { freq: octaveFreq, type: 'sine', gain: 0.06, detune: 0 },
      { freq: subFreq, type: 'sine', gain: 0.22, detune: 0 },
    ]

    const oscs = []
    const stringGains = []

    strings.forEach(s => {
      const osc = c.createOscillator()
      const g = c.createGain()
      osc.type = s.type
      osc.frequency.value = s.freq
      osc.detune.value = s.detune || 0

      g.gain.setValueAtTime(0.0001, now)
      g.gain.linearRampToValueAtTime(s.gain, now + 3.0)

      osc.connect(g)
      g.connect(bodyFilter)
      osc.start(now)

      oscs.push(osc)
      stringGains.push(g)
    })

    bodyFilter.connect(musicGain)

    // 4. Subtle Generative Epic Flute / Veena Notes in Raag Jog/Darbari
    // Scale notes: D3, F3, G3, A3, C4, D4, F4, G4, A4
    const scale = [146.83, 174.61, 196.00, 220.00, 261.63, 293.66, 349.23, 392.00, 440.00]
    
    const playMelodicNote = () => {
      if (isMuted || !isMusicPlaying || !ctx) return
      try {
        const noteFreq = scale[Math.floor(Math.random() * scale.length)]
        const noteTime = ctx.currentTime
        const noteOsc = ctx.createOscillator()
        const noteGain = ctx.createGain()
        const noteFilter = ctx.createBiquadFilter()

        noteOsc.type = 'sine'
        noteOsc.frequency.setValueAtTime(noteFreq, noteTime)
        // Gentle vibrato
        noteOsc.frequency.exponentialRampToValueAtTime(noteFreq * 1.008, noteTime + 1.2)
        noteOsc.frequency.exponentialRampToValueAtTime(noteFreq, noteTime + 2.5)

        noteFilter.type = 'lowpass'
        noteFilter.frequency.value = 1200

        const dur = 3.5 + Math.random() * 2.5
        noteGain.gain.setValueAtTime(0.0001, noteTime)
        noteGain.gain.linearRampToValueAtTime(0.035, noteTime + 0.8)
        noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + dur)

        noteOsc.connect(noteFilter)
        noteFilter.connect(noteGain)
        noteGain.connect(musicGain)

        noteOsc.start(noteTime)
        noteOsc.stop(noteTime + dur + 0.5)
      } catch {}
    }

    // Schedule serene, spaced musical phrases every 4-7 seconds
    if (musicInterval) clearInterval(musicInterval)
    musicInterval = setInterval(() => {
      if (Math.random() > 0.25) {
        playMelodicNote()
      }
    }, 4500)

    droneNodes = {
      oscs,
      stringGains,
      bodyFilter,
      jawariLfo,
    }
    isMusicPlaying = true
  } catch (e) {
    console.warn('[Dharma Audio] Failed to start epic music drone:', e)
  }
}

// ---------- AMBIENT SOUNDSCAPE LAYERS ----------

const LAYER_DEFS = {
  wind: (c) => {
    const noise = createNoise(c, 'brown')
    const filter = c.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 400
    filter.Q.value = 0.5
    const lfo = c.createOscillator()
    const lfoGain = c.createGain()
    lfo.frequency.value = 0.15
    lfoGain.gain.value = 150
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)
    lfo.start()
    noise.connect(filter)
    return { source: noise, filter, lfo, output: filter, baseGain: 0.25 }
  },

  wind_soft: (c) => {
    const noise = createNoise(c, 'brown')
    const filter = c.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 250
    noise.connect(filter)
    return { source: noise, filter, output: filter, baseGain: 0.14 }
  },

  distant_army: (c) => {
    const noise = createNoise(c, 'pink')
    const filter = c.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 300
    filter.Q.value = 1.5
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
    return { source: noise, osc, filter, output: merger, baseGain: 0.15 }
  },

  horses: (c) => {
    const noise = createNoise(c, 'brown')
    const filter = c.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 180
    filter.Q.value = 2
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
    return { source: noise, lfo, filter, output: modGain, baseGain: 0.12 }
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
    return { source: noise, lfo, filter, output: filter, baseGain: 0.10 }
  },

  fire_crackle: (c) => {
    const noise = createNoise(c, 'white')
    const filter = c.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 2000
    const filter2 = c.createBiquadFilter()
    filter2.type = 'lowpass'
    filter2.frequency.value = 5000
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
    return { source: noise, lfo, filter, output: modGain, baseGain: 0.08 }
  },

  torch_crackle: (c) => LAYER_DEFS.fire_crackle(c),

  night_insects: (c) => {
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
    return { source: osc1, osc: osc2, lfo, output: merger, baseGain: 0.3 }
  },

  silence: (c) => {
    const osc = c.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 40
    osc.start()
    return { source: osc, output: osc, baseGain: 0.01 }
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
    return { source: noise, lfo, filter, output: mod, baseGain: 0.05 }
  },

  distant_fires: (c) => {
    const noise = createNoise(c, 'brown')
    const filter = c.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 600
    noise.connect(filter)
    return { source: noise, filter, output: filter, baseGain: 0.10 }
  },

  distant_camp: (c) => LAYER_DEFS.distant_fires(c),

  crowd_murmur: (c) => {
    const noise = createNoise(c, 'pink')
    const filter = c.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 400
    filter.Q.value = 0.8
    noise.connect(filter)
    return { source: noise, filter, output: filter, baseGain: 0.12 }
  },

  night_city: (c) => {
    const noise = createNoise(c, 'brown')
    const filter = c.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 350
    noise.connect(filter)
    return { source: noise, filter, output: filter, baseGain: 0.10 }
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
    return { source: noise, lfo, filter, output: mod, baseGain: 0.03 }
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

function startLayer(c, name) {
  if (activeLayers[name]) return
  const defFn = LAYER_DEFS[name]
  if (!defFn) return

  try {
    const layer = defFn(c)
    const gain = c.createGain()
    gain.gain.setValueAtTime(0.0001, c.currentTime)
    gain.gain.linearRampToValueAtTime(layer.baseGain, c.currentTime + 1.5)
    layer.output.connect(gain)
    gain.connect(sfxGain)
    if (layer.source && !layer.source._started) {
      layer.source.start()
      layer.source._started = true
    }
    activeLayers[name] = { ...layer, gain, gainNode: gain }
  } catch {}
}

function stopLayer(c, name) {
  const layer = activeLayers[name]
  if (!layer) return

  try {
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

// ---------- PUBLIC AUDIO ENGINE API ----------

/**
 * Ensures background music is running. Call on user interaction or mount.
 */
export function ensureMusicStarted() {
  const c = getAudioContext()
  if (!c) return false
  if (c.state === 'suspended') {
    c.resume().then(() => {
      autoplayBlocked = false
      startEpicMusicEngine(c)
    }).catch(() => {
      autoplayBlocked = true
    })
  } else {
    startEpicMusicEngine(c)
  }
  return true
}

export function isAutoplayBlocked() {
  return autoplayBlocked
}

/**
 * Set the current ambient soundscape layers without interrupting the continuous music drone.
 */
export function setAmbience(layers = []) {
  currentAmbience = layers
  if (isMuted) return
  const c = getAudioContext()
  if (!c) return

  // Also ensure persistent music engine is running
  if (!droneNodes) {
    startEpicMusicEngine(c)
  }

  const toStop = Object.keys(activeLayers).filter(l => !layers.includes(l))
  const toStart = layers.filter(l => !activeLayers[l])

  toStop.forEach(name => stopLayer(c, name))
  toStart.forEach(name => startLayer(c, name))
}

/**
 * Set master playback volume (0.0 to 1.0).
 */
export function setVolume(vol) {
  currentVolume = Math.max(0, Math.min(1, vol))
  if (masterGain && !isMuted) {
    masterGain.gain.setValueAtTime(currentVolume, ctx?.currentTime || 0)
  }
}

export function getVolume() {
  return currentVolume
}

/**
 * Set mute state. Updates master gain immediately without killing background music loop state.
 */
export function setMuted(muted) {
  isMuted = muted
  if (masterGain && ctx) {
    masterGain.gain.setValueAtTime(muted ? 0 : currentVolume, ctx.currentTime)
  }
  if (!muted && !droneNodes) {
    const c = getAudioContext()
    if (c) startEpicMusicEngine(c)
  }
}

export function getMuted() {
  return isMuted
}

/**
 * Play a one-shot impact SFX.
 */
export function playImpact(name) {
  if (isMuted) return
  const c = getAudioContext()
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
        osc.connect(g); g.connect(sfxGain)
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
        osc.connect(g); g.connect(sfxGain)
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
        noise.connect(filter); filter.connect(g); g.connect(sfxGain)
        noise.start(); noise.stop(c.currentTime + 0.25)
        break
      }
      default:
        break
    }
  } catch {}
}

/**
 * Clears temporary ambient SFX layers (used when transitioning between battle scenes).
 * Note: Keeps persistent epic background music active.
 */
export function stopAmbienceOnly() {
  const c = getAudioContext()
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

/** Stop all including music (only on explicit full teardown). */
export function stopAll() {
  stopAmbienceOnly()
  if (droneNodes && ctx) {
    try {
      droneNodes.oscs.forEach(o => o.stop())
      droneNodes.jawariLfo.stop()
    } catch {}
    droneNodes = null
  }
  if (musicInterval) {
    clearInterval(musicInterval)
    musicInterval = null
  }
  isMusicPlaying = false
}
