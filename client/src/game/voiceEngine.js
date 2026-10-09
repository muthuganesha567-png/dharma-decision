// ============================================================
// DHARMA DECISION — Voice Acting & Speech Synthesis Engine
// Multi-tiered voice system: Backend Neural TTS -> Web Speech API
// ============================================================

export const CHARACTER_VOICE_PROFILES = {
  krishna: {
    name: 'Krishna',
    title: 'Divine Guide',
    pitch: 0.95,
    rate: 0.88,
    voiceHints: ['Google UK English Male', 'en-GB', 'en-US', 'Natural', 'warm', 'calm'],
    gender: 'male',
  },
  arjuna: {
    name: 'Arjuna',
    title: 'Kshatriya Archer',
    pitch: 1.05,
    rate: 0.96,
    voiceHints: ['Google US English', 'en-US', 'David', 'male', 'confident'],
    gender: 'male',
  },
  narrator: {
    name: 'Narrator',
    title: 'Epic Storyteller',
    pitch: 0.82,
    rate: 0.86,
    voiceHints: ['Google UK English Male', 'en-GB', 'Daniel', 'George', 'deep'],
    gender: 'male',
  },
  bhishma: {
    name: 'Bhishma',
    title: 'Grandfather of the Kurus',
    pitch: 0.78,
    rate: 0.82,
    voiceHints: ['Google UK English Male', 'en-GB', 'grave', 'older'],
    gender: 'male',
  },
  drona: {
    name: 'Drona',
    title: 'Master Teacher',
    pitch: 0.88,
    rate: 0.92,
    voiceHints: ['en-GB', 'en-US', 'stern'],
    gender: 'male',
  },
  draupadi: {
    name: 'Draupadi',
    title: 'Empress of Indraprastha',
    pitch: 1.15,
    rate: 0.94,
    voiceHints: ['Google UK English Female', 'en-GB', 'en-US', 'female'],
    gender: 'female',
  },
}

let currentAudio = null
let isSpeaking = false
let currentUtterance = null
let activeListeners = new Set()

export function notifyVoiceState(active, speaker) {
  isSpeaking = active
  activeListeners.forEach(fn => {
    try { fn(active, speaker) } catch {}
  })
}

export function subscribeVoiceState(callback) {
  activeListeners.add(callback)
  return () => activeListeners.delete(callback)
}

export function isVoicePlaying() {
  return isSpeaking
}

export function stopVoice() {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
    currentAudio = null
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel()
    } catch {}
  }
  currentUtterance = null
  notifyVoiceState(false, null)
}

function selectBestVoice(profile) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null
  const voices = window.speechSynthesis.getVoices() || []
  if (!voices.length) return null

  const hints = profile.voiceHints || []
  for (const hint of hints) {
    const match = voices.find(v => v.name.toLowerCase().includes(hint.toLowerCase()) || v.lang.toLowerCase().includes(hint.toLowerCase()))
    if (match) return match
  }

  // Fallback to any English voice
  const eng = voices.find(v => v.lang.startsWith('en'))
  return eng || voices[0] || null
}

export async function speakLine({
  text,
  characterId = 'narrator',
  emotion = 'calm',
  muted = false,
  onStart,
  onEnd,
  onError,
}) {
  if (muted || !text || !text.trim()) {
    stopVoice()
    return
  }

  stopVoice()
  const charKey = (characterId || 'narrator').toLowerCase()
  const profile = CHARACTER_VOICE_PROFILES[charKey] || CHARACTER_VOICE_PROFILES.narrator

  notifyVoiceState(true, charKey)
  if (onStart) onStart()

  // 1. Try server neural TTS
  try {
    const res = await fetch('/api/voice/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, characterId: charKey, emotion }),
    })
    if (res.ok) {
      const data = await res.json()
      if (data.ok && data.audioUrl) {
        const audio = new Audio(data.audioUrl)
        currentAudio = audio
        audio.onended = () => {
          currentAudio = null
          notifyVoiceState(false, null)
          if (onEnd) onEnd()
        }
        audio.onerror = (e) => {
          currentAudio = null
          fallbackSpeechSynthesis(text, profile, emotion, onEnd, onError)
        }
        await audio.play()
        return
      }
    }
  } catch (err) {
    // Network / offline fallback to browser speech
  }

  // 2. Fallback: Browser Web Speech API
  fallbackSpeechSynthesis(text, profile, emotion, onEnd, onError)
}

function fallbackSpeechSynthesis(text, profile, emotion, onEnd, onError) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    notifyVoiceState(false, null)
    if (onEnd) onEnd()
    return
  }

  try {
    window.speechSynthesis.cancel()
    const cleanText = text.replace(/[\*#_\[\]]/g, '').trim()
    const utter = new SpeechSynthesisUtterance(cleanText)

    const voice = selectBestVoice(profile)
    if (voice) utter.voice = voice

    // Adjust pitch & rate based on character emotion
    let pitch = profile.pitch
    let rate = profile.rate

    if (emotion === 'conflicted' || emotion === 'hesitant') {
      pitch -= 0.06
      rate -= 0.08
    } else if (emotion === 'resolute' || emotion === 'fierce') {
      pitch += 0.05
      rate += 0.04
    }

    utter.pitch = Math.max(0.5, Math.min(2.0, pitch))
    utter.rate = Math.max(0.5, Math.min(1.5, rate))
    utter.volume = 0.95

    utter.onend = () => {
      currentUtterance = null
      notifyVoiceState(false, null)
      if (onEnd) onEnd()
    }

    utter.onerror = (e) => {
      currentUtterance = null
      notifyVoiceState(false, null)
      if (onError) onError(e)
      else if (onEnd) onEnd()
    }

    currentUtterance = utter
    window.speechSynthesis.speak(utter)
  } catch (err) {
    notifyVoiceState(false, null)
    if (onError) onError(err)
    else if (onEnd) onEnd()
  }
}

// Auto-narration preferences in localStorage
const AUTO_NARRATE_KEY = 'dharma_auto_narration'

export function getAutoNarrationPref() {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(AUTO_NARRATE_KEY) === 'true'
}

export function setAutoNarrationPref(enabled) {
  if (typeof window === 'undefined') return
  localStorage.setItem(AUTO_NARRATE_KEY, enabled ? 'true' : 'false')
}