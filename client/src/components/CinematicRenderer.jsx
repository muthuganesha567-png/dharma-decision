// ============================================================
// DHARMA DECISION — Cinematic Renderer
// Master component: assembles backdrop + camera + characters +
// dialogue + transitions + ambience into a unified scene.
// ============================================================

import { useEffect, useState, useCallback, useRef } from 'react'
import { getScene } from '../game/sceneData'
import { setAmbience, playImpact, setMuted } from '../game/ambientAudio'
import { sfx } from '../game/audio'
import { SceneBackdrop } from './SceneBackdrop'
import { CharacterStage } from './CharacterStage'
import { CameraController } from './CameraController'
import { SceneTransition } from './SceneTransition'
import { CinematicDialogue } from './CinematicDialogue'

export function CinematicRenderer({
  sceneId,
  onComplete,
  continueLabel = 'Continue',
  muted = false,
  /** Optional: override characters (e.g. to update emotions mid-scene) */
  characterOverrides,
  /** Optional location stamp override */
  locationOverride,
  /** Optional extra content below dialogue */
  extraContent,
}) {
  const scene = getScene(sceneId)
  const [activeSpeaker, setActiveSpeaker] = useState(null)
  const prevSceneRef = useRef(sceneId)

  // Update ambience when scene changes
  useEffect(() => {
    if (scene?.ambience) {
      setAmbience(scene.ambience)
    }
    setMuted(muted)
  }, [sceneId, muted]) // eslint-disable-line

  // Fire enter SFX
  useEffect(() => {
    if (!scene?.sfx || muted) return
    scene.sfx.forEach(s => {
      if (s.trigger === 'enter') {
        sfx(s.sound, muted)
      }
    })
  }, [sceneId, muted]) // eslint-disable-line

  const handleSpeakerChange = useCallback((charId) => {
    setActiveSpeaker(charId)
  }, [])

  const handleDialogueComplete = useCallback(() => {
    if (onComplete) onComplete()
  }, [onComplete])

  // Fallback if scene not found
  if (!scene) {
    return (
      <div className="cinematic-renderer fallback-scene">
        <div className="scene-backdrop-new" style={{ background: '#060a17', height: '50vh' }} />
        <div className="cinematic-dialogue-panel-v2">
          <button className="btn gold lg" onClick={onComplete}>
            {continueLabel} <span className="arrow-icon">→</span>
          </button>
        </div>
      </div>
    )
  }

  const characters = characterOverrides || scene.characters || []
  const transition = scene.transition || { in: 'fade', duration: 800 }
  const location = locationOverride || scene.location

  return (
    <div className="cinematic-renderer">
      <SceneTransition
        transitionType={transition.in}
        duration={transition.duration}
        sceneKey={sceneId}
      >
        {/* Location stamp */}
        {location && (
          <div className="cinematic-location-stamp-v2 fade-in">
            <span className="location-text">{location}</span>
          </div>
        )}

        {/* Visual: Camera > Backdrop + Characters */}
        <div className="cinematic-visual-container">
          <CameraController camera={scene.camera}>
            <SceneBackdrop backdropKey={scene.backdrop} backgroundImage={scene.backgroundImage} />
            <CharacterStage
              characters={characters}
              speakerId={activeSpeaker}
            />
          </CameraController>

          {/* Gradient overlay at bottom for dialogue readability */}
          <div className="cinematic-bottom-gradient" />
        </div>
      </SceneTransition>

      {/* Dialogue panel */}
      <CinematicDialogue
        dialogue={scene.dialogue}
        onComplete={handleDialogueComplete}
        onSpeakerChange={handleSpeakerChange}
        continueLabel={continueLabel}
        muted={muted}
      />

      {extraContent}
    </div>
  )
}
