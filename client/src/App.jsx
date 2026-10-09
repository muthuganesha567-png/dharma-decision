import { useEffect, useRef, useState } from 'react'
import { GameProvider, useGame } from './game/context'
import { Background, Icon, NumberTicker } from './components/ui'
import { sfx } from './game/audio'
import {
  ensureMusicStarted,
  setVolume as setAudioVolume,
  setMuted as setAudioMuted,
  isAutoplayBlocked,
} from './game/ambientAudio'
import MainMenu from './screens/MainMenu'
import ChapterSelect from './screens/ChapterSelect'
import HowTo from './screens/HowTo'
import ModernHub from './screens/ModernHub'
import Dashboard from './screens/Dashboard'
import Game from './screens/Game'
import { ACHIEVEMENTS } from './data'

function Header({ route, go }) {
  const { state, dispatch } = useGame()
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('dharma_volume')
    return saved !== null ? Number(saved) : 80
  })
  const [audioNeedsClick, setAudioNeedsClick] = useState(false)

  const label =
    route.name === 'game'
      ? route.params?.mode === 'modern'
        ? 'Modern Dilemmas'
        : 'Chapter I \u00b7 The Archer\u2019s Dharma'
      : route.name === 'chapters'
        ? 'Mahabharata Challenge'
        : route.name === 'modern'
          ? 'Modern Dilemmas'
          : route.name === 'dashboard'
            ? 'My Dharma'
            : route.name === 'howto'
              ? 'How to Play'
              : 'Dharma Decision'

  // Initialize and sync volume and mute states
  useEffect(() => {
    setAudioVolume(volume / 100)
    setAudioMuted(state.muted)
  }, [volume, state.muted])

  // Try to start music on initial load and handle browser autoplay
  useEffect(() => {
    const started = ensureMusicStarted()
    if (!started || isAutoplayBlocked()) {
      setAudioNeedsClick(true)
    }

    const handleFirstUserGesture = () => {
      ensureMusicStarted()
      setAudioNeedsClick(false)
      window.removeEventListener('click', handleFirstUserGesture)
      window.removeEventListener('keydown', handleFirstUserGesture)
      window.removeEventListener('touchstart', handleFirstUserGesture)
    }

    window.addEventListener('click', handleFirstUserGesture)
    window.addEventListener('keydown', handleFirstUserGesture)
    window.addEventListener('touchstart', handleFirstUserGesture)

    return () => {
      window.removeEventListener('click', handleFirstUserGesture)
      window.removeEventListener('keydown', handleFirstUserGesture)
      window.removeEventListener('touchstart', handleFirstUserGesture)
    }
  }, [])

  const handleVolumeChange = (e) => {
    const v = Number(e.target.value)
    setVolume(v)
    localStorage.setItem('dharma_volume', String(v))
    setAudioVolume(v / 100)

    if (v === 0 && !state.muted) {
      dispatch({ type: 'toggleMute' })
    } else if (v > 0 && state.muted) {
      dispatch({ type: 'toggleMute' })
    }
  }

  const handleMuteToggle = () => {
    const nextMuted = !state.muted
    dispatch({ type: 'toggleMute' })
    setAudioMuted(nextMuted)
  }

  const handleEnableAudioClick = (e) => {
    e.stopPropagation()
    ensureMusicStarted()
    setAudioNeedsClick(false)
    if (state.muted) {
      dispatch({ type: 'toggleMute' })
      setAudioMuted(false)
    }
  }

  return (
    <header className="header">
      <button className="icon-btn header-home" onClick={() => go('menu')} aria-label="Main menu">
        <Icon name="home" size={17} />
      </button>
      <div className="header-title">{label}</div>
      <div className="header-right">
        {audioNeedsClick && !state.muted && (
          <button
            className="enable-audio-pill pop-in"
            onClick={handleEnableAudioClick}
            title="Click to enable epic background music"
          >
            <Icon name="sound" size={13} />
            <span>Enable Music</span>
          </button>
        )}

        <div className="chip-score" title="Your Dharma Decision Score \u2014 the average of your six attributes under the game's rubric">
          <span className="chip-label">Dharma</span>
          <NumberTicker value={state.score} />
        </div>

        {/* Volume slider */}
        <div className="header-volume" title={`Volume: ${state.muted ? 0 : volume}%`}>
          <button
            className="volume-icon-btn"
            onClick={handleMuteToggle}
            aria-label={state.muted ? 'Unmute audio' : 'Mute audio'}
          >
            <Icon
              name={state.muted || volume === 0 ? 'mute' : 'sound'}
              size={15}
              style={{ color: state.muted ? 'var(--bad)' : 'var(--gold-bright)' }}
            />
          </button>
          <input
            type="range"
            className="volume-slider"
            min={0}
            max={100}
            value={state.muted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume slider"
          />
        </div>

        <button
          className={`icon-btn ${state.muted ? 'muted' : ''}`}
          onClick={handleMuteToggle}
          aria-label={state.muted ? 'Unmute' : 'Mute'}
          title={state.muted ? 'Unmute' : 'Mute'}
        >
          <Icon name={state.muted ? 'mute' : 'sound'} size={17} />
        </button>
      </div>
    </header>
  )
}

function Toasts() {
  const { state, dispatch } = useGame()
  const prevCount = useRef(0)
  useEffect(() => {
    if (state.toasts.length > prevCount.current) sfx('achieve', state.muted)
    prevCount.current = state.toasts.length
  }, [state.toasts.length]) // eslint-disable-line
  if (!state.toasts.length) return null
  const t = state.toasts[0]
  return (
    <div className="toast-stack" role="status">
      <div className="toast pop-in" key={t.id}>
        <div className="toast-icon">
          <Icon name={t.icon || 'star'} size={20} />
        </div>
        <div>
          <div className="toast-kicker">Achievement unlocked</div>
          <div className="toast-title">{t.title}</div>
          <div className="toast-desc">{t.desc}</div>
        </div>
      </div>
    </div>
  )
}

function Shell() {
  const { state } = useGame()
  const [route, setRoute] = useState({ name: 'menu', params: {}, key: 0 })

  const go = (name, params = {}) => {
    setRoute({ name, params, key: Date.now() })
    sfx('page', state.muted)
    ensureMusicStarted()
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const ambience =
    route.name === 'game' && route.params?.mode === 'chapter' ? 'battle' : 'court'

  return (
    <div className="app">
      <Background ambience={ambience} />
      {route.name !== 'menu' && <Header route={route} go={go} />}
      <main className="screen" key={route.key}>
        {route.name === 'menu' && <MainMenu go={go} />}
        {route.name === 'chapters' && <ChapterSelect go={go} />}
        {route.name === 'howto' && <HowTo go={go} />}
        {route.name === 'modern' && <ModernHub go={go} params={route.params} />}
        {route.name === 'dashboard' && <Dashboard go={go} />}
        {route.name === 'game' && <Game key={route.key} route={route} go={go} />}
      </main>
      <footer className="footer">
        <span>
          Dharma Decision &middot; An AI-based ethical decision-making simulator inspired by strategic
          lessons from the Mahabharata
        </span>
        <span className="footer-dim">
          The Dharma Score reflects this game&rsquo;s rubric &mdash; not an objective measure of morality.
        </span>
      </footer>
      <Toasts />
    </div>
  )
}

export default function App() {
  return (
    <GameProvider>
      <Shell />
    </GameProvider>
  )
}
