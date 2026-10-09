// ============================================================
// DHARMA DECISION — Character Stage
// Renders multiple characters simultaneously on a visual stage
// with position, emotion, speaking state, and enter animations.
// ============================================================

import { useEffect, useState } from 'react'
import { CharacterPortrait } from './CharacterPortrait'
import { CHARACTERS } from '../data'

const POSITIONS = {
  left:          { left: '8%',  bottom: '5%' },
  'center-left': { left: '25%', bottom: '5%' },
  center:        { left: '42%', bottom: '5%' },
  'center-right':{ left: '58%', bottom: '5%' },
  right:         { left: '75%', bottom: '5%' },
}

export function CharacterStage({ characters = [], speakerId = null }) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    setEntered(false)
    const t = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(t)
  }, [characters.map(c => c.id).join(',')])

  if (!characters.length) return null

  return (
    <div className="character-stage">
      {characters.map((char, i) => {
        const meta = CHARACTERS[char.id] || CHARACTERS.krishna
        const pos = POSITIONS[char.position] || POSITIONS.center
        const isSpeaking = speakerId === char.id
        const isDimmed = speakerId && !isSpeaking && !char.dimmed
        const size = Math.round((char.scale || 1) * 140)

        return (
          <div
            key={char.id}
            className={`stage-character ${entered ? 'stage-entered' : ''} ${isSpeaking ? 'stage-speaking' : ''} ${isDimmed ? 'stage-dimmed' : ''} ${char.dimmed ? 'stage-far' : ''}`}
            style={{
              ...pos,
              animationDelay: `${i * 150}ms`,
              zIndex: isSpeaking ? 10 : 5 - i,
            }}
          >
            <CharacterPortrait
              characterId={char.id}
              size={size}
              emotion={char.emotion || 'calm'}
              isSpeaking={isSpeaking}
              showBadge={false}
            />
            {/* Speaker name plate */}
            {isSpeaking && (
              <div className="stage-speaker-plate" style={{ color: meta.color }}>
                <span className="stage-speaker-name">{meta.name}</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
