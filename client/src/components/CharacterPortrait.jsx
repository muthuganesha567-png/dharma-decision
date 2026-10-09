import { useState } from 'react'
import { CHARACTERS } from '../data'

export const CHARACTER_IMAGE_MAP = {
  krishna: {
    default: '/assets/characters/krishna.jpg',
    calm: '/assets/characters/krishna.jpg',
    wise: '/assets/characters/krishna.jpg',
  },
  arjuna: {
    default: '/assets/characters/arjuna.jpg',
    resolute: '/assets/characters/arjuna_resolute.jpg',
    conflicted: '/assets/characters/arjuna_conflicted.jpg',
    hesitant: '/assets/characters/arjuna_conflicted.jpg',
    grief: '/assets/characters/arjuna_grief.jpg',
    sorrow: '/assets/characters/arjuna_grief.jpg',
  },
  bhishma: {
    default: '/assets/characters/bhishma.jpg',
  },
  drona: {
    default: '/assets/characters/drona.jpg',
  },
  yudhishthira: {
    default: '/assets/characters/yudhishthira.jpg',
  },
  draupadi: {
    default: '/assets/characters/draupadi.jpg',
  },
  karna: {
    default: '/assets/characters/karna.jpg',
  },
}

export function CharacterPortrait({
  characterId = 'krishna',
  size = 120,
  emotion = 'calm',
  className = '',
  isSpeaking = false,
  showBadge = false,
}) {
  const charKey = (characterId || 'narrator').toLowerCase()
  const char = CHARACTERS[charKey] || CHARACTERS.krishna || { name: 'Narrator', color: '#d3a94f' }
  const isNarrator = charKey === 'narrator'

  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const charMap = CHARACTER_IMAGE_MAP[charKey]
  const imageSrc = charMap
    ? (charMap[emotion] || charMap.default)
    : null

  // 1. Narrator Crest — No cartoon face, elegant chronicle seal + soundwave
  if (isNarrator) {
    return (
      <div
        className={`character-portrait-wrap narrator-crest-wrap ${isSpeaking ? 'speaking-active' : ''} ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="narrator-crest">
          <svg viewBox="0 0 100 100" width={size} height={size} className="narrator-seal-svg" aria-label="Epic Narrator">
            <defs>
              <radialGradient id="narrator-gold-halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#d3a94f" stopOpacity="0.35" />
                <stop offset="75%" stopColor="#0c1230" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#060a17" stopOpacity="1" />
              </radialGradient>
              <linearGradient id="gold-crest-rim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5e2a3" />
                <stop offset="50%" stopColor="#d3a94f" />
                <stop offset="100%" stopColor="#8a6020" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#narrator-gold-halo)" />
            <circle cx="50" cy="50" r="45" stroke="url(#gold-crest-rim)" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="40" stroke="rgba(211,169,79,0.25)" strokeWidth="1" strokeDasharray="3 2" fill="none" />
            {/* Sacred Conch / Chronicle Quill Icon */}
            <path d="M50 24 C40 32, 36 45, 42 58 C46 66, 54 70, 58 64 C64 54, 60 38, 50 24 Z" fill="#d3a94f" opacity="0.85" />
            <path d="M50 24 Q52 45 44 68" stroke="#f5e2a3" strokeWidth="1.5" fill="none" />
            {/* Soundwave bars */}
            <rect x="36" y="72" width="4" height="8" rx="2" fill="#eccf8e" className={isSpeaking ? 'wave-bar b1' : ''} />
            <rect x="44" y="70" width="4" height="12" rx="2" fill="#eccf8e" className={isSpeaking ? 'wave-bar b2' : ''} />
            <rect x="52" y="68" width="4" height="15" rx="2" fill="#eccf8e" className={isSpeaking ? 'wave-bar b3' : ''} />
            <rect x="60" y="72" width="4" height="9" rx="2" fill="#eccf8e" className={isSpeaking ? 'wave-bar b4' : ''} />
          </svg>
        </div>
      </div>
    )
  }

  // 2. Realistic Character Portrait
  return (
    <div
      className={`character-portrait-wrap realistic-portrait-wrap char-${charKey} emotion-${emotion} ${isSpeaking ? 'speaking-active' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="portrait-frame-outer">
        {/* Glow halo when speaking */}
        {isSpeaking && <div className="portrait-speaking-halo" style={{ borderColor: char.color || '#d3a94f' }} />}

        {/* High-resolution realistic artwork */}
        {imageSrc && !imgError && (
          <img
            src={imageSrc}
            alt={`${char.name} portrait`}
            className={`portrait-real-img ${imgLoaded ? 'loaded' : 'loading'}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}

        {/* Fallback elegant monogram shield if image is loading / missing */}
        {(!imageSrc || imgError) && (
          <div className="portrait-fallback-crest" style={{ background: `radial-gradient(circle, ${char.color || '#d3a94f'}33 0%, #060a17 80%)` }}>
            <span className="portrait-monogram" style={{ color: char.color || '#d3a94f' }}>
              {(char.name || charKey).slice(0, 1)}
            </span>
          </div>
        )}

        {/* Realistic antique gold bezel frame */}
        <div className="portrait-gold-rim" />
        <div className="portrait-dark-vignette" />
      </div>

      {showBadge && (
        <div className="char-badge" style={{ borderColor: char.color }}>
          <span className="char-badge-name">{char.name}</span>
        </div>
      )}
    </div>
  )
}
