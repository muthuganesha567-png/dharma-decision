// ============================================================
// DHARMA DECISION — Scene Transition Manager
// Fade, crossfade, wipe, and cut transitions between scenes.
// ============================================================

import { useEffect, useState, useRef } from 'react'

export function SceneTransition({ transitionType = 'fade', duration = 800, sceneKey, children }) {
  const [phase, setPhase] = useState('entering') // 'entering' | 'visible' | 'exiting'
  const prevKeyRef = useRef(sceneKey)
  const timeoutRef = useRef(null)

  useEffect(() => {
    // On scene key change, trigger transition
    if (prevKeyRef.current !== sceneKey) {
      setPhase('exiting')
      timeoutRef.current = setTimeout(() => {
        prevKeyRef.current = sceneKey
        setPhase('entering')
        timeoutRef.current = setTimeout(() => {
          setPhase('visible')
        }, duration)
      }, duration / 2)
    } else {
      // Initial mount
      setPhase('entering')
      timeoutRef.current = setTimeout(() => setPhase('visible'), duration)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [sceneKey, duration]) // eslint-disable-line

  const transClass = `scene-transition transition-${transitionType} transition-${phase}`

  return (
    <div
      className={transClass}
      style={{ '--transition-duration': `${duration}ms` }}
    >
      {children}
    </div>
  )
}
