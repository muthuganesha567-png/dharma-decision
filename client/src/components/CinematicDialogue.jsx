// ============================================================
// DHARMA DECISION — Cinematic Dialogue & Voice Acting System
// Multi-line dialogue sequencer with speaker switching,
// typewriter effect, neural/browser speech synthesis & controls.
// ============================================================

import { useEffect, useRef, useState, useCallback } from 'react'
import { CHARACTERS } from '../data'
import { sfx } from '../game/audio'
import { CharacterPortrait } from './CharacterPortrait'
import {
  speakLine,
  stopVoice,
  getAutoNarrationPref,
  setAutoNarrationPref,
  subscribeVoiceState,
} from '../game/voiceEngine'
import { Icon } from './ui'

export function CinematicDialogue({
  dialogue = [],       // Array of { speaker, characterId, text, emotion, voice }
  onComplete,          // Called when all dialogue lines are done and user continues
  onSpeakerChange,     // Called with characterId when active speaker changes
  continueLabel = 'Continue',
  muted = false,
}) {
  const [lineIndex, setLineIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [autoNarrate, setAutoNarrate] = useState(() => getAutoNarrationPref())
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [currentSpeaker, setCurrentSpeaker] = useState(null)

  const indexRef = useRef(0)
  const timerRef = useRef(null)

  const currentLine = dialogue[lineIndex] || null
  const isLastLine = lineIndex >= dialogue.length - 1
  const fullText = currentLine?.text || ''

  // Subscribe to voice state changes
  useEffect(() => {
    return subscribeVoiceState((active, speaker) => {
      setIsVoiceActive(active)
      setCurrentSpeaker(speaker)
    })
  }, [])

  // Auto-play speech when line changes if autoNarrate is enabled
  const triggerSpeech = useCallback((text, charId, emotion) => {
    if (muted || !text) return
    speakLine({
      text,
      characterId: charId || 'narrator',
      emotion: emotion || 'calm',
      muted,
    })
  }, [muted])

  // Reset on line change
  useEffect(() => {
    setDisplayedText('')
    setIsTyping(true)
    indexRef.current = 0

    if (!fullText) {
      setIsTyping(false)
      stopVoice()
      return
    }

    // Notify parent about speaker change
    if (currentLine?.characterId && onSpeakerChange) {
      onSpeakerChange(currentLine.characterId)
    }

    // Typewriter speed
    const speed = fullText.length > 100 ? 16 : 22
    const step = () => {
      indexRef.current += 1
      setDisplayedText(fullText.slice(0, indexRef.current))
      if (indexRef.current < fullText.length) {
        timerRef.current = setTimeout(step, speed)
      } else {
        setIsTyping(false)
      }
    }
    timerRef.current = setTimeout(step, 50)

    // Trigger voice acting if auto-narration is on
    if (autoNarrate && !muted) {
      triggerSpeech(fullText, currentLine?.characterId, currentLine?.emotion)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      stopVoice()
    }
  }, [lineIndex, fullText, autoNarrate, muted, onSpeakerChange, triggerSpeech]) // eslint-disable-line

  const toggleAutoNarrate = (e) => {
    e.stopPropagation()
    const next = !autoNarrate
    setAutoNarrate(next)
    setAutoNarrationPref(next)
    if (next && !isVoiceActive) {
      triggerSpeech(fullText, currentLine?.characterId, currentLine?.emotion)
    } else if (!next) {
      stopVoice()
    }
  }

  const handleManualSpeak = (e) => {
    e.stopPropagation()
    if (isVoiceActive) {
      stopVoice()
    } else {
      triggerSpeech(fullText, currentLine?.characterId, currentLine?.emotion)
    }
  }

  const completeTyping = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDisplayedText(fullText)
    setIsTyping(false)
  }, [fullText])

  const advance = useCallback(() => {
    stopVoice()
    if (isTyping) {
      completeTyping()
      return
    }
    if (!isLastLine) {
      setLineIndex(prev => prev + 1)
      sfx('page', muted)
    } else if (onComplete) {
      sfx('page', muted)
      onComplete()
    }
  }, [isTyping, isLastLine, onComplete, completeTyping, muted])

  // Keyboard: Space/Enter to advance
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance])

  // Reset line index when dialogue array changes (new scene)
  useEffect(() => {
    setLineIndex(0)
    stopVoice()
  }, [dialogue])

  if (!currentLine) {
    return (
      <div className="cinematic-dialogue-panel-v2">
        <div className="dialogue-controls-v2">
          <button className="btn gold lg" onClick={onComplete}>
            {continueLabel} <span className="arrow-icon">→</span>
          </button>
        </div>
      </div>
    )
  }

  const speakerId = currentLine.characterId || 'narrator'
  const speakerMeta = currentLine.characterId ? CHARACTERS[currentLine.characterId] : null
  const speakerColor = speakerMeta?.color || '#d3a94f'
  const isNarrator = !currentLine.characterId || currentLine.speaker === 'Narrator'

  return (
    <div className="cinematic-dialogue-panel-v2" onClick={advance}>
      {/* Top Header: Speaker identity + Voice controls + Line counter */}
      <div className="dialogue-top-bar-v2">
        <div className="dialogue-speaker-info">
          <CharacterPortrait
            characterId={speakerId}
            size={38}
            emotion={currentLine.emotion || 'calm'}
            isSpeaking={isVoiceActive}
          />
          <div className="dialogue-speaker-meta">
            {!isNarrator && (
              <span className="dialogue-speaker-name-v2" style={{ color: speakerColor }}>
                {currentLine.speaker || speakerMeta?.name}
              </span>
            )}
            {isNarrator && (
              <span className="dialogue-narrator-tag-v2">Chronicle Narrator</span>
            )}
            {currentLine.emotion && (
              <span className="dialogue-emotion-tag">[{currentLine.emotion}]</span>
            )}
          </div>
        </div>

        {/* Center/Right: Voice controls */}
        <div className="dialogue-voice-toolbar" onClick={(e) => e.stopPropagation()}>
          {/* Speaking Audio Visualizer */}
          {isVoiceActive && (
            <div className="dialogue-voice-waveform" title="Speaking now">
              <span className="wave-bar wb1" />
              <span className="wave-bar wb2" />
              <span className="wave-bar wb3" />
              <span className="wave-bar wb4" />
            </div>
          )}

          {/* Manual Speak / Replay Button */}
          <button
            className={`voice-tool-btn ${isVoiceActive ? 'active' : ''}`}
            onClick={handleManualSpeak}
            title={isVoiceActive ? 'Stop Voice' : isNarrator ? 'Play Narration' : 'Speak Dialogue'}
          >
            <Icon name={isVoiceActive ? 'pause' : 'sound'} size={15} />
            <span className="voice-btn-label">
              {isVoiceActive ? 'Stop' : isNarrator ? 'Play Narration' : 'Speak Dialogue'}
            </span>
          </button>

          {/* Auto Narration Toggle */}
          <button
            className={`voice-tool-btn auto-toggle ${autoNarrate ? 'active' : ''}`}
            onClick={toggleAutoNarrate}
            title={autoNarrate ? 'Auto Voice: ON' : 'Auto Voice: OFF'}
          >
            <span className={`auto-dot ${autoNarrate ? 'on' : ''}`} />
            <span className="voice-btn-label">Auto Voice: {autoNarrate ? 'ON' : 'OFF'}</span>
          </button>

          {/* Line counter */}
          <span className="dialogue-progress-v2">
            {lineIndex + 1} / {dialogue.length}
          </span>
        </div>
      </div>

      {/* Main Dialogue Text with Typewriter & Cursor */}
      <div className={`dialogue-text-v2 ${isNarrator ? 'narrator-text' : 'character-text'}`}>
        {displayedText}
        {isTyping && <span className="typewriter-cursor" />}
      </div>

      {/* Bottom Controls Bar */}
      <div className="dialogue-controls-v2">
        {isTyping && (
          <button
            className="btn ghost sm"
            onClick={(e) => {
              e.stopPropagation()
              completeTyping()
            }}
          >
            Skip Typing
          </button>
        )}
        <button
          className="btn gold lg dialogue-advance-btn"
          onClick={(e) => {
            e.stopPropagation()
            advance()
          }}
        >
          {isTyping ? 'Complete' : isLastLine ? continueLabel : 'Next'}{' '}
          <span className="arrow-icon">→</span>
        </button>
      </div>
    </div>
  )
}
