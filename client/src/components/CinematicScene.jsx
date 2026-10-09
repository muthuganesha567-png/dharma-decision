import { useState, useEffect, useRef } from 'react'
import { CharacterPortrait } from './CharacterPortrait'
import { AtmosphericBackdrop } from './AtmosphericBackdrop'
import { CHARACTERS } from '../data'
import { Icon } from './ui'
import { sfx } from '../game/audio'

export function CinematicScene({
  sceneTitle,
  subtitle,
  locationStamp,
  backdropKey = 'kurukshetra_dawn',
  characterId = 'krishna',
  speaker,
  speakerRole,
  text,
  emotion = 'calm',
  onContinue,
  continueLabel = 'Continue',
  soundTrigger,
  muted = false,
  extraContent,
}) {
  const char = CHARACTERS[characterId] || CHARACTERS.krishna
  const activeSpeaker = speaker || char.name
  const activeRole = speakerRole || char.title

  // Multi-paragraph or single text
  const fullText = Array.isArray(text) ? text.join('\n\n') : (text || '')
  
  // Typewriter effect state
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const indexRef = useRef(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (soundTrigger) {
      sfx(soundTrigger, muted)
    }
  }, [soundTrigger, muted])

  // Reset & run typewriter when text changes
  useEffect(() => {
    setDisplayedText('')
    setIsTyping(true)
    indexRef.current = 0

    if (!fullText) {
      setIsTyping(false)
      return
    }

    // Faster typing for comfortable reading
    const speed = 18 
    const step = () => {
      indexRef.current += 1
      setDisplayedText(fullText.slice(0, indexRef.current))

      if (indexRef.current < fullText.length) {
        timerRef.current = setTimeout(step, speed)
      } else {
        setIsTyping(false)
      }
    }

    timerRef.current = setTimeout(step, 80)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [fullText])

  const skipTypewriter = () => {
    if (isTyping) {
      if (timerRef.current) clearTimeout(timerRef.current)
      setDisplayedText(fullText)
      setIsTyping(false)
      sfx('page', muted)
    } else if (onContinue) {
      sfx('page', muted)
      onContinue()
    }
  }

  // Keyboard shortcut: Space or Enter advances/skips
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        skipTypewriter()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isTyping, onContinue]) // eslint-disable-line

  return (
    <div className="cinematic-stage pop-in" onClick={isTyping ? skipTypewriter : undefined}>
      {/* Visual Backdrop with slow Ken-Burns pan */}
      <div className="cinematic-backdrop-container">
        <AtmosphericBackdrop sceneKey={backdropKey} />
        <div className="cinematic-overlay-gradient" />
        
        {/* Scene header titles positioned over visual */}
        {(sceneTitle || subtitle || locationStamp) && (
          <div className="cinematic-header-card">
            {locationStamp && <div className="cinematic-location">{locationStamp}</div>}
            {sceneTitle && <h2 className="cinematic-scene-title">{sceneTitle}</h2>}
            {subtitle && <div className="cinematic-scene-subtitle">{subtitle}</div>}
          </div>
        )}
      </div>

      {/* Dialogue and Character Interaction Bar */}
      <div className="cinematic-dialogue-panel">
        <div className="cinematic-dialogue-inner">
          {/* Character Portrait with gold frame */}
          <div className="cinematic-speaker-col">
            <CharacterPortrait
              characterId={characterId}
              size={110}
              emotion={emotion}
              showBadge={false}
            />
            <div className="cinematic-speaker-tag" style={{ color: char.color }}>
              <div className="speaker-name">{activeSpeaker}</div>
              <div className="speaker-role">{activeRole}</div>
            </div>
          </div>

          {/* Typewriter Dialogue Bubble */}
          <div className="cinematic-text-col">
            <div className="cinematic-bubble">
              <div className="dialogue-content">
                {displayedText.split('\n\n').map((para, i) => (
                  <p key={i} className="dialogue-para">
                    {para}
                  </p>
                ))}
                {isTyping && <span className="typewriter-cursor" />}
              </div>

              {extraContent}
            </div>

            {/* Action buttons row */}
            <div className="cinematic-controls">
              {isTyping && (
                <button
                  type="button"
                  className="btn ghost sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    skipTypewriter()
                  }}
                >
                  Skip text
                </button>
              )}

              <button
                type="button"
                className="btn gold lg cinematic-continue-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  if (isTyping) {
                    skipTypewriter()
                  } else if (onContinue) {
                    sfx('page', muted)
                    onContinue()
                  }
                }}
              >
                {isTyping ? 'Complete' : continueLabel} <Icon name="arrow" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
