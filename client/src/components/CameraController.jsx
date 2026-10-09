// ============================================================
// DHARMA DECISION — Camera Controller
// Applies cinematic zoom, pan, and shake to scene content.
// ============================================================

import { useEffect, useRef, useState } from 'react'

export function CameraController({ camera = {}, children }) {
  const {
    startZoom = 1.0,
    endZoom = 1.0,
    panX = 0,
    panY = 0,
    duration = 8000,
    shake = false,
  } = camera

  const containerRef = useRef(null)
  const [isShaking, setIsShaking] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Reset to start position instantly
    el.style.transition = 'none'
    el.style.transform = `scale(${startZoom}) translate(0px, 0px)`

    // Force reflow
    el.offsetHeight // eslint-disable-line

    // Animate to end position
    requestAnimationFrame(() => {
      el.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`
      el.style.transform = `scale(${endZoom}) translate(${panX}px, ${panY}px)`
    })

    return () => {
      el.style.transition = 'none'
    }
  }, [startZoom, endZoom, panX, panY, duration])

  useEffect(() => {
    if (shake) {
      setIsShaking(true)
      const t = setTimeout(() => setIsShaking(false), 500)
      return () => clearTimeout(t)
    }
  }, [shake])

  return (
    <div
      ref={containerRef}
      className={`camera-controller ${isShaking ? 'camera-shake' : ''}`}
    >
      {children}
    </div>
  )
}
