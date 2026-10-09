import { useEffect, useRef, useState } from 'react'
import { GameProvider, useGame } from './game/context'
import { Background, Icon, NumberTicker } from './components/ui'
import { sfx } from './game/audio'
import MainMenu from './screens/MainMenu'
import ChapterSelect from './screens/ChapterSelect'
import HowTo from './screens/HowTo'
import ModernHub from './screens/ModernHub'
import Dashboard from './screens/Dashboard'
import Game from './screens/Game'
import { ACHIEVEMENTS } from './data'

function Header({ route, go }) {
  const { state, dispatch } = useGame()
  const label =
    route.name === 'game'
      ? route.params?.mode === 'modern'
        ? 'Modern Dilemmas'
        : 'Chapter I · The Archer\u2019s Dharma'
      : route.name === 'chapters'
        ? 'Mahabharata Challenge'
        : route.name === 'modern'
          ? 'Modern Dilemmas'
          : route.name === 'dashboard'
            ? 'My Dharma'
            : route.name === 'howto'
              ? 'How to Play'
              : 'Dharma Decision'
  return (
    <header className="header">
      <button className="icon-btn header-home" onClick={() => go('menu')} aria-label="Main menu">
        <Icon name="home" size={17} />
      </button>
      <div className="header-title">{label}</div>
      <div className="header-right">
        <div className="chip-score" title="Your Dharma Decision Score — the average of your six attributes under the game's rubric">
          <span className="chip-label">Dharma</span>
          <NumberTicker value={state.score} />
        </div>
        <button
          className="icon-btn"
          onClick={() => dispatch({ type: 'toggleMute' })}
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
          Dharma Decision · An AI-based ethical decision-making simulator inspired by strategic
          lessons from the Mahabharata
        </span>
        <span className="footer-dim">
          The Dharma Score reflects this game&rsquo;s rubric — not an objective measure of morality.
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
